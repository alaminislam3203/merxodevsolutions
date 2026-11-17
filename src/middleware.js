import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { pathname } = req.nextUrl;

  // Resilient session cookie check (supports both NextAuth v4 and v5, dev and prod)
  const sessionToken =
    req.cookies.get("authjs.session-token")?.value ||
    req.cookies.get("__Secure-authjs.session-token")?.value ||
    req.cookies.get("next-auth.session-token")?.value ||
    req.cookies.get("__Secure-next-auth.session-token")?.value;

  const isLoggedIn = !!req.auth?.user || !!sessionToken;
  const userRole = String(req.auth?.user?.role || "").toUpperCase();
  const userEmail = String(req.auth?.user?.email || "").toLowerCase().trim();
  const isAdmin = userRole === "ADMIN" || userEmail === "merxodevsolutions@gmail.com";

  const authRoutes = [
    "/account/login",
    "/account/register",
    "/account/forgot-password",
    "/account/verify-code",
    "/account/reset-password",
  ];

  const isAuthRoute = authRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  // If already logged in and visiting an auth page, redirect appropriately
  if (isLoggedIn && isAuthRoute) {
    const redirectParam = req.nextUrl.searchParams.get("redirect");
    let destination = "/";
    if (isAdmin) {
      destination = redirectParam && redirectParam.startsWith("/709832") ? redirectParam : "/709832";
    } else {
      destination = redirectParam && !redirectParam.startsWith("/account") && !redirectParam.startsWith("/709832")
        ? redirectParam
        : "/";
    }
    return NextResponse.redirect(new URL(destination, req.nextUrl));
  }

  // If visiting secret admin area without being logged in
  if (pathname.startsWith("/709832")) {
    if (!isLoggedIn) {
      const loginUrl = new URL("/account/login", req.nextUrl);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/709832",
    "/709832/:path*",
    "/account/login",
    "/account/register",
    "/account/forgot-password",
    "/account/verify-code",
    "/account/reset-password",
  ],
};
