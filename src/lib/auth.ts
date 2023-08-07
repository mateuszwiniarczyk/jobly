import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize() {
        const user = { id: '1', name: 'Admin', email: 'admin@admin.com' };
        return user;
      },
    }),
  ],
  pages: {
    signIn: '/signin',
    signOut: '/signout',
  },
};
