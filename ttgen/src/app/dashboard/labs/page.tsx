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
import { useToast } from '@/components/ui/use-toast';
import { useCollege } from '@/hooks/useCollege';
import { useClassrooms } from '@/hooks/useClassrooms';
import { MoreHorizontal, Plus, Trash2, Loader2 } from 'lucide-react';

const labTypes = [
  { value: 'computer', label: 'Computer Lab' },
  { value: 'chemistry', label: 'Chemistry Lab' },
  { value: 'physics', label: 'Physics Lab' },
  { value: 'electronics', label: 'Electronics Lab' },
  { value: 'mechanical', label: 'Mechanical Lab' },
  { value: 'other', label: 'Other' },
];

const labSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  code: z.string().min(1, 'Code is required'),
  lab_type: z.string().min(1, 'Lab type is required'),
  building: z.string().optional(),
  floor: z.string().optional(),
  capacity: z.string().optional(),
  num_workstations: z.string().optional(),
});

type LabForm = z.infer<typeof labSchema>;

export default function LabsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const { college } = useCollege();
  const { labs, loading, createLab, deleteLab } = useClassrooms(college?.id);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LabForm>({
    resolver: zodResolver(labSchema),
  });

  async function onSubmit(data: LabForm) {
    if (!college) return;

    try {
      await createLab({
        college_id: college.id,
        name: data.name,
        code: data.code,
        lab_type: data.lab_type,
        building: data.building,
        floor: data.floor ? parseInt(data.floor) : undefined,
        capacity: data.capacity ? parseInt(data.capacity) : 20,
        num_workstations: data.num_workstations ? parseInt(data.num_workstations) : 20,
        has_projector: false,
        is_active: true,
      });

      toast({
        title: 'Success',
        description: 'Lab created successfully',
      });

      setIsDialogOpen(false);
      reset();
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to create lab',
        variant: 'destructive',
      });
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteLab(id);
      toast({
        title: 'Success',
        description: 'Lab deleted successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete lab',
        variant: 'destructive',
      });
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Labs</h1>
          <p className="text-muted-foreground">Manage your laboratory rooms</p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Lab
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add Lab</DialogTitle>
              <DialogDescription>
                Add a new laboratory to your college
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" {...register('name')} />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name.message}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="code">Code</Label>
                  <Input id="code" placeholder="e.g., LAB101" {...register('code')} />
                  {errors.code && (
                    <p className="text-sm text-destructive">{errors.code.message}</p>
                  )}
                </div>

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
                  {errors.lab_type && (
                    <p className="text-sm text-destructive">{errors.lab_type.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="building">Building</Label>
                    <Input id="building" {...register('building')} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="floor">Floor</Label>
                    <Input id="floor" type="number" {...register('floor')} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="capacity">Capacity</Label>
                    <Input id="capacity" type="number" {...register('capacity')} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="workstations">Workstations</Label>
                    <Input id="workstations" type="number" {...register('num_workstations')} />
                  </div>
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
                <TableHead>Building</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : labs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No labs found. Add your first lab above.
                  </TableCell>
                </TableRow>
              ) : (
                labs.map((lab) => (
                  <TableRow key={lab.id}>
                    <TableCell className="font-medium">{lab.code}</TableCell>
                    <TableCell>{lab.name}</TableCell>
                    <TableCell>
                      <span className="capitalize">{lab.lab_type}</span>
                    </TableCell>
                    <TableCell>{lab.building || '-'}</TableCell>
                    <TableCell>{lab.capacity}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(lab.id)}>
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
