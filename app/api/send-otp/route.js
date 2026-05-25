import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { connectMongodb } from "@/lib/mongodb";
import Otp from "@/models/otp";

export async function POST(req) {
  try {
    await connectMongodb();
    const { email } = await req.json();

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Save OTP
    await Otp.findOneAndUpdate(
      { email },
      {
        otp,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      },
      { upsert: true }
    );

    // Mail transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      html: `<h2>Your OTP is ${otp}</h2>`,
    });

    return NextResponse.json({
      success: true,
      message: "OTP sent",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}