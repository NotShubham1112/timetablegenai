'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { createClient } from '@/lib/supabase/client';
import { College } from '@/types';

export function useCollege() {
    const [college, setCollege] = useState<College | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const supabase = useMemo(() => createClient(), []);

    const fetchCollege = useCallback(async () => {
        try {
            setLoading(true);
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                setCollege(null);
                return;
            }

            const { data, error } = await supabase
                .from('colleges')
                .select('*')
                .eq('user_id', user.id)
                .single();

            if (error) throw error;
            setCollege(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch college');
        } finally {
            setLoading(false);
        }
    }, [supabase]);

    useEffect(() => {
        fetchCollege();
    }, [fetchCollege]);

    const createCollege = async (collegeData: Omit<College, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('Not authenticated');

            const { data, error } = await supabase
                .from('colleges')
                .insert([{ ...collegeData, user_id: user.id }])
                .select()
                .single();

            if (error) throw error;
            setCollege(data);
            return data;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create college');
            throw err;
        }
    };

    const updateCollege = async (id: string, updates: Partial<College>) => {
        try {
            const { data, error } = await supabase
                .from('colleges')
                .update(updates)
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;
            setCollege(data);
            return data;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update college');
            throw err;
        }
    };

    return {
        college,
        loading,
        error,
        fetchCollege,
        createCollege,
        updateCollege,
    };
}
