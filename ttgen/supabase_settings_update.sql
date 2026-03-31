-- ===========================================
-- SUPABASE SETTINGS UPDATE
-- Run this in your Supabase SQL Editor
-- ===========================================

-- 1. Add missing columns to colleges table if they don't exist
ALTER TABLE colleges 
ADD COLUMN IF NOT EXISTS display_name TEXT,
ADD COLUMN IF NOT EXISTS weekly_start_day TEXT DEFAULT 'Monday',
ADD COLUMN IF NOT EXISTS academic_year_format TEXT DEFAULT 'YYYY-YYYY';

-- 2. Helper function to reset college data safely
-- This function will clear all related records for a specific college
CREATE OR REPLACE FUNCTION public.reset_college_data(college_uuid UUID)
RETURNS VOID AS $$
BEGIN
    -- Only allow if user owns the college
    -- The user_owns_college function should already exist in your schema.sql
    IF public.user_owns_college(college_uuid) THEN
        -- Delete dependent records in order to respect foreign key constraints
        DELETE FROM timetable_slots WHERE college_id = college_uuid;
        DELETE FROM timetable_generations WHERE college_id = college_uuid;
        DELETE FROM syllabus_uploads WHERE college_id = college_uuid;
        DELETE FROM faculty_subjects fs WHERE EXISTS (
            SELECT 1 FROM faculty f 
            WHERE f.id = fs.faculty_id AND f.college_id = college_uuid
        );
        DELETE FROM faculty WHERE college_id = college_uuid;
        DELETE FROM subjects WHERE college_id = college_uuid;
        DELETE FROM batches WHERE college_id = college_uuid;
        DELETE FROM semesters WHERE college_id = college_uuid;
        DELETE FROM classrooms WHERE college_id = college_uuid;
        DELETE FROM labs WHERE college_id = college_uuid;
        DELETE FROM departments WHERE college_id = college_uuid;
        
        -- Note: We do NOT delete the college record itself here.
        -- That is handled by "Delete Account" which CASCADE deletes from auth.users.
    ELSE
        RAISE EXCEPTION 'Permission denied: Current user does not own this college record.';
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
