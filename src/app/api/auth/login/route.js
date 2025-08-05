import { cookieSetter } from "@/utils/cookie"
import dbConnect from "@/utils/db"

const { default: userModel } = require("@/user.model")
const { compareData } = require("@/utils/hasher")
const { generateToken } = require("@/utils/jwt")
const { NextResponse } = require("next/server")

export async function POST(request) {
    try {
        await dbConnect()
        const { email, password } = await request.json()
        if (!email || !password) {
            return NextResponse.json({ message: "Email and Password is required " }, { status: 400 })
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            return NextResponse.json({ message: "User is not registered. " }, { status: 404 })
        }
        const checkPassword = await compareData(password, user.password)
        if (!checkPassword) {
            return NextResponse.json({ message: "Invalid Password. " }, { status: 403 })
        }
        const payload = {
            userId: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role
        }
        const accessToken = await generateToken(true, payload)
        const refreshToken = await generateToken(false, payload)

        await cookieSetter("accessToken", accessToken)
        await cookieSetter("refreshToken", refreshToken)

        return NextResponse.json({ message: "User Loging successful. ", userId: user.id, accessToken }, { status: 200 })

    } catch (error) {
        console.error("Error While Login.", error)
        return NextResponse.json({ message: "Error While Login. ", error }, { status: 403 })
    }
}