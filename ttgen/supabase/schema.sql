-- ===========================================
-- TIMETABLE GENERATOR - SUPABASE SCHEMA
-- ===========================================

-- Enable RLS
-- ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- ===========================================
-- EXTENSIONS
-- ===========================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===========================================
-- TABLES
-- ===========================================

-- Colleges table (extends auth.users)
CREATE TABLE colleges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    code TEXT UNIQUE NOT NULL,
    address TEXT,
    phone TEXT,
    email TEXT NOT NULL,
    website TEXT,
    timezone TEXT DEFAULT 'UTC',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Departments table
CREATE TABLE departments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    college_id UUID NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    code TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(college_id, code)
);

-- Semesters table
CREATE TABLE semesters (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    college_id UUID NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
    department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    academic_year TEXT NOT NULL,
    year_number INTEGER NOT NULL CHECK (year_number BETWEEN 1 AND 5),
    semester_number INTEGER NOT NULL CHECK (semester_number IN (1, 2)),
    start_date DATE,
    end_date DATE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(college_id, department_id, academic_year, year_number, semester_number)
);

-- Classrooms table (Theory rooms)
CREATE TABLE classrooms (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    college_id UUID NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    code TEXT NOT NULL,
    building TEXT,
    floor INTEGER,
    capacity INTEGER DEFAULT 30,
    has_projector BOOLEAN DEFAULT false,
    has_ac BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(college_id, code)
);

-- Labs table
CREATE TABLE labs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    college_id UUID NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    code TEXT NOT NULL,
    lab_type TEXT NOT NULL, -- 'computer', 'chemistry', 'physics', 'electronics', 'mechanical', etc.
    building TEXT,
    floor INTEGER,
    capacity INTEGER DEFAULT 20,
    num_workstations INTEGER DEFAULT 20,
    has_projector BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(college_id, code)
);

-- Subjects table
CREATE TABLE subjects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    college_id UUID NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
    semester_id UUID NOT NULL REFERENCES semesters(id) ON DELETE CASCADE,
    department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    code TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('theory', 'lab', 'both')),
    hours_per_week INTEGER DEFAULT 4,
    lab_type TEXT, -- Only for lab subjects
    requires_batches BOOLEAN DEFAULT false,
    num_batches INTEGER DEFAULT 1,
    credits INTEGER DEFAULT 3,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(college_id, code, semester_id)
);

-- Faculty table
CREATE TABLE faculty (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    college_id UUID NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
    department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    designation TEXT, -- 'Professor', 'Associate Professor', 'Assistant Professor', 'Lecturer'
    specialization TEXT,
    max_hours_per_week INTEGER DEFAULT 20,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Faculty-Subject assignments (what subjects a faculty can teach)
CREATE TABLE faculty_subjects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    faculty_id UUID NOT NULL REFERENCES faculty(id) ON DELETE CASCADE,
    subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    preference_rank INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(faculty_id, subject_id)
);

-- Batches table (for lab divisions)
CREATE TABLE batches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    college_id UUID NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
    semester_id UUID NOT NULL REFERENCES semesters(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    code TEXT NOT NULL,
    strength INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(college_id, semester_id, code)
);

-- Timetable slots table (generated schedule)
CREATE TABLE timetable_slots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    college_id UUID NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
    semester_id UUID NOT NULL REFERENCES semesters(id) ON DELETE CASCADE,
    subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    faculty_id UUID REFERENCES faculty(id) ON DELETE SET NULL,
    classroom_id UUID REFERENCES classrooms(id) ON DELETE SET NULL,
    lab_id UUID REFERENCES labs(id) ON DELETE SET NULL,
    batch_id UUID REFERENCES batches(id) ON DELETE SET NULL,
    day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 1 AND 7), -- 1=Monday, 7=Sunday
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    slot_type TEXT NOT NULL CHECK (slot_type IN ('theory', 'lab')),
    is_generated BOOLEAN DEFAULT true,
    is_locked BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Syllabus uploads table
