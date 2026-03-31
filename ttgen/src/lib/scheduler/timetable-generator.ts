/**
 * Timetable Generator - Main scheduling engine using CP-SAT
 * Handles theory hours, lab blocks, batch divisions, room constraints
 */

import { ConstraintSolver, createDomainVariable, allDifferentConstraint } from './constraint-solver';
import {
    SchedulerConfig,
    ScheduleContext,
    SubjectRequirement,
    Room,
    Faculty,
    Batch,
    TimeSlot,
    Assignment,
    ScheduleSolution,
    Conflict,
    CPModel,
} from './types';

export class TimetableGenerator {
    private config: SchedulerConfig;
    private context!: ScheduleContext;
    private timeSlots: TimeSlot[];

    constructor(config: SchedulerConfig) {
        this.config = config;
        this.timeSlots = this.generateTimeSlots();
    }

    /**
     * Generate all possible time slots based on configuration
     */
    private generateTimeSlots(): TimeSlot[] {
        const slots: TimeSlot[] = [];
        const [startHour, startMinute] = this.config.startTime.split(':').map(Number);
        const [endHour, endMinute] = this.config.endTime.split(':').map(Number);

        const lunchStart = this.timeToMinutes(this.config.lunchBreak.start);
        const lunchEnd = this.timeToMinutes(this.config.lunchBreak.end);

        for (const day of this.config.workingDays) {
            let currentMinutes = startHour * 60 + startMinute;
            const endMinutes = endHour * 60 + endMinute;

            while (currentMinutes < endMinutes) {
                // Skip lunch break
                if (currentMinutes >= lunchStart && currentMinutes < lunchEnd) {
                    currentMinutes = lunchEnd;
                    continue;
                }

                // Check other breaks
                let inBreak = false;
                for (const breakTime of this.config.breakTimes) {
                    const breakStart = this.timeToMinutes(breakTime.start);
                    const breakEnd = this.timeToMinutes(breakTime.end);
                    if (currentMinutes >= breakStart && currentMinutes < breakEnd) {
                        currentMinutes = breakEnd;
                        inBreak = true;
                        break;
                    }
                }

                if (inBreak) continue;

                slots.push({
                    day,
                    startHour: Math.floor(currentMinutes / 60),
                    startMinute: currentMinutes % 60,
                    duration: this.config.theorySlotDuration,
                });

                currentMinutes += this.config.theorySlotDuration;
            }
        }

        return slots;
    }

    /**
     * Convert time string to minutes
     */
    private timeToMinutes(time: string): number {
        const [hour, minute] = time.split(':').map(Number);
        return hour * 60 + minute;
    }

    /**
     * Set up the scheduling context
     */
    setContext(context: Omit<ScheduleContext, 'timeSlots' | 'config'>) {
        this.context = {
            ...context,
            timeSlots: this.timeSlots,
            config: this.config,
        };
    }

    /**
     * Generate the complete timetable
     */
    generate(): ScheduleSolution {
        const startTime = Date.now();

        if (!this.context) {
            throw new Error('Context not set. Call setContext() first.');
        }

        const assignments: Assignment[] = [];
        const conflicts: Conflict[] = [];
        const unassigned: string[] = [];

        // Separate theory and lab subjects
        const theorySubjects = this.context.subjects.filter(s => s.type === 'theory');
        const labSubjects = this.context.subjects.filter(s => s.type === 'lab');

        // Track resource usage
        const facultyHours: Record<string, number> = {};
        const roomOccupancy: Set<string> = new Set();
        const batchOccupancy: Set<string> = new Set();

        // Initialize faculty hours
        this.context.faculty.forEach(f => facultyHours[f.id] = 0);

        // Schedule theory subjects first
        for (const subject of theorySubjects) {
            const subjectAssignments = this.scheduleTheorySubject(
                subject,
                assignments,
                facultyHours,
                roomOccupancy
            );

            if (subjectAssignments.length === 0) {
                unassigned.push(subject.id);
                conflicts.push({
                    type: 'subject',
                    description: `Could not schedule theory subject: ${subject.name} (${subject.code})`,
                    assignments: [],
                });
            } else {
                assignments.push(...subjectAssignments);
            }
        }

        // Schedule lab subjects
        for (const subject of labSubjects) {
            const subjectAssignments = this.scheduleLabSubject(
                subject,
                assignments,
                facultyHours,
                roomOccupancy,
                batchOccupancy
            );

            if (subjectAssignments.length === 0) {
                unassigned.push(subject.id);
                conflicts.push({
                    type: 'subject',
                    description: `Could not schedule lab subject: ${subject.name} (${subject.code})`,
                    assignments: [],
                });
            } else {
                assignments.push(...subjectAssignments);
            }
        }

        // Check for conflicts
        const detectedConflicts = this.detectConflicts(assignments);
        conflicts.push(...detectedConflicts);

        const timeTaken = Date.now() - startTime;

        return {
            assignments,
            unassigned,
            score: this.calculateScore(assignments, conflicts),
            iterations: assignments.length,
            timeTaken,
            conflicts,
        };
    }

