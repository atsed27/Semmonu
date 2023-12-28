import Users from '@/model/User';
import db from '@/utils/db';
import NextAuth from 'next-auth/next';
import { compareSync } from 'bcryptjs';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?._id) token._id = user._id;
      if (user?.isAdmin) token.isAdmin = user.isAdmin;
      return token;
    },
    async session({ session, token }) {
      if (token?._id) session.user._id = token._id;
      if (token?.isAdmin) session.user.isAdmin = token.isAdmin;
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        await db.connect();
        const user = await Users.findOne({
          email: credentials.email,
        });
        await db.disconnect();
        if (!user) {
          throw new Error('Email is not Found');
        }
        const comparePass = compareSync(credentials.password, user.password);
        if (!comparePass) {
          throw new Error('password is correct');
        }
        return user;
      },
    }),
  ],
});
