import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { DashboardLayout } from '@/components/dashboard-layout';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Get college data
  const { data: college } = await supabase
    .from('colleges')
    .select('*')
    .eq('user_id', user.id)
    .single();

  return (
    <DashboardLayout user={user} college={college}>
      {children}
    </DashboardLayout>
  );
}
