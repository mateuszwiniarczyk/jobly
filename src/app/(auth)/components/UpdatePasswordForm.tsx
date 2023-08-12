'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { updatePasswordAction } from '@/app/_actions/user';
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
import { updatePasswordSchema } from '@/lib/validations/auth';

type FormValues = z.infer<typeof updatePasswordSchema>;

export const UpdatePasswordForm = ({
  resetPasswordToken,
}: {
  resetPasswordToken: string;
}) => {
  const [isPending, startTransition] = useTransition();
  const form = useForm<FormValues>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (values: FormValues) => {
    startTransition(async () => {
      try {
        const payload = {
          resetPasswordToken,
          ...values,
        };
        await updatePasswordAction(payload);
      } catch (error) {
        // @TODO: Handle error
        // eslint-disable-next-line no-console
        console.log(error);
      }
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder='Enter your password'
                  {...field}
                  type='password'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  placeholder='Confirm your password'
                  {...field}
                  type='password'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className='w-full' disabled={isPending}>
          Update password
        </Button>
      </form>
    </Form>
  );
};
