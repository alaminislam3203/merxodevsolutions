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
      const isSecretAdminArea = nextUrl.pathname.startsWith("/709832");
      const isLoginRoot = nextUrl.pathname === "/709832";

      // If accessing secret admin subpaths without being logged in, deny access
      if (isSecretAdminArea && !isLoginRoot) {
        return isLoggedIn;
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = user.role || "ADMIN";
        token.image = user.image || null;
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