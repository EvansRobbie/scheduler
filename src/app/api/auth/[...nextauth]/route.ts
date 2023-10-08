import clientPromise from "@/utils/db";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import GoogleProvider from "next-auth/providers/google";

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      profile(profile) {
        return {
          id: profile.sub,
          name: `${profile.given_name} ${profile.family_name}`,
          email: profile.email,
          image: profile.picture,
          role: profile.role ? profile.role : "mentee",
          emailVerified: profile.email_verified ? true : false,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async signIn(data) {
      console.log("signin callback", data);
      return true;
    },
    async jwt({ token, user }) {
      console.log("jwt callback", { token, user });
      if (user) return { ...token, ...user };
      return token;
    },
    async session({
      session,
      token,
      user,
    }: {
      session: any;
      token: any;
      user: any;
    }) {
      console.log("session callback", { session, token, user });
      if (session) {
        // console.log(session);
        // console.log(token);
        // session.user.role = token.role;

        return session;
      } else {
        return null;
      }
    },
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
