/**
 * Scheduler Types - OR-Tools inspired CP-SAT for JavaScript
 */

export interface SchedulingConstraint {
    type: 'hard' | 'soft';
    weight: number;
    check: (assignment: Assignment, context: ScheduleContext) => boolean;
    penalty?: (assignment: Assignment, context: ScheduleContext) => number;
}

export interface TimeSlot {
    day: number; // 1-7 (Monday-Sunday)
    startHour: number; // 0-23
    startMinute: number; // 0-59
    duration: number; // in minutes
}

export interface Room {
    id: string;
    code: string;
    name: string;
    type: 'theory' | 'lab';
    labType?: string;
    capacity: number;
}

export interface Faculty {
    id: string;
    name: string;
    maxHoursPerWeek: number;
    unavailableSlots?: TimeSlot[];
}

export interface Batch {
    id: string;
    code: string;
    name: string;
    size: number;
}

export interface SubjectRequirement {
    id: string;
    code: string;
    name: string;
    type: 'theory' | 'lab';
    hoursPerWeek: number;
    labType?: string;
    batchIds?: string[];
    facultyIds: string[];
    preferredSlots?: TimeSlot[];
    avoidSlots?: TimeSlot[];
}

export interface ScheduleContext {
    rooms: Room[];
    faculty: Faculty[];
    batches: Batch[];
    subjects: SubjectRequirement[];
    timeSlots: TimeSlot[];
    workingDays: number[];
    config: SchedulerConfig;
}

export interface SchedulerConfig {
    workingDays: number[]; // [1, 2, 3, 4, 5] = Mon-Fri
    startTime: string; // "09:00"
    endTime: string; // "17:00"
    slotDurationMinutes: number; // 60
    theorySlotDuration: number; // 60
    labSlotDuration: number; // 120
    breakTimes: { start: string; end: string; name: string }[];
    lunchBreak: { start: string; end: string };
    maxTheorySlotsPerDay: number;
    maxLabSlotsPerDay: number;
    minTheorySlotsPerDay?: number;
    minLabSlotsPerDay?: number;
}

export interface Assignment {
    subjectId: string;
    roomId: string;
    facultyId: string;
    batchId?: string;
    timeSlot: TimeSlot;
    weekSlot: number; // Global slot index
}

export interface ScheduleSolution {
    assignments: Assignment[];
    unassigned: string[]; // Subject IDs that couldn't be scheduled
    score: number;
    iterations: number;
    timeTaken: number;
    conflicts: Conflict[];
}

export interface Conflict {
    type: 'faculty' | 'room' | 'batch' | 'subject';
    description: string;
    assignments: Assignment[];
}

export interface Domain {
    values: number[];
}

export interface Variable {
    id: string;
    name: string;
    domain: Domain;
    value?: number;
}

export interface Constraint {
    variables: string[];
    satisfied: (values: Record<string, number>) => boolean;
}

export interface CPModel {
    variables: Record<string, Variable>;
    constraints: Constraint[];
    objective?: (values: Record<string, number>) => number;
}

export interface CPSolution {
    status: 'OPTIMAL' | 'FEASIBLE' | 'INFEASIBLE' | 'UNKNOWN';
    values: Record<string, number>;
    objectiveValue?: number;
}
