'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';
import { useCollege } from '@/hooks/useCollege';
import { useSemesters } from '@/hooks/useSemesters';
import { useSubjects } from '@/hooks/useSubjects';
import { useClassrooms } from '@/hooks/useClassrooms';
import { Play, Loader2, Check, AlertCircle, ArrowRight } from 'lucide-react';

const generateSchema = z.object({
  semester_id: z.string().min(1, 'Semester is required'),
  start_time: z.string().min(1, 'Start time is required'),
  end_time: z.string().min(1, 'End time is required'),
});

type GenerateForm = z.infer<typeof generateSchema>;

export default function GeneratePage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();
  const { college } = useCollege();
  const { semesters } = useSemesters(college?.id);
  const { classrooms, labs } = useClassrooms(college?.id);

  const {
    handleSubmit,
    setValue,
    watch,
    register,
    formState: { errors },
  } = useForm<GenerateForm>({
    resolver: zodResolver(generateSchema),
    defaultValues: {
      start_time: '09:00',
      end_time: '17:00',
    },
  });

  const semesterId = watch('semester_id');
  const startTime = watch('start_time');
  const endTime = watch('end_time');
  const selectedSemester = semesters.find((s) => s.id === semesterId);

  async function onSubmit(data: GenerateForm) {
    if (!college) return;

    setIsGenerating(true);
    setResult(null);

    try {
      const response = await fetch('/api/generate-timetable', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          college_id: college.id,
          semester_id: data.semester_id,
          working_days: [1, 2, 3, 4, 5],
          start_time: data.start_time,
          end_time: data.end_time,
          slot_duration_minutes: 60,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to generate timetable');
      }

      const result = await response.json();
      setResult(result);

      toast({
        title: 'Success',
        description: 'Timetable generated successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to generate timetable',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Generate Timetable</h1>
        <p className="text-muted-foreground">
          Automatically generate a collision-free timetable using AI scheduling
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
            <CardDescription>
              Select a semester to generate the timetable
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid gap-2">
                <Label>Select Semester</Label>
                <Select onValueChange={(value) => setValue('semester_id', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a semester" />
                  </SelectTrigger>
                  <SelectContent>
                    {semesters.map((sem) => (
                      <SelectItem key={sem.id} value={sem.id}>
                        {sem.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.semester_id && (
                  <p className="text-sm text-destructive">{errors.semester_id.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Start Time</Label>
                  <Input type="time" {...register('start_time')} />
                  {errors.start_time && (
                    <p className="text-sm text-destructive">{errors.start_time.message}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label>End Time</Label>
                  <Input type="time" {...register('end_time')} />
                  {errors.end_time && (
                    <p className="text-sm text-destructive">{errors.end_time.message}</p>
                  )}
                </div>
              </div>

              {selectedSemester && (
                <div className="rounded-lg bg-muted p-4 space-y-2">
                  <p className="text-sm font-medium">Semester Details:</p>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>Academic Year: {selectedSemester.academic_year}</p>
                    <p>Year {selectedSemester.year_number} - Semester {selectedSemester.semester_number}</p>
                    {selectedSemester.department && (
                      <p>Department: {selectedSemester.department.name}</p>
                    )}
                  </div>
                </div>
              )}

              <Button
                type="submit"
                disabled={!semesterId || isGenerating}
                className="w-full"
              >
                {isGenerating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isGenerating ? 'Generating...' : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Generate Timetable
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resources Available</CardTitle>
            <CardDescription>
              Current resources configured for scheduling
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
              <span className="text-sm font-medium">Classrooms</span>
              <Badge variant="secondary">{classrooms.length}</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
              <span className="text-sm font-medium">Labs</span>
              <Badge variant="secondary">{labs.length}</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
              <span className="text-sm font-medium">Semesters</span>
              <Badge variant="secondary">{semesters.length}</Badge>
            </div>

            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground mb-2">Schedule Settings:</p>
              <div className="text-sm space-y-1">
                <p>Working Days: Monday - Friday</p>
                <p>Time: {startTime || '09:00'} - {endTime || '17:00'}</p>
                <p>Lunch Break: 1:00 PM - 2:00 PM</p>
                <p>Slot Duration: 60 minutes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {isGenerating && (
        <Card>
          <CardContent className="p-8">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <div className="space-y-2 text-center">
                <p className="font-medium">Generating Timetable...</p>
                <p className="text-sm text-muted-foreground">
                  Using CP-SAT solver to optimize schedule
                </p>
              </div>
              <div className="w-full max-w-md space-y-2">
                <Skeleton className="h-2 w-full" />
                <div className="flex gap-2">
                  <Skeleton className="h-2 w-1/3" />
                  <Skeleton className="h-2 w-1/3" />
                  <Skeleton className="h-2 w-1/3" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {result && (
        <Card className="border-green-500/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-green-500" />
              <CardTitle>Timetable Generated Successfully</CardTitle>
            </div>
            <CardDescription>
              Your timetable has been generated and is ready for review
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-2xl font-bold">{result.solution.assignments}</p>
                <p className="text-sm text-muted-foreground">Total Slots</p>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-2xl font-bold">{result.solution.unassigned.length}</p>
                <p className="text-sm text-muted-foreground">Unassigned</p>
              </div>
              <div className="p-4 rounded-lg bg-muted">
                <p className="text-2xl font-bold">{(result.solution.timeTaken / 1000).toFixed(2)}s</p>
                <p className="text-sm text-muted-foreground">Generation Time</p>
              </div>
            </div>

            {result.solution.conflicts.length > 0 && (
              <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                  <p className="font-medium">Conflicts Detected</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {result.solution.conflicts.length} conflicts found. Please review the timetable.
                </p>
              </div>
            )}

            <Link href={`/dashboard/timetable/${semesterId}`}>
              <Button className="w-full">
                View Timetable
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
