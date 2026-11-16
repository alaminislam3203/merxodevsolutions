// Edge-compatible auth config (no Prisma, no Node.js-only modules)
// Used by middleware which runs in Edge Runtime

const authConfig = {
  pages: {
    signIn: "/account/login",
    error: "/account/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isSecretAdminArea = nextUrl.pathname.startsWith("/709832");
      const isAuthRoute = [
        "/account/login",
        "/account/register",
        "/account/forgot-password",
        "/account/verify-code",
        "/account/reset-password",
      ].some(
        (route) =>
          nextUrl.pathname === route || nextUrl.pathname.startsWith(route + "/")
      );

      // If already logged in and accessing auth routes, redirect away
      if (isLoggedIn && isAuthRoute) {
        const dest = auth?.user?.role === "ADMIN" ? "/709832" : "/";
        return Response.redirect(new URL(dest, nextUrl));
      }

      // If accessing admin area without being logged in, redirect to /account/login
      if (isSecretAdminArea) {
        return isLoggedIn;
      }
      return true;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role || "ADMIN";
        token.image = user.image || null;
      }
      if (trigger === "update" && session) {
        if (session.name) token.name = session.name;
        if (session.image !== undefined) token.image = session.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session?.user) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.role = token.role || "ADMIN";
        session.user.image = token.image || null;
      }
      return session;
    },
  },
};

export default authConfig;