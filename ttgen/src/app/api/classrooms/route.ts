import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

// GET /api/classrooms?college_id=xxx
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

        // Fetch both classrooms and labs
        const [{ data: classrooms, error: classroomsError }, { data: labs, error: labsError }] = await Promise.all([
            supabase.from('classrooms').select('*').eq('college_id', collegeId).order('name'),
            supabase.from('labs').select('*').eq('college_id', collegeId).order('name'),
        ]);

        if (classroomsError) {
            return NextResponse.json({ error: classroomsError.message }, { status: 500 });
        }
        if (labsError) {
            return NextResponse.json({ error: labsError.message }, { status: 500 });
        }

        return NextResponse.json({
            classrooms: classrooms || [],
            labs: labs || [],
        });
    } catch (error) {
        console.error('Get classrooms error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// POST /api/classrooms
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { type } = body; // 'classroom' or 'lab'

        if (!type || !['classroom', 'lab'].includes(type)) {
            return NextResponse.json(
                { error: 'Valid type (classroom or lab) is required' },
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

        let result;
        if (type === 'classroom') {
            const { college_id, name, code, building, floor, capacity, has_projector, has_ac } = body;
            result = await supabase
                .from('classrooms')
                .insert([{
                    college_id,
                    name,
                    code: code.toUpperCase(),
                    building,
                    floor,
                    capacity: capacity || 30,
                    has_projector: has_projector || false,
                    has_ac: has_ac || false,
                }])
                .select()
                .single();
        } else {
            const { college_id, name, code, lab_type, building, floor, capacity, num_workstations, has_projector } = body;
            result = await supabase
                .from('labs')
                .insert([{
                    college_id,
                    name,
                    code: code.toUpperCase(),
                    lab_type,
                    building,
                    floor,
                    capacity: capacity || 20,
                    num_workstations: num_workstations || 20,
                    has_projector: has_projector || false,
                }])
                .select()
                .single();
        }

        if (result.error) {
            if (result.error.code === '23505') {
                return NextResponse.json(
                    { error: `${type === 'classroom' ? 'Classroom' : 'Lab'} code already exists` },
                    { status: 409 }
                );
            }
            return NextResponse.json(
                { error: result.error.message },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { [type]: result.data },
            { status: 201 }
        );
    } catch (error) {
        console.error('Create classroom/lab error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
