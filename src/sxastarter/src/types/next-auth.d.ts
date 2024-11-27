import NextAuth from 'next-auth';
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      OCEmail: string;
      OCToken: string;
      OCRefreshToken: string
      CHubEmail: string;
      CHubToken: string;
      Role: string;
    } & DefaultSession['user'];
  }
}
