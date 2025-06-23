import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export default async function middleware(req) {
  const token = await getToken({ req, secret });
  const url = req.nextUrl.clone();

  const isOnLoginPage = url.pathname.startsWith("/login");
  const isOnCheckoutPage = url.pathname.startsWith("/checkout");

  if (!token && isOnCheckoutPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && isOnLoginPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
