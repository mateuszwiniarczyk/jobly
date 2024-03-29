'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { resetPasswordAction } from '@/app/_actions/user';
import { Button } from '@/components/ui/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { catchError } from '@/lib/utils';
import { resetPasswordSchema } from '@/lib/validations/auth';

type FormValues = z.infer<typeof resetPasswordSchema>;

const defaultValues: FormValues = {
  email: '',
};

export const ResetPasswordForm = () => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<FormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues,
  });

  const onSubmit = (values: FormValues) => {
    startTransition(async () => {
      try {
        await resetPasswordAction(values);

        form.reset(defaultValues);
        toast.success('Password reset link sent to your email address');
      } catch (error) {
        catchError(error);
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder='Enter your email address'
                  {...field}
                  type='email'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className='w-full' disabled={isPending}>
          Reset password
        </Button>
      </form>
    </Form>
  );
};
