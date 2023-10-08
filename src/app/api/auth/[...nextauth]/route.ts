import clientPromise from "@/utils/db";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import GoogleProvider from "next-auth/providers/google";

const authorizationUrl = new URL(
  "https://accounts.google.com/o/oauth2/v2/auth"
);
authorizationUrl.searchParams.set("prompt", "consent");
authorizationUrl.searchParams.set("access_type", "offline");
authorizationUrl.searchParams.set("response_type", "code");
export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        url: authorizationUrl.toString(),
        params: {
          scope:
            "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar",
        },
      },

      profile(profile, account) {
        console.log("account", account);
        console.log("profile", profile);
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
    async signIn({ account, user }: { account: any; user: any }) {
      // console.log("signin callback", account);
      if (account.provider === "google") {
        const { access_token, id_token } = account;
        user.accessToken = access_token;
      }

      return true;
    },
    async jwt({ token, user, account }) {
      console.log("jwt callback", { token, user, account });
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
        // console.log(session.);
        // console.log(token);
        session.user = user;

        return session;
      } else {
        return null;
      }
    },
  },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
