import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/semesters?college_id=xxx
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const collegeId = searchParams.get('college_id');

        if (!collegeId) {
            return NextResponse.json(
                { error: 'College ID is required' },
                { status: 400 }
            );
        }

        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { data, error } = await supabase
            .from('semesters')
            .select('*, department:departments(*)')
            .eq('college_id', collegeId)
            .order('year_number')
            .order('semester_number');

        if (error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({ semesters: data });
    } catch (error) {
        console.error('Get semesters error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// POST /api/semesters
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            college_id,
            department_id,
            name,
            academic_year,
            year_number,
            semester_number,
            start_date,
            end_date,
        } = body;

        if (!college_id || !name || !academic_year || !year_number || !semester_number) {
            return NextResponse.json(
                { error: 'Required fields are missing' },
                { status: 400 }
            );
        }

        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { data, error } = await supabase
            .from('semesters')
            .insert([
                {
                    college_id,
                    department_id,
                    name,
                    academic_year,
                    year_number,
                    semester_number,
                    start_date,
                    end_date,
                    is_active: true,
                },
            ])
            .select('*, department:departments(*)')
            .single();

        if (error) {
            if (error.code === '23505') {
                return NextResponse.json(
                    { error: 'Semester already exists for this department and year' },
                    { status: 409 }
                );
            }
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({ semester: data }, { status: 201 });
    } catch (error) {
        console.error('Create semester error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
