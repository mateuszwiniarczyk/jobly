'use server';

import { z } from 'zod';

import { prisma } from '@/lib/db';
import { offerSchema } from '@/lib/validations/offer';

type Offer = z.infer<typeof offerSchema>;

export const createOfferAction = async (offer: Offer, id: number) => {
  const companyExists = await prisma.company.findUnique({
    where: {
      userId: id,
    },
  });

  if (!companyExists) throw new Error('Company does not exist');

  await prisma.jobOffer.create({
    data: {
      ...offer,
      company: {
        connect: {
          id: companyExists.id,
        },
      },
    },
  });
};
