// eslint-disable-next-line unused-imports/no-unused-imports
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: User;
  }

  interface User {
    id: number;
    email: string;
    name: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: number;
    email: string;
    name: string;
  }
}