CREATE TABLE syllabus_uploads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    college_id UUID NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
    semester_id UUID NOT NULL REFERENCES semesters(id) ON DELETE CASCADE,
    file_name TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_size INTEGER,
    extracted_data JSONB,
    extraction_status TEXT DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
    extraction_error TEXT,
    processed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Timetable generation runs
CREATE TABLE timetable_generations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    college_id UUID NOT NULL REFERENCES colleges(id) ON DELETE CASCADE,
    semester_id UUID NOT NULL REFERENCES semesters(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'pending', -- 'pending', 'running', 'completed', 'failed'
    config JSONB NOT NULL DEFAULT '{}',
    result JSONB,
    error_message TEXT,
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ===========================================
-- INDEXES
-- ===========================================
CREATE INDEX idx_colleges_user_id ON colleges(user_id);
CREATE INDEX idx_departments_college_id ON departments(college_id);
CREATE INDEX idx_semesters_college_id ON semesters(college_id);
CREATE INDEX idx_classrooms_college_id ON classrooms(college_id);
CREATE INDEX idx_labs_college_id ON labs(college_id);
CREATE INDEX idx_subjects_semester_id ON subjects(semester_id);
CREATE INDEX idx_subjects_college_id ON subjects(college_id);
CREATE INDEX idx_faculty_college_id ON faculty(college_id);
CREATE INDEX idx_faculty_subjects_faculty_id ON faculty_subjects(faculty_id);
CREATE INDEX idx_batches_semester_id ON batches(semester_id);
CREATE INDEX idx_timetable_slots_semester_id ON timetable_slots(semester_id);
CREATE INDEX idx_timetable_slots_day_time ON timetable_slots(day_of_week, start_time);
CREATE INDEX idx_syllabus_uploads_semester_id ON syllabus_uploads(semester_id);

-- ===========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ===========================================

-- Enable RLS on all tables
ALTER TABLE colleges ENABLE ROW LEVEL SECURITY;
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE semesters ENABLE ROW LEVEL SECURITY;
ALTER TABLE classrooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE labs ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE faculty ENABLE ROW LEVEL SECURITY;
ALTER TABLE faculty_subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE batches ENABLE ROW LEVEL SECURITY;
ALTER TABLE timetable_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE syllabus_uploads ENABLE ROW LEVEL SECURITY;
ALTER TABLE timetable_generations ENABLE ROW LEVEL SECURITY;

-- Colleges policies
CREATE POLICY "Users can view their own college" ON colleges
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own college" ON colleges
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own college" ON colleges
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own college" ON colleges
    FOR DELETE USING (auth.uid() = user_id);

-- Helper function to check if user owns college
CREATE OR REPLACE FUNCTION public.user_owns_college(college_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM colleges
        WHERE id = college_uuid AND user_id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Departments policies
CREATE POLICY "Users can view their college departments" ON departments
    FOR SELECT USING (public.user_owns_college(college_id));

CREATE POLICY "Users can manage their college departments" ON departments
    FOR ALL USING (public.user_owns_college(college_id));

-- Semesters policies
CREATE POLICY "Users can view their college semesters" ON semesters
    FOR SELECT USING (public.user_owns_college(college_id));

CREATE POLICY "Users can manage their college semesters" ON semesters
    FOR ALL USING (public.user_owns_college(college_id));

-- Classrooms policies
CREATE POLICY "Users can view their college classrooms" ON classrooms
    FOR SELECT USING (public.user_owns_college(college_id));

CREATE POLICY "Users can manage their college classrooms" ON classrooms
    FOR ALL USING (public.user_owns_college(college_id));

-- Labs policies
CREATE POLICY "Users can view their college labs" ON labs
    FOR SELECT USING (public.user_owns_college(college_id));

CREATE POLICY "Users can manage their college labs" ON labs
    FOR ALL USING (public.user_owns_college(college_id));

-- Subjects policies
CREATE POLICY "Users can view their college subjects" ON subjects
    FOR SELECT USING (public.user_owns_college(college_id));

CREATE POLICY "Users can manage their college subjects" ON subjects
    FOR ALL USING (public.user_owns_college(college_id));

-- Faculty policies
CREATE POLICY "Users can view their college faculty" ON faculty
    FOR SELECT USING (public.user_owns_college(college_id));

CREATE POLICY "Users can manage their college faculty" ON faculty
    FOR ALL USING (public.user_owns_college(college_id));

-- Faculty subjects policies
CREATE POLICY "Users can view their college faculty_subjects" ON faculty_subjects
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM faculty f
            WHERE f.id = faculty_subjects.faculty_id
            AND public.user_owns_college(f.college_id)
        )
    );