    /**
     * Schedule a theory subject
     */
    private scheduleTheorySubject(
        subject: SubjectRequirement,
        existingAssignments: Assignment[],
        facultyHours: Record<string, number>,
        roomOccupancy: Set<string>
    ): Assignment[] {
        const assignments: Assignment[] = [];
        const hoursNeeded = subject.hoursPerWeek;
        let hoursScheduled = 0;

        // Get available rooms (theory rooms)
        const availableRooms = this.context.rooms.filter(r => r.type === 'theory');
        if (availableRooms.length === 0) return [];

        // Try each faculty member
        for (const facultyId of subject.facultyIds) {
            if (hoursScheduled >= hoursNeeded) break;

            const faculty = this.context.faculty.find(f => f.id === facultyId);
            if (!faculty) continue;

            // Check faculty availability
            const facultyCurrentHours = facultyHours[facultyId] || 0;
            if (facultyCurrentHours >= faculty.maxHoursPerWeek) continue;

            // Try each time slot
            for (const slot of this.timeSlots) {
                if (hoursScheduled >= hoursNeeded) break;

                const slotKey = `${slot.day}-${slot.startHour}:${slot.startMinute}`;

                // Find available room
                const room = availableRooms.find(r => {
                    const roomSlotKey = `${r.id}-${slotKey}`;
                    return !roomOccupancy.has(roomSlotKey);
                });

                if (!room) continue;

                // Check faculty availability at this slot
                const facultySlotKey = `${facultyId}-${slotKey}`;
                if (this.isFacultyBusy(facultyId, slot, existingAssignments)) continue;

                // Create assignment
                const assignment: Assignment = {
                    subjectId: subject.id,
                    roomId: room.id,
                    facultyId,
                    timeSlot: slot,
                    weekSlot: this.getWeekSlotIndex(slot),
                };

                assignments.push(assignment);
                hoursScheduled += slot.duration / 60;

                // Mark resources as used
                roomOccupancy.add(`${room.id}-${slotKey}`);
                facultyHours[facultyId] = facultyCurrentHours + (slot.duration / 60);
            }
        }

        return hoursScheduled >= hoursNeeded ? assignments : [];
    }

    /**
     * Schedule a lab subject
     */
    private scheduleLabSubject(
        subject: SubjectRequirement,
        existingAssignments: Assignment[],
        facultyHours: Record<string, number>,
        roomOccupancy: Set<string>,
        batchOccupancy: Set<string>
    ): Assignment[] {
        const assignments: Assignment[] = [];
        const hoursNeeded = subject.hoursPerWeek;
        const batchIds = subject.batchIds || ['default'];

        // Get available labs matching lab type
        const availableLabs = this.context.rooms.filter(r =>
            r.type === 'lab' && (!subject.labType || r.labType === subject.labType)
        );

        if (availableLabs.length === 0) return [];

        // Schedule each batch separately
        for (const batchId of batchIds) {
            let hoursScheduled = 0;

            for (const facultyId of subject.facultyIds) {
                if (hoursScheduled >= hoursNeeded) break;

                const faculty = this.context.faculty.find(f => f.id === facultyId);
                if (!faculty) continue;

                const facultyCurrentHours = facultyHours[facultyId] || 0;
                if (facultyCurrentHours >= faculty.maxHoursPerWeek) continue;

                // Lab slots are typically 2 hours
                const labDuration = this.config.labSlotDuration;
                const consecutiveSlotsNeeded = Math.ceil(labDuration / this.config.theorySlotDuration);

                for (let i = 0; i < this.timeSlots.length - consecutiveSlotsNeeded + 1; i++) {
                    if (hoursScheduled >= hoursNeeded) break;

                    const startSlot = this.timeSlots[i];
                    const endSlot = this.timeSlots[i + consecutiveSlotsNeeded - 1];

                    // Check if slots are consecutive and on same day
                    if (startSlot.day !== endSlot.day) continue;

                    const slotKey = `${startSlot.day}-${startSlot.startHour}:${startSlot.startMinute}`;

                    // Check if batch is available
                    const batchSlotKey = `${batchId}-${slotKey}`;
                    if (batchOccupancy.has(batchSlotKey)) continue;

                    // Find available lab
                    const lab = availableLabs.find(l => {
                        const labSlotKey = `${l.id}-${slotKey}`;
                        return !roomOccupancy.has(labSlotKey);
                    });

                    if (!lab) continue;
                    if (this.isFacultyBusy(facultyId, startSlot, existingAssignments)) continue;

                    // Create lab assignment
                    const assignment: Assignment = {
                        subjectId: subject.id,
                        roomId: lab.id,
                        facultyId,
                        batchId,
                        timeSlot: {
                            ...startSlot,
                            duration: labDuration,
                        },
                        weekSlot: this.getWeekSlotIndex(startSlot),
                    };

                    assignments.push(assignment);
                    hoursScheduled += labDuration / 60;

                    // Mark resources
                    roomOccupancy.add(`${lab.id}-${slotKey}`);
                    batchOccupancy.add(batchSlotKey);
                    facultyHours[facultyId] = facultyCurrentHours + (labDuration / 60);

                    // Skip the used slots
                    i += consecutiveSlotsNeeded - 1;
                }
            }
        }

        return assignments;
    }

