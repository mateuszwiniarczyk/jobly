import { z } from 'zod';

const authSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  password: z
    .string()
    .min(8, {
      message: 'Password must contain at least 8 characters.',
    })
    .max(100),
});

export const signUpSchema = authSchema
  .extend({
    name: z.string().min(2, {
      message: 'Name must contain at least 2 characters.',
    }),
    confirmPassword: z.string().min(8, {
      message: 'Password must contain at least 8 characters.',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const signInSchema = authSchema;
