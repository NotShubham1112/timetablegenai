import * as XLSX from 'xlsx';
import { TimetableSlot, Semester } from '@/types';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const TIME_SLOTS = [
    '09:00', '10:00', '11:00', '12:00', '13:00',
    '14:00', '15:00', '16:00', '17:00'
];

interface ExcelExportOptions {
    includeFaculty?: boolean;
    includeRooms?: boolean;
    includeBatches?: boolean;
}

/**
 * Export timetable to Excel
 */
export function exportTimetableToExcel(
    slots: TimetableSlot[],
    semester: Semester,
    options: ExcelExportOptions = {}
): void {
    const { includeFaculty = true, includeRooms = true, includeBatches = true } = options;

    // Create workbook
    const wb = XLSX.utils.book_new();

    // 1. Weekly View Sheet
    const weeklyData = generateWeeklyView(slots, includeFaculty, includeRooms);
    const weeklyWs = XLSX.utils.aoa_to_sheet(weeklyData);
    XLSX.utils.book_append_sheet(wb, weeklyWs, 'Weekly View');

    // 2. Detailed Schedule Sheet
    const detailedData = generateDetailedSchedule(slots, includeFaculty, includeRooms, includeBatches);
    const detailedWs = XLSX.utils.aoa_to_sheet(detailedData);
    XLSX.utils.book_append_sheet(wb, detailedWs, 'Detailed Schedule');

    // 3. Summary Sheet
    const summaryData = generateSummary(slots);
    const summaryWs = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(wb, summaryWs, 'Summary');

    // 4. Subjects List Sheet
    const subjectsData = generateSubjectsList(slots);
    const subjectsWs = XLSX.utils.aoa_to_sheet(subjectsData);
    XLSX.utils.book_append_sheet(wb, subjectsWs, 'Subjects');

    // Save file
    XLSX.writeFile(wb, `timetable-${semester.name}-${semester.academic_year}.xlsx`);
}

/**
 * Generate weekly view data
 */
function generateWeeklyView(
    slots: TimetableSlot[],
    includeFaculty: boolean,
    includeRooms: boolean
): any[][] {
    // Organize slots by day and time
    const grid: Record<string, Record<string, TimetableSlot[]>> = {};

    for (const day of DAYS) {
        grid[day] = {};
        for (const time of TIME_SLOTS) {
            grid[day][time] = [];
        }
    }

    for (const slot of slots) {
        const day = DAYS[slot.day_of_week - 1];
        const time = slot.start_time.substring(0, 5);
        if (grid[day] && grid[day][time]) {
            grid[day][time].push(slot);
        }
    }

    // Create header
    const data: any[][] = [
        ['WEEKLY TIMETABLE'],
        [''],
        ['Time', ...DAYS.slice(0, 5)],
    ];

    // Add time slots
    for (const time of TIME_SLOTS) {
        if (time === '13:00') {
            data.push([time, 'LUNCH BREAK', '', '', '', '']);
            continue;
        }

        const row: any[] = [time];
        for (const day of DAYS.slice(0, 5)) {
            const daySlots = grid[day][time];
            if (daySlots.length > 0) {
                const slot = daySlots[0];
                let cellContent = `${slot.subject?.code || ''}\n${slot.subject?.name || ''}`;
                if (includeFaculty && slot.faculty) {
                    cellContent += `\n${slot.faculty.name}`;
                }
                if (includeRooms) {
                    const room = slot.classroom?.name || slot.lab?.name;
                    if (room) cellContent += `\n${room}`;
                }
                row.push(cellContent);
            } else {
                row.push('');
            }
        }
        data.push(row);
    }

    return data;
}

/**
 * Generate detailed schedule data
 */
