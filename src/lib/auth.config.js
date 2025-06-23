import { User } from "./models";
import { connectToDB } from "./utils";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        await connectToDB();

        // Check if user already exists
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
    async session({ session, token }) {
      if (token) {
        session.user.userId = token.id;
      }
      return session;
    },
    authorized({ auth, request }) {
      const user = auth?.user;
      const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login");
      const isOnCheckoutPage =
        request.nextUrl?.pathname.startsWith("/checkout");
      if (!user && isOnCheckoutPage) {
        return false;
      }
      if (user && isOnLoginPage) {
        return Response.redirect(new URL("/", request.nextUrl));
      }

      return true;
    },
  },
};
