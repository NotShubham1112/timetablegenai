'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Semester } from '@/types';

export function useSemesters(collegeId?: string) {
    const [semesters, setSemesters] = useState<Semester[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const supabase = useMemo(() => createClient(), []);

    const fetchSemesters = useCallback(async () => {
        if (!collegeId) return;

        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('semesters')
                .select('*, department:departments(*)')
                .eq('college_id', collegeId)
                .order('year_number')
                .order('semester_number');

            if (error) throw error;
            setSemesters(data || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch semesters');
        } finally {
            setLoading(false);
        }
    }, [collegeId, supabase]);

    useEffect(() => {
        fetchSemesters();
    }, [fetchSemesters]);

    const createSemester = async (semesterData: Omit<Semester, 'id' | 'created_at' | 'updated_at' | 'department'>) => {
        try {
            const { data, error } = await supabase
                .from('semesters')
                .insert([semesterData])
                .select('*, department:departments(*)')
                .single();

            if (error) throw error;
            setSemesters(prev => [...prev, data]);
            return data;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create semester');
            throw err;
        }
    };

    const updateSemester = async (id: string, updates: Partial<Semester>) => {
        try {
            const { data, error } = await supabase
                .from('semesters')
                .update(updates)
                .eq('id', id)
                .select('*, department:departments(*)')
                .single();

            if (error) throw error;
            setSemesters(prev => prev.map(s => s.id === id ? data : s));
            return data;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update semester');
            throw err;
        }
    };

    const deleteSemester = async (id: string) => {
        try {
            const { error } = await supabase
                .from('semesters')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setSemesters(prev => prev.filter(s => s.id !== id));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete semester');
            throw err;
        }
    };

    return {
        semesters,
        loading,
        error,
        fetchSemesters,
        createSemester,
        updateSemester,
        deleteSemester,
    };
}
