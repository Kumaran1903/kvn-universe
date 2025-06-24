import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { connectToDB } from "./utils";
import { User } from "./models";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.email) {
        await connectToDB();

        const existingUser = await User.findOne({ email: user.email }).lean();

        token.id = existingUser?._id ?? user.id;

        if (!existingUser) {
          await User.create({
            _id: user.id,
            name: user.name,
            email: user.email,
          });
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user.userId = token.id;
      }
      return session;
    },
  },
});


import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { connectToDB } from "./utils";
import { User } from "./models";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user?.email) {
        await connectToDB();

        const existingUser = await User.findOne({ email: user.email }).lean();

        token.id = existingUser?._id ?? user.id;

        if (!existingUser) {
          await User.create({
            _id: user.id,
            name: user.name,
            email: user.email,
          });
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        session.user.userId = token.id;
      }
      return session;
    },
  },
});
