import { connectStr } from "@/app/lib/mongo";
import User from "@/app/models/userModel";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function POST(req) {
  try {
    
    const reqBody = await req.json();
    const { username, email, password, password2 } = reqBody;
    
    await mongoose.connect(connectStr);

    if (password !== password2) {
      return NextResponse.json(
        { error: "Passwords do not match" },
        { status: 400 }
      );
    }

    // check if user has already exits
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(String(password), salt);

    const newUser = new User({
      username,
      email,
      password: hashPassword,
      password2: hashPassword,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      user: savedUser,
    });
  } catch (err) {
    console.error("Error during user creation:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
