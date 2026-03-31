'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const settingsSchema = z.object({
  display_name: z.string().min(2, "Display name is too short").optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
  timezone: z.string(),
  weekly_start_day: z.string(),
  academic_year_format: z.string(),
});

export async function getSettings() {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('colleges')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle();

  if (error) {
    console.error('Error fetching settings:', error);
    return null;
  }
  return data;
}

export async function updateSettings(formData: any) {
  try {
    const supabase = await createClient();
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    const validated = settingsSchema.parse(formData);

    const { error } = await supabase
      .from('colleges')
      .update({
        display_name: validated.display_name,
        phone: validated.phone,
        timezone: validated.timezone,
        weekly_start_day: validated.weekly_start_day,
        academic_year_format: validated.academic_year_format,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', user.id);

    if (error) throw error;
    
    revalidatePath('/dashboard/settings');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to update settings" };
  }
}

export async function resetData() {
  try {
    const supabase = await createClient();
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    const { data: college } = await supabase
      .from('colleges')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (!college) throw new Error("College not found");

    // Call the custom RPC function created via SQL
    const { error } = await supabase.rpc('reset_college_data', {
      college_uuid: college.id,
    });

    if (error) throw error;
    
    revalidatePath('/dashboard');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to reset data" };
  }
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return { success: true };
}
