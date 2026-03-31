'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Classroom, Lab } from '@/types';

export function useClassrooms(collegeId?: string) {
    const [classrooms, setClassrooms] = useState<Classroom[]>([]);
    const [labs, setLabs] = useState<Lab[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const supabase = useMemo(() => createClient(), []);

    const fetchClassrooms = useCallback(async () => {
        if (!collegeId) return;

        try {
            setLoading(true);
            const [{ data: classroomsData, error: classroomsError }, { data: labsData, error: labsError }] = await Promise.all([
                supabase.from('classrooms').select('*').eq('college_id', collegeId).order('name'),
                supabase.from('labs').select('*').eq('college_id', collegeId).order('name'),
            ]);

            if (classroomsError) throw classroomsError;
            if (labsError) throw labsError;

            setClassrooms(classroomsData || []);
            setLabs(labsData || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch classrooms');
        } finally {
            setLoading(false);
        }
    }, [collegeId, supabase]);

    useEffect(() => {
        fetchClassrooms();
    }, [fetchClassrooms]);

    // Classroom operations
    const createClassroom = async (classroomData: Omit<Classroom, 'id' | 'created_at' | 'updated_at'>) => {
        try {
            const { data, error } = await supabase
                .from('classrooms')
                .insert([classroomData])
                .select()
                .single();

            if (error) throw error;
            setClassrooms(prev => [...prev, data]);
            return data;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create classroom');
            throw err;
        }
    };

    const updateClassroom = async (id: string, updates: Partial<Classroom>) => {
        try {
            const { data, error } = await supabase
                .from('classrooms')
                .update(updates)
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;
            setClassrooms(prev => prev.map(c => c.id === id ? data : c));
            return data;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update classroom');
            throw err;
        }
    };

    const deleteClassroom = async (id: string) => {
        try {
            const { error } = await supabase.from('classrooms').delete().eq('id', id);
            if (error) throw error;
            setClassrooms(prev => prev.filter(c => c.id !== id));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete classroom');
            throw err;
        }
    };

    // Lab operations
    const createLab = async (labData: Omit<Lab, 'id' | 'created_at' | 'updated_at'>) => {
        try {
            const { data, error } = await supabase
                .from('labs')
                .insert([labData])
                .select()
                .single();

            if (error) throw error;
            setLabs(prev => [...prev, data]);
            return data;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create lab');
            throw err;
        }
    };

    const updateLab = async (id: string, updates: Partial<Lab>) => {
        try {
            const { data, error } = await supabase
                .from('labs')
                .update(updates)
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;
            setLabs(prev => prev.map(l => l.id === id ? data : l));
            return data;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update lab');
            throw err;
        }
    };

    const deleteLab = async (id: string) => {
        try {
            const { error } = await supabase.from('labs').delete().eq('id', id);
            if (error) throw error;
            setLabs(prev => prev.filter(l => l.id !== id));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete lab');
            throw err;
        }
    };

    return {
        classrooms,
        labs,
        loading,
        error,
        fetchClassrooms,
        createClassroom,
        updateClassroom,
        deleteClassroom,
        createLab,
        updateLab,
        deleteLab,
    };
}
