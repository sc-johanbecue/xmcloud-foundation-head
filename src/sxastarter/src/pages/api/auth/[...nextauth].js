import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import {
  Login as OCLogin,
  SetConfiguration,
} from '../../../services/Ordercloud/AuthenticationService';
import { Login as CHubLogin } from '../../../services/ContentHub/AuthenticationService';
import { Tokens } from 'ordercloud-javascript-sdk';
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'Enter email',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Enter Password',
        },
      },

      async authorize(credentials, req) {
        const { email, password } = credentials;
        const res = await fetch(process.env.NEXT_PUBLIC_CREDENTIALS_PROVIDER_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });
        const user = await res.json();
        if (res.ok && user) {
          SetConfiguration();
          await OCLogin(user?.OCEmail, user?.OCPassword, true, true);
          var chubToken = await CHubLogin(user.CHubEmail, user.CHubPassword, true);
          var ocToken = Tokens.GetAccessToken();
          var ocRefreshToken = Tokens.GetRefreshToken();
          user.OCToken = ocToken;
          user.OCRefreshToken = ocRefreshToken;
          user.CHubToken = chubToken;
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            OCToken: user.OCToken,
            OCRefreshToken: user.OCRefreshToken,
            CHubToken: user.CHubToken,
            Role: user.Role,
          };
        } else return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.^
      session.user = token;
      return session;
    },
  },
  //   pages: {
  //     signIn: '/auth/signin',
  //   },
};
export default NextAuth(authOptions);
