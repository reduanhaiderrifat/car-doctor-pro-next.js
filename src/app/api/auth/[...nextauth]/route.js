import connectDB from "@/lib/connectDB";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";
const handler = NextAuth({
  secret: process.env.AUTH_SCRETE_CODE,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        if (!email || !password) {
          return null;
        }
        const db = await connectDB();
        const currentuser = await db.collection("users").findOne({ email });
        if (!currentuser) {
          return null;
        }
        const passwordMatch = bcrypt.compareSync(
          password,
          currentuser.password
        );
        if (!passwordMatch) {
          return null;
        }
        return currentuser;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google" || account.provider === "github") {
        const { email } = user;
        try {
          const db = await connectDB();
          const userCollection = db.collection("users");
          const userExsit = await userCollection.findOne({ email });
          if (!userExsit) {
            const res = await userCollection.insertOne(user);
          } else {
            return user;
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        return true;
      }
      return true;
    },
  },
  pages: { signIn: "/login" },
});
export { handler as GET, handler as POST };
