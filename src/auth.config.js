// Edge-compatible auth config (no Prisma, no Node.js-only modules)
// Used by middleware which runs in Edge Runtime

const authConfig = {
  pages: {
    signIn: "/709832",
    error: "/709832",
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
      const isAdmin = auth?.user?.role === "ADMIN";
      const isSecretAdminArea = nextUrl.pathname.startsWith("/709832");
      const isLoginRoot = nextUrl.pathname === "/709832";

      // If accessing secret admin subpaths without being logged in as ADMIN, deny access
      if (isSecretAdminArea && !isLoginRoot) {
        return isLoggedIn && isAdmin;
      }
      return true;
    },
  },
};

export default authConfig;