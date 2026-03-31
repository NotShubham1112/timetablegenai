'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useCollege } from '@/hooks/useCollege';
import { useDepartments } from '@/hooks/useDepartments';
import { useSemesters } from '@/hooks/useSemesters';
import { MoreHorizontal, Plus, Trash2, Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const semesterSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  academic_year: z.string().min(4, 'Academic year is required'),
  year_number: z.string().min(1, 'Year is required'),
  semester_number: z.string().min(1, 'Semester is required'),
  department_id: z.string().optional(),
});

type SemesterForm = z.infer<typeof semesterSchema>;

export default function SemestersPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const { college } = useCollege();
  const { departments } = useDepartments(college?.id);
  const { semesters, loading, createSemester, deleteSemester } = useSemesters(college?.id);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SemesterForm>({
    resolver: zodResolver(semesterSchema),
  });

  async function onSubmit(data: SemesterForm) {
    if (!college) return;

    try {
      await createSemester({
        college_id: college.id,
        department_id: (data.department_id && data.department_id !== 'none') ? data.department_id : undefined,
        name: data.name,
        academic_year: data.academic_year,
        year_number: parseInt(data.year_number),
        semester_number: parseInt(data.semester_number),
        is_active: true,
      });

      toast({
        title: 'Success',
        description: 'Semester created successfully',
      });

      setIsDialogOpen(false);
      reset();
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to create semester',
        variant: 'destructive',
      });
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteSemester(id);
      toast({
        title: 'Success',
        description: 'Semester deleted successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete semester',
        variant: 'destructive',
      });
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Semesters</h1>
          <p className="text-muted-foreground">Manage academic semesters</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Semester
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add Semester</DialogTitle>
              <DialogDescription>
                Create a new semester for your college
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Semester Name</Label>
                  <Input id="name" placeholder="e.g., Fall 2024" {...register('name')} />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name.message}</p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="academic_year">Academic Year</Label>
                  <Input id="academic_year" placeholder="e.g., 2024-2025" {...register('academic_year')} />
                  {errors.academic_year && (
                    <p className="text-sm text-destructive">{errors.academic_year.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Year</Label>
                    <Select onValueChange={(value) => setValue('year_number', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            Year {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label>Semester</Label>
                    <Select onValueChange={(value) => setValue('semester_number', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select semester" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                          <SelectItem key={sem} value={sem.toString()}>
                            Semester {sem}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label>Department (Optional)</Label>
                  <Select onValueChange={(value) => setValue('department_id', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">All Departments</SelectItem>
                      {departments.map((dept) => (
                        <SelectItem key={dept.id} value={dept.id}>
                          {dept.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Academic Year</TableHead>
                <TableHead>Year</TableHead>
                <TableHead>Semester</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : semesters.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No semesters found. Add your first semester above.
                  </TableCell>
                </TableRow>
              ) : (
                semesters.map((semester) => (
                  <TableRow key={semester.id}>
                    <TableCell className="font-medium">{semester.name}</TableCell>
                    <TableCell>{semester.academic_year}</TableCell>
                    <TableCell>Year {semester.year_number}</TableCell>
                    <TableCell>Semester {semester.semester_number}</TableCell>
                    <TableCell>{semester.department?.name || 'All'}</TableCell>
                    <TableCell>
                      <Badge variant={semester.is_active ? 'default' : 'secondary'}>
                        {semester.is_active ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Link href={`/dashboard/timetable/${semester.id}`}>
                          <Button variant="ghost" size="sm">
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </Link>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(semester.id)}>
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
