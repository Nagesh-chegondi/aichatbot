import { connectDB } from "@/lib/db";
import User from "@/lib/models/User";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { cookies } from "next/headers";
import bcrypt from "bcrypt"
export async function POST(request){
    try{
        await connectDB()
        const {email,password} =  await request.json()
        const find = await User.findOne({
            email:email
        })
        if(!find){
            return NextResponse.json({message:"user not found"},{status:404})
        }
        else{
            const verify  = await bcrypt.compare(password, find.password)
            if(!verify){
                return NextResponse.json({message:"incorrect password"},
                    {status:404}
                )
            }
            else{
                const jwttoken = jwt.sign({
                    email:find.email
                },process.env.JWT_SECRET,
            {expiresIn:'24h'})
            ;(await cookies()).set({
                name: 'session_token',
    value: jwttoken,
    httpOnly: true, // Prevents JS access
    secure: process.env.NODE_ENV === 'production', // Use HTTPS
    maxAge: 60 * 60 * 24 * 7, // 7 days (matching JWT expiry)
    path: '/',
    sameSite: 'strict'
            })
            return NextResponse.json({message:"login succesfull"},{status:200})
            }
        }
    }
    catch(error){
        return NextResponse.json({erroe:error.message},
            {status:500}
        )

    }
}