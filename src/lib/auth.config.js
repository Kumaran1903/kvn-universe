import { User } from "./models";
import { connectToDB } from "./utils";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?.email) {
        await connectToDB();

        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          const newUser = await User.create({
            _id: user.id,
            name: user.name,
            email: user.email,
          });
          token.id = newUser._id;
        } else {
          token.id = existingUser._id;
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
};
