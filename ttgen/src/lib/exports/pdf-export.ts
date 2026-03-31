import pdfMake from 'pdfmake/build/pdfmake';
import { TimetableSlot, Semester, College } from '@/types';

// Define fonts for pdfmake
const fonts = {
    Roboto: {
        normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.9/fonts/Roboto/Roboto-Regular.ttf',
        bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.9/fonts/Roboto/Roboto-Medium.ttf',
        italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.9/fonts/Roboto/Roboto-Italic.ttf',
        bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.9/fonts/Roboto/Roboto-MediumItalic.ttf',
    },
};

(pdfMake as any).fonts = fonts;

interface PDFExportOptions {
    title?: string;
    subtitle?: string;
    showFaculty?: boolean;
    showRooms?: boolean;
}

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const TIME_SLOTS = [
    '09:00', '10:00', '11:00', '12:00', '13:00',
    '14:00', '15:00', '16:00', '17:00'
];

/**
 * Export timetable to PDF
 */
export function exportTimetableToPDF(
    slots: TimetableSlot[],
    semester: Semester,
    college: College,
    options: PDFExportOptions = {}
): void {
    const {
        showFaculty = true,
        showRooms = true,
    } = options;

    const docDefinition = generateTimetablePDF(slots, semester, college, showFaculty, showRooms);
    pdfMake.createPdf(docDefinition).download(`timetable-${semester.name}-${semester.academic_year}.pdf`);
}

/**
 * Generate PDF document definition for timetable
 */
function generateTimetablePDF(
    slots: TimetableSlot[],
    semester: Semester,
    college: College,
    showFaculty: boolean,
    showRooms: boolean
): any {
    // Organize slots by day
    const slotsByDay: Record<number, TimetableSlot[]> = {};
    for (const slot of slots) {
        if (!slotsByDay[slot.day_of_week]) {
            slotsByDay[slot.day_of_week] = [];
        }
        slotsByDay[slot.day_of_week].push(slot);
    }

    // Sort slots by time
    for (const day of Object.keys(slotsByDay)) {
        slotsByDay[Number(day)].sort((a, b) =>
            a.start_time.localeCompare(b.start_time)
        );
    }

    const content: any[] = [
        // Header
        {
            text: college.name,
            style: 'collegeName',
            alignment: 'center',
        },
        {
            text: `Timetable - ${semester.name}`,
            style: 'title',
            alignment: 'center',
        },
        {
            text: `Academic Year: ${semester.academic_year}`,
            style: 'subtitle',
            alignment: 'center',
            margin: [0, 0, 0, 20],
        },
    ];

    // Generate table for each day
    for (const dayNumber of [1, 2, 3, 4, 5, 6, 7]) {
        const daySlots = slotsByDay[dayNumber] || [];
        if (daySlots.length === 0) continue;

        content.push({
            text: DAYS[dayNumber - 1],
            style: 'dayHeader',
            margin: [0, 15, 0, 5],
        });

        const tableBody = [
            [
                { text: 'Time', style: 'tableHeader' },
                { text: 'Subject', style: 'tableHeader' },
                ...(showFaculty ? [{ text: 'Faculty', style: 'tableHeader' }] : []),
                ...(showRooms ? [{ text: 'Room/Lab', style: 'tableHeader' }] : []),
                { text: 'Type', style: 'tableHeader' },
            ],
        ];

        for (const slot of daySlots) {
            const row: any[] = [
                { text: `${slot.start_time} - ${slot.end_time}`, style: 'tableCell' },
                { text: slot.subject?.name || 'Unknown', style: 'tableCell' },
                ...(showFaculty ? [{ text: slot.faculty?.name || 'TBA', style: 'tableCell' }] : []),
                ...(showRooms ? [{ 
                    text: slot.classroom?.name || slot.lab?.name || 'TBA', 
                    style: 'tableCell' 
                }] : []),
                { text: slot.slot_type.charAt(0).toUpperCase() + slot.slot_type.slice(1), style: 'tableCell' },
            ];
            tableBody.push(row);
        }

        content.push({
            table: {
                headerRows: 1,
                widths: showFaculty && showRooms
                    ? ['auto', '*', 'auto', 'auto', 'auto']
                    : showFaculty || showRooms
                        ? ['auto', '*', 'auto', 'auto']
                        : ['auto', '*', 'auto'],
                body: tableBody,
            },
            layout: {
                fillColor: (rowIndex: number) => rowIndex === 0 ? '#4472C4' : null,
                defaultBorder: true,
            },
        });
    }

    // Add summary section
    content.push(
        { text: '', margin: [0, 20] },
        {
            text: 'Summary',
            style: 'sectionHeader',
        }
    );

    const summary = generateSummary(slots);
    content.push({
        ul: [
            `Total Theory Hours: ${summary.theoryHours}`,
            `Total Lab Hours: ${summary.labHours}`,
            `Total Subjects: ${summary.totalSubjects}`,
            `Total Slots: ${summary.totalSlots}`,
        ],
    });

    return {
        content,
        styles: {
            collegeName: {
                fontSize: 20,
                bold: true,
                color: '#1F4E79',
            },
            title: {
                fontSize: 16,
                bold: true,
                margin: [0, 10, 0, 5],
            },
            subtitle: {
                fontSize: 12,
                color: '#666',
            },
            dayHeader: {
                fontSize: 14,
                bold: true,
                color: '#1F4E79',
            },
            sectionHeader: {
                fontSize: 14,
                bold: true,
                margin: [0, 10, 0, 5],
            },
            tableHeader: {
                bold: true,
                color: 'white',
                fillColor: '#4472C4',
            },
        },
        defaultStyle: {
            font: 'Roboto',
        },
    };
}

