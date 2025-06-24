import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default async function middleware(request) {
  const token = request.cookies.get("__Secure-authjs.session-token") || "";
  const isOnLoginPage = request.nextUrl.pathname.startsWith("/login");
  const isOnCheckoutPage = request.nextUrl.pathname.startsWith("/checkout");

  if (!token && isOnCheckoutPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && isOnLoginPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  NextResponse.next();
}
