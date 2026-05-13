import { connectMongodb } from "@/lib/mongodb";
import User from "@/models/user";
import NextAuth from "next-auth";
import CredentialsProviders from "next-auth/providers/credentials";
import { signIn } from "next-auth/react";
import { Finlandica } from "next/font/google";
import bcrypt from "bcryptjs";

export const authOptions={
 providers:[
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
            const verified=await bcrypt.compare(password,user.password);

            if(!verified){
               return null;
            }
           return user;
          } catch (error) {
             console.log("error:",error);
             return nulll;
          }
        }
    })
 ],
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