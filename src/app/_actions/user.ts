'use server';

import * as bcrypt from 'bcrypt';
import crypto from 'crypto';
import { z } from 'zod';

import ResetPasswordEmail from '@/components/email/ResetPasswordEmail';
import { prisma } from '@/lib/db';
import { resend } from '@/lib/resend';
import {
  resetPasswordSchema,
  signUpSchema,
  updatePasswordSchema,
} from '@/lib/validations/auth';

export const signUpAction = async (user: z.infer<typeof signUpSchema>) => {
  const passwordHash = await bcrypt.hash(user.password, 12);

  const userExists = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  });

  if (userExists) throw new Error('User already exists');

  const createdUser = await prisma.user.create({
    data: {
      email: user.email,
      passwordHash,
      type: user.type,
    },
  });

  if (user.type === 'COMPANY') {
    await prisma.company.create({
      data: {
        name: user.name,
        user: {
          connect: {
            id: createdUser.id,
          },
        },
      },
    });
  } else {
    await prisma.employee.create({
      data: {
        name: user.name,
        user: {
          connect: {
            id: createdUser.id,
          },
        },
      },
    });
  }
};

export const resetPasswordAction = async (
  user: z.infer<typeof resetPasswordSchema>,
) => {
  const userExists = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  });

  if (!userExists) return;

  const resetPasswordToken = crypto.randomBytes(22).toString('hex');

  await prisma.user.update({
    where: {
      email: user.email,
    },
    data: {
      resetPasswordToken,
    },
  });

  //@TODO: Send email to everyone not only to resend acc creator - need to add own domain not vercel
  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: user.email,
    subject: 'Reset your password',
    react: ResetPasswordEmail({ email: user.email, resetPasswordToken }),
  });
};

type UpdatePasswordPayload = {
  resetPasswordToken: string;
} & z.infer<typeof updatePasswordSchema>;

export const updatePasswordAction = async (payload: UpdatePasswordPayload) => {
  const { resetPasswordToken, ...user } = payload;

  const userExists = await prisma.user.findUnique({
    where: {
      resetPasswordToken,
    },
  });

  if (!userExists) throw new Error('Invalid token');

  const passwordHash = await bcrypt.hash(user.password, 12);

  await prisma.user.update({
    where: {
      resetPasswordToken,
    },
    data: {
      passwordHash,
      resetPasswordToken: null,
    },
  });
};
