import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

// POST /api/auth/register
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password, college_name, college_code } = body;

        if (!email || !password || !college_name || !college_code) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        // Validate password strength
        if (password.length < 8) {
            return NextResponse.json(
                { error: 'Password must be at least 8 characters' },
                { status: 400 }
            );
        }

        const supabase = await createClient();

        // Create auth user
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
        });

        if (authError) {
            return NextResponse.json(
                { error: authError.message },
                { status: 400 }
            );
        }

        if (!authData.user) {
            return NextResponse.json(
                { error: 'Failed to create user' },
                { status: 500 }
            );
        }

        // Create college record
        const { data: collegeData, error: collegeError } = await supabase
            .from('colleges')
            .insert([
                {
                    user_id: authData.user.id,
                    name: college_name,
                    code: college_code.toUpperCase(),
                    email,
                },
            ])
            .select()
            .single();

        if (collegeError) {
            // Rollback: delete auth user
            await supabase.auth.admin.deleteUser(authData.user.id);
            return NextResponse.json(
                { error: 'Failed to create college: ' + collegeError.message },
                { status: 500 }
            );
        }

        return NextResponse.json({
            user: authData.user,
            college: collegeData,
        }, { status: 201 });
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
