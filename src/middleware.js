import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default async function middleware(request) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  const isOnAdminPage = request.nextUrl.pathname.startsWith("/admin");
  const isOnLoginPage = request.nextUrl.pathname.startsWith("/login");
  const isOnCheckoutPage = request.nextUrl.pathname.startsWith("/checkout");

  if ((!token || !token.isAdmin) && isOnAdminPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token && isOnCheckoutPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && isOnLoginPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
