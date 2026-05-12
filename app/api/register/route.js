import { connectMongodb } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";



export  async function POST(req){
    try {
         const {name,email,password}= await req.json();
         const hashpassword=await bcrypt.hash(password,10);
         await connectMongodb();
         await User.create({name,email,password:hashpassword});

         return NextResponse.json({message:"user registered"},{status:201})
    } catch (error) {
         console.log("REGISTER ERROR:", error);
        return NextResponse.json({message:"an eror occur while registering a user"},{status:500})
    }

}
