import { connectStr } from "@/app/lib/mongo";
import User from "@/app/models/userModel";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { jwt } from "jsonwebtoken";

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;

    // console.log(reqBody)
    await mongoose.connect(connectStr);

    // find user on the database based on email
    const user = await User.findOne({ email });

    console.log(user?.email);
    // return false
    if (!user?.email) {
      console.log("Create a new account");
      return NextResponse.json({
        message: "User not found. Create a new account.",
        status: 404,
      });
    }

    // comparing password

    const validUser = await bcrypt.compare(password, user.password);
    console.log("valid", validUser);
    console.log("pass", password, user.password);

    console.log("valid user");

    // return false

    if (!validUser) {
      return NextResponse.json({
        message: "Invalid email or password",
        success: false,
        status: 401,
      });
    }

     if (validUser) {
       return NextResponse.json({
         message: "Login successful",
         success: true,
         status:200
       });
     }

    // create token data
    // const tokenData = {
    //   id: user._id,
    //   username: user.username,
    //   email: user.email,
    // };ii

    // create a token
    const token = await jwt.sign(
      { username, email },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1d",
      }
    );

    console.log(process.env.JWT_SECRET_KEY, "key");

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    // Redirect the user to a specific page after successful login
    // router.push("/dashboard");

    return response;
  } catch (err) {
    return NextResponse.json({
      error: "Internal server error",
      status: 500,
    });
  }
}
