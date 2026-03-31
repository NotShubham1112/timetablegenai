'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';
import { createClient } from '@/lib/supabase/client';
import { College } from '@/types';
import {
  Building2,
  GraduationCap,
  Calendar,
  Upload,
  Play,
  Settings,
  LogOut,
  LayoutDashboard,
  BookOpen,
  DoorOpen,
  FlaskConical,
  ChevronsUpDown,
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
  user: User;
  college: College | null;
}

const sidebarNavItems = [
  {
    title: 'Overview',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Departments',
    href: '/dashboard/departments',
    icon: Building2,
  },
  {
    title: 'Semesters',
    href: '/dashboard/semesters',
    icon: Calendar,
  },
  {
    title: 'Classrooms',
    href: '/dashboard/classrooms',
    icon: DoorOpen,
  },
  {
    title: 'Labs',
    href: '/dashboard/labs',
    icon: FlaskConical,
  },
  {
    title: 'Subjects',
    href: '/dashboard/subjects',
    icon: BookOpen,
  },
  {
    title: 'Upload Syllabus',
    href: '/dashboard/upload',
    icon: Upload,
  },
  {
    title: 'Generate Timetable',
    href: '/dashboard/generate',
    icon: Play,
  },
];

export function DashboardLayout({ children, user, college }: DashboardLayoutProps) {
  const pathname = usePathname();
  const { toast } = useToast();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.',
    });
    window.location.href = '/login';
  }

  const initials =
    college?.name?.slice(0, 2).toUpperCase() ||
    user.email?.charAt(0).toUpperCase() ||
    'U';

  return (
    <div className="flex min-h-screen bg-background">
      {/* ── Sidebar ── */}
      <aside className="w-64 shrink-0 border-r bg-card flex flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg tracking-tight">TimetableGen</span>
          </Link>
        </div>

        <Separator />

        {/* Navigation */}
        <ScrollArea className="flex-1 px-4 py-4">
          <nav className="flex flex-col gap-1">
            {sidebarNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  <Icon className="h-5 w-5 shrink-0" />
                  {item.title}
                </Link>
              );
            })}
          </nav>
        </ScrollArea>

        <Separator />

        {/* User menu */}
        <div className="p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 h-auto hover:bg-accent hover:text-accent-foreground"
              >
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarFallback className="font-bold">{initials}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start text-left min-w-0">
                  <span className="text-sm font-bold truncate max-w-[120px]">
                    {college?.name || 'My College'}
                  </span>
                  <span className="text-xs text-muted-foreground truncate max-w-[120px]">
                    {user.email}
                  </span>
                </div>
                <ChevronsUpDown className="ml-auto h-4 w-4 text-muted-foreground shrink-0" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="top" className="w-56 mb-1">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium leading-none">{college?.name || 'My College'}</p>
                  <p className="text-xs text-muted-foreground leading-none">{user.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href="/dashboard/settings">
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:bg-destructive focus:text-destructive-foreground">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-10">
          {children}
        </div>
      </main>
    </div>
  );
}
