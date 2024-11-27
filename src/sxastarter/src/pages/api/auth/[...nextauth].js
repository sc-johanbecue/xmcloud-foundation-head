import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import {
  Login as OCLogin,
  SetConfiguration,
} from '../../../services/Ordercloud/AuthenticationService';
import { Login as CHubLogin } from '../../../services/ContentHub/AuthenticationService';
import GoogleProvider from 'next-auth/providers/google';
import { Tokens } from 'ordercloud-javascript-sdk';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import client from '../../../lib/db/Mongo';
import { DbUser } from 'src/types/DbUser';

export const authOptions = {
  // Configure one or more authentication providers
  adapter: MongoDBAdapter(client),
  session: {
    strategy : "jwt"
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
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
        const db = client.db('test');
        const userCollection = db.collection('users');
        const users = await userCollection.find({}).toArray();
        console.log(users);
        let user = users
          .filter((element) => element.email == email && element.password == password)
          ?.at(0);
        console.log(user);

        if(user == null){
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
          user = await res.json();
        }

        if (user) {
          SetConfiguration();
          await OCLogin(user?.OCEmail, user?.OCPassword, true, true);
          var ocToken = Tokens.GetAccessToken();
          var ocRefreshToken = Tokens.GetRefreshToken();
          user.OCToken = ocToken;
          user.OCRefreshToken = ocRefreshToken;

          if (user.CHubEmail && user.CHubPassword) {
            var chubToken = await CHubLogin(user.CHubEmail, user.CHubPassword, true);
            user.CHubToken = chubToken;
          }

          console.log('USER: ' + JSON.stringify(user, null, 2));
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            OCToken: user.OCToken,
            OCRefreshToken: user.OCRefreshToken,
            CHubToken: user?.CHubToken ?? '',
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
