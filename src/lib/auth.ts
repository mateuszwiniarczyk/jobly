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
          throw new Error('Invalid credentials');
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user?.passwordHash) throw new Error('Something went wrong');

        const arePasswordsEqual = await bcrypt.compare(
          credentials.password,
          user.passwordHash,
        );

        if (!arePasswordsEqual) throw new Error('Invalid credentials');

        if (user.type === 'COMPANY') {
          const company = await prisma.company.findUnique({
            where: {
              userId: user.id,
            },
          });

          if (!company) return null;

          return {
            id: user.id,
            email: user.email,
            name: company.name,
          };
        } else {
          const employee = await prisma.employee.findUnique({
            where: {
              userId: user.id,
            },
          });

          if (!employee) return null;

          return {
            id: user.id,
            email: user.email,
            name: employee.name,
          };
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }

      return session;
    },
    async jwt({ token, user }) {
      if (user && typeof user.id === 'number') {
        token.id = user.id;
      }

      return token;
    },
  },

  pages: {
    signIn: '/signin',
    signOut: '/signout',
  },
};
