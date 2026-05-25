import { connectMongodb } from "@/lib/mongodb";
import User from "@/models/user";
import Otp from "@/models/otp";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";



export  async function POST(req){
    try {
         const {name,email,password,otp}= await req.json();
      
         await connectMongodb();

       //verify 
      const otpRecord = await Otp.findOne({ email });

      if (!otpRecord || otpRecord.otp !== otp) {
      return NextResponse.json({
        success: false,
        message: "OTP not verified",
      },{status:400});
    }

    if (otpRecord.expiresAt < new Date()) {
      return NextResponse.json({
        success: false,
        message: "OTP expired",
      },{status:400});
    }

       const hashpassword=await bcrypt.hash(password,10);
         await User.create({name,email,password:hashpassword});

          //Delete OTP after successful signup
          await Otp.deleteOne({ email });

         return NextResponse.json({message:"user registered"},{status:201})
    } catch (error) {
         console.log("REGISTER ERROR:", error);
        return NextResponse.json({message:"an eror occur while registering a user"},{status:500})
    }

}