/**
 * Generate summary statistics
 */
function generateSummary(slots: TimetableSlot[]) {
    const theoryHours = slots
        .filter(s => s.slot_type === 'theory')
        .reduce((sum, s) => sum + 1, 0);

    const labHours = slots
        .filter(s => s.slot_type === 'lab')
        .reduce((sum, s) => sum + 2, 0); // Labs typically 2 hours

    const uniqueSubjects = new Set(slots.map(s => s.subject_id));

    return {
        theoryHours,
        labHours,
        totalSubjects: uniqueSubjects.size,
        totalSlots: slots.length,
    };
}

/**
 * Generate printable weekly view
 */
export function generateWeeklyPDF(
    slots: TimetableSlot[],
    semester: Semester,
    college: College
): void {
    // Organize by day and time
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

    const tableBody: any[][] = [
        [
            { text: 'Time', style: 'tableHeader' },
            ...DAYS.slice(0, 5).map(day => ({ text: day, style: 'tableHeader' })),
        ],
    ];

    for (const time of TIME_SLOTS) {
        if (time === '13:00') continue; // Skip lunch

        const row: any[] = [time];
        for (const day of DAYS.slice(0, 5)) {
            const daySlots = grid[day][time];
            if (daySlots.length > 0) {
                const slot = daySlots[0];
                row.push({
                    text: [
                        { text: slot.subject?.code || '', bold: true },
                        '\n',
                        slot.subject?.name || '',
                        '\n',
                        { text: slot.faculty?.name || '', italics: true, fontSize: 8 },
                    ],
                    fillColor: slot.slot_type === 'lab' ? '#E7E6E6' : '#FFFFFF',
                });
            } else {
                row.push('');
            }
        }
        tableBody.push(row);
    }

    const docDefinition = {
        content: [
            {
                text: college.name,
                style: 'collegeName',
                alignment: 'center',
            },
            {
                text: `Weekly Timetable - ${semester.name}`,
                style: 'title',
                alignment: 'center',
            },
            {
                table: {
                    headerRows: 1,
                    widths: ['auto', '*', '*', '*', '*', '*'],
                    body: tableBody,
                },
                layout: {
                    fillColor: (rowIndex: number) => rowIndex === 0 ? '#4472C4' : null,
                    defaultBorder: true,
                },
            },
        ],
        styles: {
            collegeName: {
                fontSize: 18,
                bold: true,
                color: '#1F4E79',
            },
            title: {
                fontSize: 14,
                bold: true,
                margin: [0, 10, 0, 15],
            },
            tableHeader: {
                bold: true,
                color: 'white',
                fillColor: '#4472C4',
            },
        },
        defaultStyle: {
            font: 'Roboto',
            fontSize: 9,
        },
    };

    pdfMake.createPdf(docDefinition as any).download(`weekly-timetable-${semester.name}.pdf`);
}
