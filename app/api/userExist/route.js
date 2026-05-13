import { connectMongodb } from "@/lib/mongodb";
import User from "@/models/user";
import { NextResponse } from "next/server";


export async function POST(req){

    try {
           await connectMongodb();
            const {email}=await req.json();
         const gmail = await User.findOne({email}).select("_id");
         console.log(gmail);
           return NextResponse.json({ gmail });
    } catch (error) {
        console.log("user already exist");
        return NextResponse.json({error});
    }
   
}