import { connectToDB } from "./utils";
import { User } from "./models";
import { authConfig } from "./auth.config";

export const fullAuthConfig = {
  ...authConfig,
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user }) {
      if (user) {
        await connectToDB();

        const existingUser = await User.findOne({ email: user.email });
        if (!existingUser) {
          await User.create({
            _id: user.id,
            name: user.name,
            email: user.email,
          });
        }

        token.id = user.id;
      }
      return token;
    },
  },
};
