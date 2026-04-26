'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';
import { useCollege } from '@/hooks/useCollege';
import { useTimetable } from '@/hooks/useTimetable';
import { useSemesters } from '@/hooks/useSemesters';
import { TimetableSlot } from '@/types';
import { exportTimetableToPDF } from '@/lib/exports/pdf-export';
import { exportTimetableToExcel } from '@/lib/exports/excel-export';
import { Download, FileText, Grid3X3, Printer } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '12:00', '13:00',
  '14:00', '15:00', '16:00', '17:00'
];

export default function TimetablePage() {
  const params = useParams();
  const semesterId = params.id as string;
  const { toast } = useToast();
  const { college } = useCollege();
  const { semesters } = useSemesters(college?.id);
  const { slots, loading, fetchSlots } = useTimetable(semesterId);
  const [activeTab, setActiveTab] = useState('weekly');

  const semester = semesters.find((s) => s.id === semesterId);

  useEffect(() => {
    if (semesterId) {
      fetchSlots();
    }
  }, [semesterId, fetchSlots]);

  // Organize slots by day
  const slotsByDay: Record<number, TimetableSlot[]> = {};
  for (const slot of slots) {
    if (!slotsByDay[slot.day_of_week]) {
      slotsByDay[slot.day_of_week] = [];
    }
    slotsByDay[slot.day_of_week].push(slot);
  }

  // Sort slots by time
  for (const day of Object.keys(slotsByDay)) {
    slotsByDay[Number(day)].sort((a, b) => a.start_time.localeCompare(b.start_time));
  }

  // Organise slots by day and time for weekly view
  const timeSlots = Array.from(new Set(slots.map(s => s.start_time.substring(0, 5)))).sort();
  
  // Use config times if available, or fall back to defaults
  const displayTimeSlots = timeSlots.length > 0 ? timeSlots : TIME_SLOTS;

  const weeklyGrid: Record<string, Record<string, TimetableSlot | null>> = {};
  for (const day of DAYS.slice(0, 5)) {
    weeklyGrid[day] = {};
    for (const time of displayTimeSlots) {
      weeklyGrid[day][time] = null;
    }
  }

  for (const slot of slots) {
    const day = DAYS[slot.day_of_week - 1];
    const time = slot.start_time.substring(0, 5);
    if (weeklyGrid[day] && time in weeklyGrid[day]) {
      weeklyGrid[day][time] = slot;
    }
  }

  async function handleExportPDF() {
    if (!semester || !college) return;
    try {
      exportTimetableToPDF(slots, semester, college);
      toast({ title: 'Success', description: 'PDF downloaded successfully' });
    } catch {
      toast({ title: 'Error', description: 'Failed to export PDF', variant: 'destructive' });
    }
  }

  async function handleExportExcel() {
    if (!semester) return;
    try {
      exportTimetableToExcel(slots, semester);
      toast({ title: 'Success', description: 'Excel downloaded successfully' });
    } catch {
      toast({ title: 'Error', description: 'Failed to export Excel', variant: 'destructive' });
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold">Timetable</h1>
          {semester && (
            <p className="text-muted-foreground">
              {semester.name} ({semester.academic_year})
            </p>
          )}
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportPDF}>
            <FileText className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          <Button variant="outline" onClick={handleExportExcel}>
            <Download className="mr-2 h-4 w-4" />
            Export Excel
          </Button>
        </div>
      </div>

      {slots.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Grid3X3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              No timetable generated yet.{' '}
              <a href="/dashboard/generate" className="text-primary hover:underline">
                Generate one now
              </a>
            </p>
          </CardContent>
        </Card>
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="weekly">Weekly View</TabsTrigger>
            <TabsTrigger value="list">List View</TabsTrigger>
          </TabsList>

          <TabsContent value="weekly" className="mt-6">
            <Card>
              <ScrollArea className="w-full">
                <div className="min-w-[800px]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-20">Time</TableHead>
                        {DAYS.slice(0, 5).map((day) => (
                          <TableHead key={day}>{day}</TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {displayTimeSlots.map((time) => (
                        <TableRow key={time}>
                          <TableCell className="font-medium">{time}</TableCell>
                          {DAYS.slice(0, 5).map((day) => {
                            const slot = weeklyGrid[day][time];
                            if (time === '13:00') {
                              return (
                                <TableCell key={`${day}-${time}`} className="bg-muted/50">
                                  <span className="text-xs text-muted-foreground uppercase tracking-widest text-center block">Break</span>
                                </TableCell>
                              );
                            }
                            return (
                              <TableCell key={`${day}-${time}`} className="p-2 h-20">
                                {slot ? (
                                  <div className={`p-2 rounded text-xs h-full flex flex-col justify-between ${
                                    slot.slot_type === 'lab'
                                      ? 'bg-indigo-500/10 border border-indigo-500/20 text-indigo-700 dark:text-indigo-300'
                                      : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300'
                                  }`}>
                                    <div className="space-y-0.5">
                                      <p className="font-bold uppercase">{slot.subject?.code || '—'}</p>
                                      <p className="line-clamp-1 opacity-90">{slot.subject?.name || 'Unknown Subject'}</p>
                                    </div>
                                    <div className="mt-auto pt-1 border-t border-current/10 opacity-80 text-[10px]">
                                      <p className="truncate font-medium">{slot.faculty?.name || 'TBA'}</p>
                                      <p className="truncate">
                                        {slot.classroom?.name || slot.lab?.name || 'TBA'}
                                      </p>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="h-full w-full rounded border border-dashed border-muted-foreground/10" />
                                )}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </ScrollArea>
            </Card>
          </TabsContent>

          <TabsContent value="list" className="mt-6">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Day</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Room/Lab</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {slots
                      .sort((a, b) => {
                        if (a.day_of_week !== b.day_of_week) {
                          return a.day_of_week - b.day_of_week;
                        }
                        return a.start_time.localeCompare(b.start_time);
                      })
                      .map((slot) => (
                        <TableRow key={slot.id}>
                          <TableCell>{DAYS[slot.day_of_week - 1]}</TableCell>
                          <TableCell>{slot.start_time} - {slot.end_time}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{slot.subject?.name || 'Unknown Subject'}</p>
                              <p className="text-sm text-muted-foreground">{slot.subject?.code || '—'}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={slot.slot_type === 'theory' ? 'secondary' : 'default'}>
                              {slot.slot_type}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {slot.classroom?.name || slot.lab?.name || 'TBA'}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}

      {/* Summary */}
      {slots.length > 0 && (
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <p className="text-2xl font-bold">{slots.length}</p>
              <p className="text-sm text-muted-foreground">Total Slots</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-2xl font-bold">
                {new Set(slots.map((s) => s.subject_id)).size}
              </p>
              <p className="text-sm text-muted-foreground">Unique Subjects</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-2xl font-bold">
                {slots.filter((s) => s.slot_type === 'theory').length}
              </p>
              <p className="text-sm text-muted-foreground">Theory Slots</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-2xl font-bold">
                {slots.filter((s) => s.slot_type === 'lab').length}
              </p>
              <p className="text-sm text-muted-foreground">Lab Slots</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
