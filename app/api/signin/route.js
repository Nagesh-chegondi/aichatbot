import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";
import bcrypt from "bcrypt"
export async function POST(request){
    try{
        console.log("before db")
        await connectDB()
        console.log("after db")
        const {email,password} =  await request.json()
        console.log("after getting data")
        const find = await User.findOne({
            email:email
        })
        console.log("afterfindingemail")
        if(!find){
             console.log("user not found")
            return NextResponse.json({message:"user not found"},{status:404});
           
        }
        else{
            console.log("user found")
            const verify  = await bcrypt.compare(password, find.password)
            console.log("comparing db password with input")
            if(!verify){
                console.log("incoorect password")
                return NextResponse.json({message:"incorrect password"},
                    {status:404}

                )
            }
            else{
                console.log("password matched")
                const jwttoken = jwt.sign({
                    email:find.email
                },process.env.JWT_SECRET,
            {expiresIn:'24h'});
        console.log("converted to token")
        const cookieStore = await cookies();


             cookieStore.set({
                name: 'session_token',
    value: jwttoken,
    httpOnly: true, // Prevents JS access
    secure: process.env.NODE_ENV === 'production', // Use HTTPS
    maxAge: 60 * 60 * 24 * 7, // 7 days (matching JWT expiry)
    path: '/',
    sameSite: 'lax'
            })
            console.log("finally cookies have set")
            return NextResponse.json({message:"login succesfull"},{status:200})
            }
        }
    }
    catch(error){
        console.log("sorry found error")
        return NextResponse.json({erroe:error.message},
            {status:500}
        )

    }
}
