import connectDB from "@/libs/db";
import User from "@/models/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          await connectDB();
          const user = await User.findOne({ email });
          console.log("user and mail", user, email);
          if (!user) return null;
        
          const passwordsMatch = (password == user.password);
          // const passwordsMatch = await bcrypt.compare(password, user.password);
          console.log(password == user.password);
          console.log("passwords matching in progress");
          if (!passwordsMatch) return null;
            
          return user;
        } catch (error) {
          console.log(error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    jwt: true,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
