import connectDB from "@/libs/db";
import User from "@/models/user";
import { NextAuthOptions, RequestInternal, SessionOptions, SessionStrategy } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import email from "@/interfaces/email_Interface";

interface Credentials {
  email: email,
  password: string,
}

interface CustomSessionOptions extends SessionOptions{
  strategy: SessionStrategy,
  jwt: boolean,
}


export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials: Record<never, string> | undefined, req: Pick<RequestInternal, "body" | "method" | "headers" | "query">) {
        const { email, password } = credentials as Credentials;

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
  } as CustomSessionOptions,
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
