import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/subjects?college_id=xxx&semester_id=xxx
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const collegeId = searchParams.get('college_id');
        const semesterId = searchParams.get('semester_id');

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

        let query = supabase
            .from('subjects')
            .select('*, department:departments(*), semester:semesters(*)')
            .eq('college_id', collegeId)
            .order('code');

        if (semesterId) {
            query = query.eq('semester_id', semesterId);
        }

        const { data, error } = await query;

        if (error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({ subjects: data });
    } catch (error) {
        console.error('Get subjects error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// POST /api/subjects
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            college_id,
            semester_id,
            department_id,
            name,
            code,
            type,
            hours_per_week,
            lab_type,
            requires_batches,
            num_batches,
            credits,
        } = body;

        if (!college_id || !semester_id || !name || !code || !type) {
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
            .from('subjects')
            .insert([
                {
                    college_id,
                    semester_id,
                    department_id,
                    name,
                    code: code.toUpperCase(),
                    type,
                    hours_per_week: hours_per_week || (type === 'lab' ? 2 : 4),
                    lab_type,
                    requires_batches: requires_batches || type === 'lab',
                    num_batches: num_batches || (type === 'lab' ? 3 : 1),
                    credits: credits || (type === 'lab' ? 1 : type === 'both' ? 4 : 3),
                },
            ])
            .select('*, department:departments(*), semester:semesters(*)')
            .single();

        if (error) {
            if (error.code === '23505') {
                return NextResponse.json(
                    { error: 'Subject code already exists in this semester' },
                    { status: 409 }
                );
            }
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({ subject: data }, { status: 201 });
    } catch (error) {
        console.error('Create subject error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// POST /api/subjects/batch - Create multiple subjects
export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { subjects } = body;

        if (!Array.isArray(subjects) || subjects.length === 0) {
            return NextResponse.json(
                { error: 'Subjects array is required' },
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

        // Process and validate subjects
        const subjectsToInsert = subjects.map((s) => ({
            ...s,
            code: s.code.toUpperCase(),
            hours_per_week: s.hours_per_week || (s.type === 'lab' ? 2 : 4),
            requires_batches: s.requires_batches || s.type === 'lab',
            num_batches: s.num_batches || (s.type === 'lab' ? 3 : 1),
            credits: s.credits || (s.type === 'lab' ? 1 : s.type === 'both' ? 4 : 3),
        }));

        const { data, error } = await supabase
            .from('subjects')
            .insert(subjectsToInsert)
            .select('*, department:departments(*), semester:semesters(*)');

        if (error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({ subjects: data }, { status: 201 });
    } catch (error) {
        console.error('Batch create subjects error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
