'use server';

import * as bcrypt from 'bcrypt';
import { z } from 'zod';

import { prisma } from '@/lib/db';
import { signUpSchema } from '@/lib/validations/auth';

export const signUpAction = async (user: z.infer<typeof signUpSchema>) => {
  signUpSchema.parse(user);
  const passwordHash = await bcrypt.hash(user.password, 12);
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
