import * as bcrypt from 'bcrypt';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { prisma } from '@/lib/db';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user?.passwordHash) return null;

        const arePasswordsEqual = await bcrypt.compare(
          credentials.password,
          user.passwordHash,
        );

        if (!arePasswordsEqual) return null;

        if (user.type === 'COMPANY') {
          const company = await prisma.company.findUnique({
            where: {
              userId: user.id,
            },
          });

          return {
            id: String(user.id),
            email: user.email,
            name: company?.name,
          };
        } else {
          const employee = await prisma.employee.findUnique({
            where: {
              userId: user.id,
            },
          });

          return {
            id: String(user.id),
            email: user.email,
            name: employee?.name,
          };
        }
      },
    }),
  ],
  pages: {
    signIn: '/signin',
    signOut: '/signout',
  },
};
