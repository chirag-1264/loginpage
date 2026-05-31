import { connectMongodb } from "@/lib/mongodb";
import User from "@/models/user";
import NextAuth from "next-auth";
import CredentialsProviders from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { signIn } from "next-auth/react";
import { Finlandica } from "next/font/google";
import bcrypt from "bcryptjs";

export const authOptions={
 providers:[
       GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProviders({
        name:"credentials",
        credentials:{},

        async authorize(credentials){
          const{email,password} = credentials;
          try {
             await connectMongodb();
            const user=await User.findOne({email});
            if(!user){
               return null;
            }
     if (user.provider === "google") {
  return {
    error: "GOOGLE_ACCOUNT"
  };
}
            const verified=await bcrypt.compare(password,user.password);

            if(!verified){
               return null;
            }
           return user;
          } catch (error) {
             console.log("error:",error);
             return null;
          }
        }
    })
 ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        await connectMongodb();

        const existingUser = await User.findOne({
          email: user.email,
        });

        if (!existingUser) {
          await User.create({
            name: user.name,
            email: user.email,
            provider: "google",
          });
        }
      }

      return true;
    },
  },
 session:{
    strategy:"jwt",
 },
 secret:process.env.NEXTAUTH_SECRET,
 pages:{
    signIn:"/",
 },
}


const handler=NextAuth(authOptions);

export{handler as GET,handler as POST};