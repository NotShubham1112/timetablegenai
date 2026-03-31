'use client';

import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import { useCollege } from '@/hooks/useCollege';
import { useDepartments } from '@/hooks/useDepartments';
import { useSemesters } from '@/hooks/useSemesters';
import { useClassrooms } from '@/hooks/useClassrooms';
import { useSubjects } from '@/hooks/useSubjects';
import {
  Building2,
  DoorOpen,
  FlaskConical,
  BookOpen,
  Calendar,
  Upload,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react';

export default function DashboardPage() {
  const { college, loading: collegeLoading } = useCollege();
  const { departments, loading: departmentsLoading } = useDepartments(college?.id);
  const { semesters, loading: semestersLoading } = useSemesters(college?.id);
  const { classrooms, labs, loading: roomsLoading } = useClassrooms(college?.id);
  const { subjects, loading: subjectsLoading } = useSubjects(college?.id);

  const isLoading =
    collegeLoading ||
    departmentsLoading ||
    semestersLoading ||
    roomsLoading ||
    subjectsLoading;

  const stats = [
    {
      title: 'Departments',
      value: departments.length,
      icon: Building2,
      description: 'Total departments',
      href: '/dashboard/departments',
    },
    {
      title: 'Semesters',
      value: semesters.length,
      icon: Calendar,
      description: 'Active semesters',
      href: '/dashboard/semesters',
    },
    {
      title: 'Classrooms',
      value: classrooms.length,
      icon: DoorOpen,
      description: 'Available rooms',
      href: '/dashboard/classrooms',
    },
    {
      title: 'Labs',
      value: labs.length,
      icon: FlaskConical,
      description: 'Laboratory spaces',
      href: '/dashboard/labs',
    },
    {
      title: 'Subjects',
      value: subjects.length,
      icon: BookOpen,
      description: 'Subjects configured',
      href: '/dashboard/subjects',
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* ── Header ── */}
      <div className="flex flex-col gap-1 pb-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <span className="block text-sm text-muted-foreground">
          Welcome back to{' '}
          {isLoading ? (
            <Skeleton className="inline-block h-4 w-32 align-middle" />
          ) : (
            <span className="font-medium text-foreground">
              {college?.name || 'your college'}
            </span>
          )}
        </span>
      </div>

      {/* ── Stats Cards ── */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
        {isLoading
          ? Array.from({ length: 5 }).map((_, i) => (
              <Card key={i}>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-4 rounded" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-12 mb-1" />
                  <Skeleton className="h-3 w-24" />
                </CardContent>
              </Card>
            ))
          : stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Link key={stat.title} href={stat.href}>
                  <Card className="hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer group">
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                      <CardTitle className="text-sm font-medium">
                        {stat.title}
                      </CardTitle>
                      <Icon className="h-4 w-4 text-muted-foreground group-hover:text-current transition-colors" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <p className="text-xs text-muted-foreground mt-1 group-hover:text-current group-hover:opacity-80">
                        {stat.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
      </div>

      {/* ── Bottom row: Quick Actions + Recent Semesters ── */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
        {/* Quick Actions — narrower column */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Jump straight to common tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Link href="/dashboard/upload" className="w-full">
              <Button className="w-full justify-between">
                <span className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  Upload Syllabus
                </span>
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/dashboard/generate" className="w-full">
              <Button
                variant="outline"
                className="w-full justify-between"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  Generate Timetable
                </span>
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Recent Semesters — wider column */}
        <Card className="lg:col-span-5">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Semesters</CardTitle>
                <CardDescription>
                  Showing the last 5 semesters
                </CardDescription>
              </div>
              <Link href="/dashboard/semesters">
                <Button variant="ghost" size="sm" className="gap-1 text-sm">
                  View all
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : semesters.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
                <Calendar className="h-10 w-10 text-muted-foreground" />
                <p className="text-muted-foreground">
                  No semesters yet —{' '}
                  <Link
                    href="/dashboard/semesters"
                    className="text-primary hover:underline underline-offset-4 font-medium"
                  >
                    create one
                  </Link>
                </p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Year / Sem</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {semesters.slice(0, 5).map((semester) => (
                    <TableRow key={semester.id}>
                      <TableCell className="font-medium">
                        {semester.name}
                      </TableCell>
                      <TableCell>
                        Year {semester.year_number} · Sem {semester.semester_number}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={semester.is_active ? 'default' : 'secondary'}
                        >
                          {semester.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
