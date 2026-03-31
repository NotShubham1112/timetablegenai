'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Department } from '@/types';

export function useDepartments(collegeId?: string) {
    const [departments, setDepartments] = useState<Department[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const supabase = useMemo(() => createClient(), []);

    const fetchDepartments = useCallback(async () => {
        if (!collegeId) return;

        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('departments')
                .select('*')
                .eq('college_id', collegeId)
                .order('name');

            if (error) throw error;
            setDepartments(data || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch departments');
        } finally {
            setLoading(false);
        }
    }, [collegeId, supabase]);

    useEffect(() => {
        fetchDepartments();
    }, [fetchDepartments]);

    const createDepartment = async (departmentData: Omit<Department, 'id' | 'created_at' | 'updated_at'>) => {
        try {
            const { data, error } = await supabase
                .from('departments')
                .insert([departmentData])
                .select()
                .single();

            if (error) throw error;
            setDepartments(prev => [...prev, data]);
            return data;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create department');
            throw err;
        }
    };

    const updateDepartment = async (id: string, updates: Partial<Department>) => {
        try {
            const { data, error } = await supabase
                .from('departments')
                .update(updates)
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;
            setDepartments(prev => prev.map(d => d.id === id ? data : d));
            return data;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update department');
            throw err;
        }
    };

    const deleteDepartment = async (id: string) => {
        try {
            const { error } = await supabase
                .from('departments')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setDepartments(prev => prev.filter(d => d.id !== id));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete department');
            throw err;
        }
    };

    return {
        departments,
        loading,
        error,
        fetchDepartments,
        createDepartment,
        updateDepartment,
        deleteDepartment,
    };
}