function generateDetailedSchedule(
    slots: TimetableSlot[],
    includeFaculty: boolean,
    includeRooms: boolean,
    includeBatches: boolean
): any[][] {
    // Sort slots by day and time
    const sortedSlots = [...slots].sort((a, b) => {
        if (a.day_of_week !== b.day_of_week) {
            return a.day_of_week - b.day_of_week;
        }
        return a.start_time.localeCompare(b.start_time);
    });

    // Header
    const header = ['Day', 'Time', 'Subject Code', 'Subject Name', 'Type'];
    if (includeFaculty) header.push('Faculty');
    if (includeRooms) header.push('Room/Lab');
    if (includeBatches) header.push('Batch');

    const data: any[][] = [
        ['DETAILED SCHEDULE'],
        [''],
        header,
    ];

    // Add slots
    for (const slot of sortedSlots) {
        const row = [
            DAYS[slot.day_of_week - 1],
            `${slot.start_time} - ${slot.end_time}`,
            slot.subject?.code || '',
            slot.subject?.name || '',
            slot.slot_type.charAt(0).toUpperCase() + slot.slot_type.slice(1),
        ];

        if (includeFaculty) {
            row.push(slot.faculty?.name || 'TBA');
        }
        if (includeRooms) {
            row.push(slot.classroom?.name || slot.lab?.name || 'TBA');
        }
        if (includeBatches) {
            row.push(slot.batch?.name || '');
        }

        data.push(row);
    }

    return data;
}

/**
 * Generate summary data
 */
function generateSummary(slots: TimetableSlot[]): any[][] {
    const theorySlots = slots.filter(s => s.slot_type === 'theory');
    const labSlots = slots.filter(s => s.slot_type === 'lab');
    const uniqueSubjects = new Set(slots.map(s => s.subject_id));
    const uniqueFaculty = new Set(slots.filter(s => s.faculty_id).map(s => s.faculty_id));

    // Calculate hours by day
    const hoursByDay: Record<string, { theory: number; lab: number }> = {};
    for (const day of DAYS) {
        hoursByDay[day] = { theory: 0, lab: 0 };
    }

    for (const slot of slots) {
        const day = DAYS[slot.day_of_week - 1];
        if (slot.slot_type === 'theory') {
            hoursByDay[day].theory += 1;
        } else {
            hoursByDay[day].lab += 2; // Labs are typically 2 hours
        }
    }

    return [
        ['TIMETABLE SUMMARY'],
        [''],
        ['Metric', 'Value'],
        ['Total Slots', slots.length],
        ['Theory Slots', theorySlots.length],
        ['Lab Slots', labSlots.length],
        ['Unique Subjects', uniqueSubjects.size],
        ['Unique Faculty', uniqueFaculty.size],
        [''],
        ['Hours by Day'],
        ['Day', 'Theory Hours', 'Lab Hours', 'Total'],
        ...DAYS.slice(0, 5).map(day => [
            day,
            hoursByDay[day].theory,
            hoursByDay[day].lab,
            hoursByDay[day].theory + hoursByDay[day].lab,
        ]),
        [''],
        ['Total Hours', theorySlots.length + (labSlots.length * 2)],
    ];
}

/**
 * Generate subjects list data
 */
function generateSubjectsList(slots: TimetableSlot[]): any[][] {
    const subjectMap = new Map<string, {
        subject: any;
        slots: number;
        faculty: Set<string>;
    }>();

    for (const slot of slots) {
        if (!slot.subject) continue;

        const existing = subjectMap.get(slot.subject_id);
        if (existing) {
            existing.slots += 1;
            if (slot.faculty) existing.faculty.add(slot.faculty.name);
        } else {
            subjectMap.set(slot.subject_id, {
                subject: slot.subject,
                slots: 1,
                faculty: slot.faculty ? new Set([slot.faculty.name]) : new Set(),
            });
        }
    }

    const data: any[][] = [
        ['SUBJECTS LIST'],
        [''],
        ['Code', 'Name', 'Type', 'Hours/Week', 'Total Slots', 'Faculty'],
    ];

    for (const { subject, slots: count, faculty } of subjectMap.values()) {
        data.push([
            subject.code,
            subject.name,
            subject.type,
            subject.hours_per_week,
            count,
            Array.from(faculty).join(', '),
        ]);
    }

    return data;
}

/**
 * Export raw data for further processing
 */
export function exportRawData(slots: TimetableSlot[], semester: Semester): void {
    const data = slots.map(slot => ({
        day: DAYS[slot.day_of_week - 1],
        start_time: slot.start_time,
        end_time: slot.end_time,
        subject_code: slot.subject?.code,
        subject_name: slot.subject?.name,
        subject_type: slot.subject?.type,
        faculty_name: slot.faculty?.name,
        faculty_email: slot.faculty?.email,
        room: slot.classroom?.name || slot.lab?.name,
        batch: slot.batch?.name,
        slot_type: slot.slot_type,
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Raw Data');

    XLSX.writeFile(wb, `timetable-raw-${semester.name}.xlsx`);
}
