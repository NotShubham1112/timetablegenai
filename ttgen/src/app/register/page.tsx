'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { createClient } from '@/lib/supabase/client';
import { Loader2 } from 'lucide-react';

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  college_name: z.string().min(2, 'College name is required'),
  college_code: z.string().min(2, 'College code is required'),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterForm) {
    setIsLoading(true);
    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (authError) {
        toast({
          title: 'Error',
          description: authError.message,
          variant: 'destructive',
        });
        return;
      }

      if (authData.user) {
        // Create college record
        const { error: collegeError } = await supabase.from('colleges').insert({
          user_id: authData.user.id,
          name: data.college_name,
          code: data.college_code.toUpperCase(),
          email: data.email,
        });

        if (collegeError) {
          toast({
            title: 'Error',
            description: 'Failed to create college: ' + collegeError.message,
            variant: 'destructive',
          });
          return;
        }
      }

      toast({
        title: 'Success',
        description: 'Account created successfully! Please check your email to verify.',
      });

      router.push('/login');
    } catch {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-background text-foreground">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
              <CardDescription>
                Enter your details to register your college
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    {...register('email')}
                    required
                  />
                  {errors.email?.message && (
                    <p className="text-sm text-destructive">{errors.email.message}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    {...register('password')}
                    required
                  />
                  {errors.password?.message && (
                    <p className="text-sm text-destructive">{errors.password.message}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="college_name">College Name</Label>
                  <Input
                    id="college_name"
                    placeholder="Acme College"
                    {...register('college_name')}
                    required
                  />
                  {errors.college_name?.message && (
                    <p className="text-sm text-destructive">{errors.college_name.message}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="college_code">College Code</Label>
                  <Input
                    id="college_code"
                    placeholder="ACME"
                    {...register('college_code')}
                    required
                  />
                  {errors.college_code?.message && (
                    <p className="text-sm text-destructive">{errors.college_code.message}</p>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Account
              </Button>
            </CardFooter>
            <div className="text-center pb-6 text-sm text-muted-foreground">
               Already have an account?{' '}
               <Link href="/login" className="text-primary hover:underline underline-offset-4">
                 Sign in
               </Link>
            </div>
          </Card>
        </form>
      </div>
    </div>
  );
}