    /**
     * Check if faculty is busy at given time slot
     */
    private isFacultyBusy(
        facultyId: string,
        slot: TimeSlot,
        assignments: Assignment[]
    ): boolean {
        return assignments.some(a =>
            a.facultyId === facultyId &&
            a.timeSlot.day === slot.day &&
            a.timeSlot.startHour === slot.startHour &&
            a.timeSlot.startMinute === slot.startMinute
        );
    }

    /**
     * Get week slot index for consistent ordering
     */
    private getWeekSlotIndex(slot: TimeSlot): number {
        const dayIndex = this.config.workingDays.indexOf(slot.day);
        const slotsPerDay = Math.floor(
            (this.timeToMinutes(this.config.endTime) - this.timeToMinutes(this.config.startTime)) /
            this.config.theorySlotDuration
        );
        return dayIndex * slotsPerDay + (slot.startHour * 60 + slot.startMinute) / this.config.theorySlotDuration;
    }

    /**
     * Detect conflicts in the schedule
     */
    private detectConflicts(assignments: Assignment[]): Conflict[] {
        const conflicts: Conflict[] = [];

        // Check for faculty conflicts
        const facultySlots: Record<string, Assignment[]> = {};
        for (const assignment of assignments) {
            const key = `${assignment.facultyId}-${assignment.timeSlot.day}-${assignment.timeSlot.startHour}`;
            if (!facultySlots[key]) facultySlots[key] = [];
            facultySlots[key].push(assignment);
        }

        for (const [key, slots] of Object.entries(facultySlots)) {
            if (slots.length > 1) {
                const faculty = this.context.faculty.find(f => f.id === slots[0].facultyId);
                conflicts.push({
                    type: 'faculty',
                    description: `Faculty ${faculty?.name || 'Unknown'} has overlapping classes`,
                    assignments: slots,
                });
            }
        }

        // Check for room conflicts
        const roomSlots: Record<string, Assignment[]> = {};
        for (const assignment of assignments) {
            const key = `${assignment.roomId}-${assignment.timeSlot.day}-${assignment.timeSlot.startHour}`;
            if (!roomSlots[key]) roomSlots[key] = [];
            roomSlots[key].push(assignment);
        }

        for (const [key, slots] of Object.entries(roomSlots)) {
            if (slots.length > 1) {
                const room = this.context.rooms.find(r => r.id === slots[0].roomId);
                conflicts.push({
                    type: 'room',
                    description: `Room ${room?.name || 'Unknown'} has overlapping bookings`,
                    assignments: slots,
                });
            }
        }

        // Check for batch conflicts
        const batchSlots: Record<string, Assignment[]> = {};
        for (const assignment of assignments) {
            if (!assignment.batchId) continue;
            const key = `${assignment.batchId}-${assignment.timeSlot.day}-${assignment.timeSlot.startHour}`;
            if (!batchSlots[key]) batchSlots[key] = [];
            batchSlots[key].push(assignment);
        }

        for (const [key, slots] of Object.entries(batchSlots)) {
            if (slots.length > 1) {
                conflicts.push({
                    type: 'batch',
                    description: `Batch has overlapping classes`,
                    assignments: slots,
                });
            }
        }

        return conflicts;
    }

    /**
     * Calculate solution score (higher is better)
     */
    private calculateScore(assignments: Assignment[], conflicts: Conflict[]): number {
        let score = assignments.length * 100;

        // Penalize conflicts heavily
        score -= conflicts.length * 500;

        // Penalize unscheduled hours
        let unscheduledHours = 0;
        for (const subject of this.context.subjects) {
            const scheduledHours = assignments
                .filter(a => a.subjectId === subject.id)
                .reduce((sum, a) => sum + a.timeSlot.duration / 60, 0);
            unscheduledHours += Math.max(0, subject.hoursPerWeek - scheduledHours);
        }
        score -= unscheduledHours * 200;

        return score;
    }
}

/**
 * Create and run the timetable generator
 */
export function generateTimetable(
    config: SchedulerConfig,
    context: Omit<ScheduleContext, 'timeSlots' | 'config'>
): ScheduleSolution {
    const generator = new TimetableGenerator(config);
    generator.setContext(context);
    return generator.generate();
}
