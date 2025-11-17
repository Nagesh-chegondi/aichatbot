import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server"; // must be at the top
import User from "@/lib/models/User";
import bcrypt from "bcrypt";

export async function POST(request){
  try {
    const body = await request.json();
    console.log("Request body:", body);

    await connectDB();
    console.log("DB connected");

    const res = await User.findOne({ email: body.email});
    console.log("User find result:", res);

    if(res){
      return NextResponse.json({message : "hi meassafe came"})
    } else {
      const hashed_password = await bcrypt.hash(body.password,10)
      const created = await User.create({ name: body.name, email: body.email, password: hashed_password });
      console.log("User created:", created);
      return NextResponse.json({message:"user not found"})
    }
  } catch(error){
    console.error("API Error:", error);  // <-- shows exact reason in terminal
    return NextResponse.json({error:error.message}, {status:500})
  }
}
