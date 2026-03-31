'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { useCollege } from '@/hooks/useCollege';
import { useSemesters } from '@/hooks/useSemesters';
import { useSubjects } from '@/hooks/useSubjects';
import { ExtractedSubject } from '@/types';
import { Upload, FileText, Loader2, Check, AlertCircle } from 'lucide-react';

const uploadSchema = z.object({
  semester_id: z.string().min(1, 'Semester is required'),
});

type UploadForm = z.infer<typeof uploadSchema>;

export default function UploadPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [extractedSubjects, setExtractedSubjects] = useState<ExtractedSubject[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();
  const { college } = useCollege();
  const { semesters } = useSemesters(college?.id);
  const { createSubjectsBatch } = useSubjects(college?.id);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UploadForm>({
    resolver: zodResolver(uploadSchema),
  });

  const semesterId = watch('semester_id');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      if (file.type === 'application/pdf') {
        setSelectedFile(file);
      } else {
        toast({
          title: 'Error',
          description: 'Please upload a PDF file',
          variant: 'destructive',
        });
      }
    }
  }, [toast]);

  async function onSubmit(data: UploadForm) {
    if (!selectedFile || !college) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('college_id', college.id);
      formData.append('semester_id', data.semester_id);

      const response = await fetch('/api/extract-syllabus', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to extract subjects');
      }

      const result = await response.json();
      setExtractedSubjects(result.subjects);
      setUploadProgress(100);

      toast({
        title: 'Success',
        description: `Extracted ${result.subjects.length} subjects from syllabus`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to process syllabus',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  }

  async function handleImportAll() {
    if (!college || !semesterId || extractedSubjects.length === 0) return;

    try {
      const subjectsToCreate = extractedSubjects.map((subject) => ({
        college_id: college.id,
        semester_id: semesterId,
        name: subject.name,
        code: subject.code,
        type: subject.type,
        hours_per_week: subject.hours_per_week,
        lab_type: subject.lab_type,
        requires_batches: subject.requires_batches,
        num_batches: subject.num_batches,
        credits: subject.credits || (subject.type === 'lab' ? 1 : 3),
        is_active: true,
      }));

      await createSubjectsBatch(subjectsToCreate);

      toast({
        title: 'Success',
        description: `Imported ${subjectsToCreate.length} subjects successfully`,
      });

      setExtractedSubjects([]);
      setSelectedFile(null);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to import subjects',
        variant: 'destructive',
      });
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Upload Syllabus</h1>
        <p className="text-muted-foreground">
          Upload a syllabus PDF to automatically extract subjects using AI
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upload PDF</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
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

            <div
              className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-12 text-center hover:bg-accent/50 transition-colors cursor-pointer"
              onClick={() => document.getElementById('file-upload')?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                onDrop(Array.from(e.dataTransfer.files));
              }}
            >
              <input
                id="file-upload"
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={(e) => onDrop(Array.from(e.target.files || []))}
              />
              {selectedFile ? (
                <div className="flex flex-col items-center gap-2">
                  <FileText className="h-12 w-12 text-primary" />
                  <p className="font-medium">{selectedFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Upload className="h-12 w-12 text-muted-foreground" />
                  <p className="font-medium">Click to upload or drag and drop</p>
                  <p className="text-sm text-muted-foreground">PDF files only (max 10MB)</p>
                </div>
              )}
            </div>

            {isUploading && (
              <div className="space-y-2">
                <Progress value={uploadProgress} />
                <p className="text-sm text-center text-muted-foreground">
                  Processing PDF with AI...
                </p>
              </div>
            )}

            <Button
              type="submit"
              disabled={!selectedFile || !semesterId || isUploading}
              className="w-full"
            >
              {isUploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isUploading ? 'Processing...' : 'Extract Subjects'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {extractedSubjects.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Extracted Subjects</CardTitle>
              <Button onClick={handleImportAll}>
                <Check className="mr-2 h-4 w-4" />
                Import All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Hours/Week</TableHead>
                  <TableHead>Batches</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {extractedSubjects.map((subject, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{subject.code}</TableCell>
                    <TableCell>{subject.name}</TableCell>
                    <TableCell>
                      <Badge variant={subject.type === 'theory' ? 'secondary' : 'default'}>
                        {subject.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{subject.hours_per_week}</TableCell>
                    <TableCell>{subject.num_batches}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
