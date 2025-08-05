import { NextResponse } from "next/server";
import { cookieGetter } from "@/utils/cookie";
import { generateToken, verifyToken } from "@/utils/jwt";
export async function authentication() {
    try {
        const accessToken = cookieGetter("accessToken")
        const refreshToken = cookieGetter("refreshToken")
        if (!accessToken && !refreshToken) {
            return NextResponse.json({ message: "Authentication failed. " })
        }
        if (!accessToken && refreshToken) {
            const isRefreshTokenValid = await verifyToken(false, refreshToken)
            if (!isRefreshTokenValid) {
                return NextResponse.json({ message: "Authentication failed Refresh Token Expired Login Again. " })
            }
            console.log("Refresh payload - ", isRefreshTokenValid)
            // const accessToken = await generateToken(true,)
            return NextResponse.json({ message: "Authentication failed. " })
        }

        return NextResponse.next()
    } catch (error) {
        console.error("Error While Login.", error)
        return NextResponse.json({ message: "Error in Authentication. " })
    }
}