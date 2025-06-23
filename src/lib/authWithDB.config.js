import { connectToDB } from "./utils";
import { User } from "./models";
import { authConfig } from "./auth.config";

export const fullAuthConfig = {
  ...authConfig,
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user }) {
      if (user) {
        try {
          await connectToDB();

          const existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            const newUser = await User.create({
              name: user.name,
              email: user.email,
            });
            token.id = newUser._id.toString();
          } else {
            token.id = existingUser._id.toString();
          }
        } catch (error) {
          console.error("Database error in JWT callback:", error);
          token.id = user.id;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) session.user.userId = token.id;
      return session;
    },
  },
};
