export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (token) session.user.userId = token.id;
      return session;
    },
    authorized({ auth, request }) {
      const user = auth?.user;
      const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login");
      const isOnCheckoutPage =
        request.nextUrl?.pathname.startsWith("/checkout");

      if (!user && isOnCheckoutPage) return false;
      if (user && isOnLoginPage) {
        return Response.redirect(new URL("/", request.nextUrl));
      }

      return true;
    },
  },
};
