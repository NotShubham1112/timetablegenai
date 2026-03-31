// ===========================================
// CORE TYPES
// ===========================================

export interface College {
    id: string;
    user_id: string;
    name: string;
    code: string;
    address?: string;
    phone?: string;
    email: string;
    website?: string;
    timezone: string;
    created_at: string;
    updated_at: string;
}

export interface Department {
    id: string;
    college_id: string;
    name: string;
    code: string;
    created_at: string;
    updated_at: string;
}

export interface Semester {
    id: string;
    college_id: string;
    department_id?: string;
    name: string;
    academic_year: string;
    year_number: number;
    semester_number: number;
    start_date?: string;
    end_date?: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    department?: Department;
}

export interface Classroom {
    id: string;
    college_id: string;
    name: string;
    code: string;
    building?: string;
    floor?: number;
    capacity: number;
    has_projector: boolean;
    has_ac: boolean;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface Lab {
    id: string;
    college_id: string;
    name: string;
    code: string;
    lab_type: string;
    building?: string;
    floor?: number;
    capacity: number;
    num_workstations: number;
    has_projector: boolean;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface Subject {
    id: string;
    college_id: string;
    semester_id: string;
    department_id?: string;
    name: string;
    code: string;
    type: 'theory' | 'lab' | 'both';
    hours_per_week: number;
    lab_type?: string;
    requires_batches: boolean;
    num_batches: number;
    credits: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    department?: Department;
    semester?: Semester;
}

export interface Faculty {
    id: string;
    college_id: string;
    department_id?: string;
    name: string;
    email: string;
    phone?: string;
    designation?: string;
    specialization?: string;
    max_hours_per_week: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    department?: Department;
}

export interface FacultySubject {
    id: string;
    faculty_id: string;
    subject_id: string;
    preference_rank: number;
    created_at: string;
    subject?: Subject;
    faculty?: Faculty;
}

export interface Batch {
    id: string;
    college_id: string;
    semester_id: string;
    name: string;
    code: string;
    strength: number;
    created_at: string;
    updated_at: string;
}

export interface TimetableSlot {
    id: string;
    college_id: string;
    semester_id: string;
    subject_id: string;
    faculty_id?: string;
    classroom_id?: string;
    lab_id?: string;
    batch_id?: string;
    day_of_week: number;
    start_time: string;
    end_time: string;
    slot_type: 'theory' | 'lab';
    is_generated: boolean;
    is_locked: boolean;
    created_at: string;
    updated_at: string;
    subject?: Subject;
    faculty?: Faculty;
    classroom?: Classroom;
    lab?: Lab;
    batch?: Batch;
}

export interface SyllabusUpload {
    id: string;
    college_id: string;
    semester_id: string;
    file_name: string;
    file_url: string;
    file_size?: number;
    extracted_data?: ExtractedSubject[];
    extraction_status: 'pending' | 'processing' | 'completed' | 'failed';
    extraction_error?: string;
    processed_at?: string;
    created_at: string;
    updated_at: string;
    semester?: Semester;
}

export interface TimetableGeneration {
    id: string;
    college_id: string;
    semester_id: string;
    status: 'pending' | 'running' | 'completed' | 'failed';
    config: GenerationConfig;
    result?: GenerationResult;
    error_message?: string;
    started_at?: string;
    completed_at?: string;
    created_at: string;
    updated_at: string;
    semester?: Semester;
}

// ===========================================
// EXTRACTION TYPES
// ===========================================

export interface ExtractedSubject {
    name: string;
    code: string;
    type: 'theory' | 'lab' | 'both';
    hours_per_week: number;
    lab_type?: string;
    requires_batches: boolean;
    num_batches: number;
    credits?: number;
}

// ===========================================
// GENERATION TYPES
// ===========================================

export interface GenerationConfig {
    semester_id: string;
    working_days: number[]; // 1-7 (Monday-Sunday)
    start_time: string; // HH:MM format
    end_time: string; // HH:MM format
    slot_duration_minutes: number;
    break_times?: { start: string; end: string; name: string }[];
    lunch_break?: { start: string; end: string };
    max_theory_slots_per_day?: number;
    max_lab_slots_per_day?: number;
}

export interface GenerationResult {
    slots: GeneratedSlot[];
    statistics: {
        total_subjects: number;
        total_slots: number;
        theory_slots: number;
        lab_slots: number;
        utilization_percentage: number;
    };
    conflicts: Conflict[];
}

export interface GeneratedSlot {
    subject_id: string;
    faculty_id?: string;
    classroom_id?: string;
    lab_id?: string;
    batch_id?: string;
    day_of_week: number;
    start_time: string;
    end_time: string;
    slot_type: 'theory' | 'lab';
}

export interface Conflict {
    type: 'faculty' | 'classroom' | 'batch' | 'subject';
    description: string;
    slots: string[];
}

// ===========================================
// API TYPES
// ===========================================

export interface ApiResponse<T> {
    data?: T;
    error?: string;
    message?: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    password: string;
    college_name: string;
    college_code: string;
}

// ===========================================
// UI TYPES
// ===========================================

export interface NavItem {
    title: string;
    href: string;
    icon?: React.ComponentType<{ className?: string }>;
}

export interface DashboardStats {
    total_departments: number;
    total_semesters: number;
    total_classrooms: number;
    total_labs: number;
    total_subjects: number;
    total_faculty: number;
}

// ===========================================
// TIME TABLE DISPLAY TYPES
// ===========================================

export interface DaySchedule {
    day: string;
    day_number: number;
    slots: TimetableSlot[];
}

export interface WeeklyTimetable {
    semester: Semester;
    days: DaySchedule[];
}

export interface TimeSlot {
    start_time: string;
    end_time: string;
    display: string;
}
