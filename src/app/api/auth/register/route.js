import userModel from "@/user.model";
import dbConnect from "@/utils/db";
import { hashData } from "@/utils/hasher";
import { NextResponse } from "next/server";
export async function POST(request) {
    // console.log("request - ", request)
    try {
        await dbConnect()
        const { firstName, lastName, email, password, designation } = await request.json()
        // console.log("First Name ", firstName)
        if (!firstName || !lastName || !email || !password || !designation) {
            return NextResponse.json({ message: "All Field firstName,lastName,email,password,designation is required. " }, { status: 400 })
        }
        const user = await userModel.findOne({ email })
        if (user) {
            return NextResponse.json({ message: "User Already exist." }, { status: 409 })
        }
        const hashPassword = await hashData(password)
        // console.log(hashPassword)
        const newUser = userModel({ firstName, lastName, email, password: hashPassword, designation })
        await newUser.save()
        return NextResponse.json({ message: "User registered successfully. " }, { status: 201 })
    } catch (error) {
        console.error("Error from Register Route ", error.message)
        return NextResponse.json({ error })
    }
}