import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';
import { generateTimetable } from '@/lib/scheduler/timetable-generator';
import { SchedulerConfig, ScheduleContext, SubjectRequirement, Room, Faculty, Batch } from '@/lib/scheduler/types';

// POST /api/generate-timetable
export async function POST(request: NextRequest) {
    const startTime = Date.now();

    try {
        const body = await request.json();
        const {
            college_id,
            semester_id,
            working_days = [1, 2, 3, 4, 5],
            start_time = '09:00',
            end_time = '17:00',
            slot_duration_minutes = 60,
            theory_slot_duration = 60,
            lab_slot_duration = 120,
            break_times = [],
            lunch_break = { start: '13:00', end: '14:00' },
            max_theory_slots_per_day = 4,
            max_lab_slots_per_day = 2,
        } = body;

        if (!college_id || !semester_id) {
            return NextResponse.json(
                { error: 'College ID and Semester ID are required' },
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

        // Create generation record
        const { data: generationRecord, error: genError } = await supabase
            .from('timetable_generations')
            .insert([
                {
                    college_id,
                    semester_id,
                    status: 'running',
                    config: {
                        working_days,
                        start_time,
                        end_time,
                        slot_duration_minutes,
                    },
                    started_at: new Date().toISOString(),
                },
            ])
            .select()
            .single();

        if (genError) {
            return NextResponse.json(
                { error: genError.message },
                { status: 500 }
            );
        }

        // Fetch data for scheduling
        const [{ data: subjects }, { data: classrooms }, { data: labs }, { data: facultyList }, { data: batches }] = await Promise.all([
            supabase.from('subjects').select('*').eq('semester_id', semester_id).eq('is_active', true),
            supabase.from('classrooms').select('*').eq('college_id', college_id).eq('is_active', true),
            supabase.from('labs').select('*').eq('college_id', college_id).eq('is_active', true),
            supabase.from('faculty').select('*').eq('college_id', college_id).eq('is_active', true),
            supabase.from('batches').select('*').eq('semester_id', semester_id),
        ]);

        if (!subjects || subjects.length === 0) {
            await supabase
                .from('timetable_generations')
                .update({
                    status: 'failed',
                    error_message: 'No active subjects found for this semester',
                    completed_at: new Date().toISOString(),
                })
                .eq('id', generationRecord.id);

            return NextResponse.json(
                { error: 'No active subjects found for this semester. Please add subjects first.' },
                { status: 400 }
            );
        }

        if ((!classrooms || classrooms.length === 0) && (!labs || labs.length === 0)) {
            await supabase
                .from('timetable_generations')
                .update({
                    status: 'failed',
                    error_message: 'No classrooms or labs found for this college',
                    completed_at: new Date().toISOString(),
                })
                .eq('id', generationRecord.id);

            return NextResponse.json(
                { error: 'No classrooms or labs available. Please add resources before generating a timetable.' },
                { status: 400 }
            );
        }

        // Prepare scheduler config
        const config: SchedulerConfig = {
            workingDays: working_days,
            startTime: start_time,
            endTime: end_time,
            slotDurationMinutes: slot_duration_minutes,
            theorySlotDuration: theory_slot_duration || 60,
            labSlotDuration: lab_slot_duration || 120,
            breakTimes: break_times,
            lunchBreak: lunch_break,
            maxTheorySlotsPerDay: max_theory_slots_per_day,
            maxLabSlotsPerDay: max_lab_slots_per_day,
        };

        // Map database entities to scheduler types
        const schedulerRooms: Room[] = [
            ...(classrooms || []).map(c => ({
                id: c.id,
                code: c.code,
                name: c.name,
                type: 'theory' as const,
                capacity: c.capacity,
            })),
            ...(labs || []).map(l => ({
                id: l.id,
                code: l.code,
                name: l.name,
                type: 'lab' as const,
                labType: l.lab_type,
                capacity: l.capacity,
            })),
        ];

        const schedulerFaculty: Faculty[] = (facultyList || []).map(f => ({
            id: f.id,
            name: f.name,
            maxHoursPerWeek: f.max_hours_per_week,
        }));

        const schedulerBatches: Batch[] = (batches || []).map(b => ({
            id: b.id,
            code: b.code,
            name: b.name,
            size: b.strength,
        }));

        // If no batches exist, create default batch
        if (schedulerBatches.length === 0) {
            schedulerBatches.push({
                id: 'default',
                code: 'ALL',
                name: 'All Students',
                size: 60,
            });
        }

        const schedulerSubjects: SubjectRequirement[] = subjects.map(s => {
            // Pick a reasonable faculty pool for this subject
            // If the database had faculty_subject mappings, we'd use those.
            // Shuffling the entire faculty list ensures we don't always pick the first one.
            const shuffledFaculty = [...schedulerFaculty].sort(() => Math.random() - 0.5);
            
            return {
                id: s.id,
                code: s.code,
                name: s.name,
                type: s.type === 'lab' ? 'lab' : 'theory',
                hoursPerWeek: Number(s.hours_per_week) || 4,
                labType: s.lab_type || undefined,
                batchIds: s.requires_batches ? schedulerBatches.map(b => b.id) : [schedulerBatches[0].id],
                facultyIds: shuffledFaculty.map(f => f.id), 
            };
        });

        // Prepare context
        const context: Omit<ScheduleContext, 'timeSlots' | 'config'> = {
            rooms: schedulerRooms,
            faculty: schedulerFaculty,
            batches: schedulerBatches,
            subjects: schedulerSubjects,
            workingDays: working_days,
        };

        // Generate timetable
        const solution = generateTimetable(config, context);

        // Clear existing timetable for this semester
        await supabase.from('timetable_slots').delete().eq('semester_id', semester_id);

        // Insert new timetable slots
        if (solution.assignments.length > 0) {
            const slotsToInsert = solution.assignments.map(a => {
                const subject = subjects.find(s => s.id === a.subjectId);
                const isLab = subject?.type === 'lab';

                return {
                    college_id: college_id,
                    semester_id: semester_id,
                    subject_id: a.subjectId,
                    faculty_id: a.facultyId,
                    classroom_id: isLab ? null : a.roomId,
                    lab_id: isLab ? a.roomId : null,
                    batch_id: a.batchId,
                    day_of_week: a.timeSlot.day,
                    start_time: `${String(a.timeSlot.startHour).padStart(2, '0')}:${String(a.timeSlot.startMinute).padStart(2, '0')}`,
                    end_time: getEndTime(a.timeSlot),
                    slot_type: isLab ? 'lab' : 'theory',
                    is_generated: true,
                };
            });

            const { error: insertError } = await supabase
                .from('timetable_slots')
                .insert(slotsToInsert);

            if (insertError) {
                console.error('Insert slots error:', insertError);
            }
        }

        // Update generation record
        const timeTaken = Date.now() - startTime;
        await supabase
            .from('timetable_generations')
            .update({
                status: solution.unassigned.length > 0 ? 'completed' : 'completed',
                result: {
                    assignments: solution.assignments.length,
                    unassigned: solution.unassigned.length,
                    score: solution.score,
                    timeTaken,
                    conflicts: solution.conflicts,
                },
                completed_at: new Date().toISOString(),
            })
            .eq('id', generationRecord.id);

        return NextResponse.json({
            success: true,
            generation: generationRecord,
            solution: {
                assignments: solution.assignments.length,
                unassigned: solution.unassigned,
                score: solution.score,
                timeTaken,
                conflicts: solution.conflicts,
            },
        });
    } catch (error) {
        console.error('Generate timetable error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

function getEndTime(timeSlot: { startHour: number; startMinute: number; duration: number }): string {
    const endMinutes = timeSlot.startHour * 60 + timeSlot.startMinute + timeSlot.duration;
    const endHour = Math.floor(endMinutes / 60);
    const endMinute = endMinutes % 60;
    return `${String(endHour).padStart(2, '0')}:${String(endMinute).padStart(2, '0')}`;
}
