import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      credentials: {
        username: { type: "text" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        // Check the credentials
        if (
          credentials?.username === process.env.AUTH_USER &&
          credentials?.password === process.env.AUTH_PASSWORD
        ) {
          // Successful authentication
          return { id: "1" };
        } else {
          // Invalid credentials
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async redirect({ baseUrl }) {
      // Redirect to the dashboard after signing in
      return baseUrl + "/dashboard";
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
};
export default NextAuth(authOptions);
