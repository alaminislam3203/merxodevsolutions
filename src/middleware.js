import NextAuth from "next-auth";
import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth?.user;
  const { pathname } = req.nextUrl;

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

  // If already logged in and visiting auth pages, redirect away
  if (isLoggedIn && isAuthRoute) {
    const destination = req.auth?.user?.role === "ADMIN" ? "/709832" : "/";
    return Response.redirect(new URL(destination, req.nextUrl));
  }

  // If visiting secret admin area without being logged in
  if (pathname.startsWith("/709832")) {
    if (!isLoggedIn) {
      const loginUrl = new URL("/account/login", req.nextUrl);
      loginUrl.searchParams.set("redirect", pathname);
      return Response.redirect(loginUrl);
    }
  }
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
