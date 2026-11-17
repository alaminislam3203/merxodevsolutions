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
    authorized() {
      // Delegate path authorization & redirects to middleware.js for cookie-aware reliability
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