import { auth } from "./lib/auth";
import { NextResponse } from "next/server";

export default async function middleware(req) {
  const session = await auth(req);
  const url = req.nextUrl.clone();

  const isOnLoginPage = url.pathname.startsWith("/login");
  const isOnCheckoutPage = url.pathname.startsWith("/checkout");

  if (!session?.user && isOnCheckoutPage) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (session?.user && isOnLoginPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
