'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { createClient } from '@/lib/supabase/client';
import { TimetableSlot, TimetableGeneration, GenerationConfig } from '@/types';

export function useTimetable(semesterId?: string) {
    const [slots, setSlots] = useState<TimetableSlot[]>([]);
    const [generations, setGenerations] = useState<TimetableGeneration[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const supabase = useMemo(() => createClient(), []);

    const fetchSlots = useCallback(async () => {
        if (!semesterId) return;

        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('timetable_slots')
                .select('*, subject:subjects(*), faculty:faculty(*), classroom:classrooms(*), lab:labs(*), batch:batches(*)')
                .eq('semester_id', semesterId)
                .order('day_of_week')
                .order('start_time');

            if (error) throw error;
            setSlots(data || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch timetable');
        } finally {
            setLoading(false);
        }
    }, [semesterId, supabase]);

    const fetchGenerations = useCallback(async (collegeId: string) => {
        try {
            const { data, error } = await supabase
                .from('timetable_generations')
                .select('*, semester:semesters(*)')
                .eq('college_id', collegeId)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setGenerations(data || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch generations');
        }
    }, [supabase]);

    useEffect(() => {
        fetchSlots();
    }, [fetchSlots]);

    const generateTimetable = async (config: GenerationConfig) => {
        try {
            const response = await fetch('/api/generate-timetable', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(config),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to generate timetable');
            }

            const data = await response.json();
            await fetchSlots();
            return data;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to generate timetable');
            throw err;
        }
    };

    const updateSlot = async (id: string, updates: Partial<TimetableSlot>) => {
        try {
            const { data, error } = await supabase
                .from('timetable_slots')
                .update(updates)
                .eq('id', id)
                .select('*, subject:subjects(*), faculty:faculty(*), classroom:classrooms(*), lab:labs(*), batch:batches(*)')
                .single();

            if (error) throw error;
            setSlots(prev => prev.map(s => s.id === id ? data : s));
            return data;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update slot');
            throw err;
        }
    };

    const deleteSlot = async (id: string) => {
        try {
            const { error } = await supabase.from('timetable_slots').delete().eq('id', id);
            if (error) throw error;
            setSlots(prev => prev.filter(s => s.id !== id));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete slot');
            throw err;
        }
    };

    const clearTimetable = async (semesterIdToClear: string) => {
        try {
            const { error } = await supabase
                .from('timetable_slots')
                .delete()
                .eq('semester_id', semesterIdToClear);

            if (error) throw error;
            setSlots([]);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to clear timetable');
            throw err;
        }
    };

    return {
        slots,
        generations,
        loading,
        error,
        fetchSlots,
        fetchGenerations,
        generateTimetable,
        updateSlot,
        deleteSlot,
        clearTimetable,
    };
}
