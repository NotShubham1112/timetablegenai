'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Subject } from '@/types';

export function useSubjects(collegeId?: string, semesterId?: string) {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const supabase = useMemo(() => createClient(), []);

    const fetchSubjects = useCallback(async () => {
        if (!collegeId) return;

        try {
            setLoading(true);
            let query = supabase
                .from('subjects')
                .select('*, department:departments(*), semester:semesters(*)')
                .eq('college_id', collegeId)
                .order('code');

            if (semesterId) {
                query = query.eq('semester_id', semesterId);
            }

            const { data, error } = await query;

            if (error) throw error;
            setSubjects(data || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch subjects');
        } finally {
            setLoading(false);
        }
    }, [collegeId, semesterId, supabase]);

    useEffect(() => {
        fetchSubjects();
    }, [fetchSubjects]);

    const createSubject = async (subjectData: Omit<Subject, 'id' | 'created_at' | 'updated_at' | 'department' | 'semester'>) => {
        try {
            const { data, error } = await supabase
                .from('subjects')
                .insert([subjectData])
                .select('*, department:departments(*), semester:semesters(*)')
                .single();

            if (error) throw error;
            setSubjects(prev => [...prev, data]);
            return data;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create subject');
            throw err;
        }
    };

    const createSubjectsBatch = async (subjectsData: Omit<Subject, 'id' | 'created_at' | 'updated_at' | 'department' | 'semester'>[]) => {
        try {
            const { data, error } = await supabase
                .from('subjects')
                .insert(subjectsData)
                .select('*, department:departments(*), semester:semesters(*)');

            if (error) throw error;
            setSubjects(prev => [...prev, ...(data || [])]);
            return data;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create subjects');
            throw err;
        }
    };

    const updateSubject = async (id: string, updates: Partial<Subject>) => {
        try {
            const { data, error } = await supabase
                .from('subjects')
                .update(updates)
                .eq('id', id)
                .select('*, department:departments(*), semester:semesters(*)')
                .single();

            if (error) throw error;
            setSubjects(prev => prev.map(s => s.id === id ? data : s));
            return data;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update subject');
            throw err;
        }
    };

    const deleteSubject = async (id: string) => {
        try {
            const { error } = await supabase.from('subjects').delete().eq('id', id);
            if (error) throw error;
            setSubjects(prev => prev.filter(s => s.id !== id));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete subject');
            throw err;
        }
    };

    return {
        subjects,
        loading,
        error,
        fetchSubjects,
        createSubject,
        createSubjectsBatch,
        updateSubject,
        deleteSubject,
    };
}