CREATE POLICY "Users can manage their college faculty_subjects" ON faculty_subjects
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM faculty f
            WHERE f.id = faculty_subjects.faculty_id
            AND public.user_owns_college(f.college_id)
        )
    );

-- Batches policies
CREATE POLICY "Users can view their college batches" ON batches
    FOR SELECT USING (public.user_owns_college(college_id));

CREATE POLICY "Users can manage their college batches" ON batches
    FOR ALL USING (public.user_owns_college(college_id));

-- Timetable slots policies
CREATE POLICY "Users can view their college timetable_slots" ON timetable_slots
    FOR SELECT USING (public.user_owns_college(college_id));

CREATE POLICY "Users can manage their college timetable_slots" ON timetable_slots
    FOR ALL USING (public.user_owns_college(college_id));

-- Syllabus uploads policies
CREATE POLICY "Users can view their college syllabus_uploads" ON syllabus_uploads
    FOR SELECT USING (public.user_owns_college(college_id));

CREATE POLICY "Users can manage their college syllabus_uploads" ON syllabus_uploads
    FOR ALL USING (public.user_owns_college(college_id));

-- Timetable generations policies
CREATE POLICY "Users can view their college timetable_generations" ON timetable_generations
    FOR SELECT USING (public.user_owns_college(college_id));

CREATE POLICY "Users can manage their college timetable_generations" ON timetable_generations
    FOR ALL USING (public.user_owns_college(college_id));

-- ===========================================
-- TRIGGERS
-- ===========================================

-- Update timestamps trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables
CREATE TRIGGER update_colleges_updated_at BEFORE UPDATE ON colleges
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_departments_updated_at BEFORE UPDATE ON departments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_semesters_updated_at BEFORE UPDATE ON semesters
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_classrooms_updated_at BEFORE UPDATE ON classrooms
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_labs_updated_at BEFORE UPDATE ON labs
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_subjects_updated_at BEFORE UPDATE ON subjects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_faculty_updated_at BEFORE UPDATE ON faculty
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_batches_updated_at BEFORE UPDATE ON batches
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_timetable_slots_updated_at BEFORE UPDATE ON timetable_slots
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_syllabus_uploads_updated_at BEFORE UPDATE ON syllabus_uploads
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_timetable_generations_updated_at BEFORE UPDATE ON timetable_generations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ===========================================
-- STORAGE BUCKET SETUP (for PDF uploads)
-- ===========================================

-- Create storage bucket for syllabus PDFs
INSERT INTO storage.buckets (id, name, public)
VALUES ('syllabus-pdfs', 'syllabus-pdfs', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Users can upload their college syllabus" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'syllabus-pdfs' AND
        auth.uid() IN (
            SELECT user_id FROM colleges WHERE id::text = (storage.foldername(name))[1]
        )
    );

CREATE POLICY "Users can view their college syllabus" ON storage.objects
    FOR SELECT USING (
        bucket_id = 'syllabus-pdfs' AND
        auth.uid() IN (
            SELECT user_id FROM colleges WHERE id::text = (storage.foldername(name))[1]
        )
    );

CREATE POLICY "Users can delete their college syllabus" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'syllabus-pdfs' AND
        auth.uid() IN (
            SELECT user_id FROM colleges WHERE id::text = (storage.foldername(name))[1]
        )
    );
