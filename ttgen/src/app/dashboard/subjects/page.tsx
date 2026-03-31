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
import { useSubjects } from '@/hooks/useSubjects';
import { MoreHorizontal, Plus, Trash2, Loader2 } from 'lucide-react';

const subjectTypes = [
  { value: 'theory', label: 'Theory' },
  { value: 'lab', label: 'Lab' },
  { value: 'both', label: 'Both' },
];

const labTypes = [
  { value: 'computer', label: 'Computer' },
  { value: 'chemistry', label: 'Chemistry' },
  { value: 'physics', label: 'Physics' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'mechanical', label: 'Mechanical' },
];

const subjectSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  code: z.string().min(1, 'Code is required'),
  type: z.string().min(1, 'Type is required'),
  hours_per_week: z.string().min(1, 'Hours per week is required'),
  credits: z.string().optional(),
  semester_id: z.string().min(1, 'Semester is required'),
  department_id: z.string().optional(),
  lab_type: z.string().optional(),
});

type SubjectForm = z.infer<typeof subjectSchema>;

export default function SubjectsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const { college } = useCollege();
  const { departments } = useDepartments(college?.id);
  const { semesters } = useSemesters(college?.id);
  const { subjects, loading, createSubject, deleteSubject } = useSubjects(college?.id);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SubjectForm>({
    resolver: zodResolver(subjectSchema),
  });

  const subjectType = watch('type');

  async function onSubmit(data: SubjectForm) {
    if (!college) return;

    try {
      await createSubject({
        college_id: college.id,
        semester_id: data.semester_id,
        department_id: data.department_id,
        name: data.name,
        code: data.code.toUpperCase(),
        type: data.type as 'theory' | 'lab' | 'both',
        hours_per_week: parseInt(data.hours_per_week),
        lab_type: data.lab_type,
        requires_batches: data.type === 'lab',
        num_batches: data.type === 'lab' ? 3 : 1,
        credits: data.credits ? parseInt(data.credits) : (data.type === 'lab' ? 1 : 3),
        is_active: true,
      });

      toast({
        title: 'Success',
        description: 'Subject created successfully',
      });

      setIsDialogOpen(false);
      reset();
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to create subject',
        variant: 'destructive',
      });
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteSubject(id);
      toast({
        title: 'Success',
        description: 'Subject deleted successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete subject',
        variant: 'destructive',
      });
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Subjects</h1>
          <p className="text-muted-foreground">Manage subjects for your semesters</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Subject
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add Subject</DialogTitle>
              <DialogDescription>
                Add a new subject to your curriculum
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Subject Name</Label>
                  <Input id="name" placeholder="e.g., Data Structures" {...register('name')} />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name.message}</p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="code">Subject Code</Label>
                  <Input id="code" placeholder="e.g., CS201" {...register('code')} />
                  {errors.code && (
                    <p className="text-sm text-destructive">{errors.code.message}</p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label>Semester</Label>
                  <Select onValueChange={(value) => setValue('semester_id', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select semester" />
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

                <div className="grid gap-2">
                  <Label>Subject Type</Label>
                  <Select onValueChange={(value) => setValue('type', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjectTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.type && (
                    <p className="text-sm text-destructive">{errors.type.message}</p>
                  )}
                </div>

                {(subjectType === 'lab' || subjectType === 'both') && (
                  <div className="grid gap-2">
                    <Label>Lab Type</Label>
                    <Select onValueChange={(value) => setValue('lab_type', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select lab type" />
                      </SelectTrigger>
                      <SelectContent>
                        {labTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="hours">Hours/Week</Label>
                    <Input id="hours" type="number" {...register('hours_per_week')} />
                    {errors.hours_per_week && (
                      <p className="text-sm text-destructive">{errors.hours_per_week.message}</p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="credits">Credits</Label>
                    <Input id="credits" type="number" {...register('credits')} />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label>Department (Optional)</Label>
                  <Select onValueChange={(value) => setValue('department_id', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
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
                <TableHead>Code</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Hours/Week</TableHead>
                <TableHead>Credits</TableHead>
                <TableHead>Semester</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : subjects.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No subjects found. Add your first subject above.
                  </TableCell>
                </TableRow>
              ) : (
                subjects.map((subject) => (
                  <TableRow key={subject.id}>
                    <TableCell className="font-medium">{subject.code}</TableCell>
                    <TableCell>{subject.name}</TableCell>
                    <TableCell>
                      <Badge variant={subject.type === 'theory' ? 'secondary' : 'default'}>
                        {subject.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{subject.hours_per_week}</TableCell>
                    <TableCell>{subject.credits}</TableCell>
                    <TableCell>{subject.semester?.name}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(subject.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
