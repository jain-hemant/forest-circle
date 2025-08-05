import { cookies } from "next/headers";

export async function cookieChecker(data) {
    try {
        const cookieStore = await cookies(data)
        if (cookieStore.has(data)) {
            return true
        }
        return false
    } catch (error) {
        console.log("Error While Checking Cookies. ", error)
    }
}

export async function cookieSetter(name, value) {
    try {
        let cookieMaxAge = ""
        if (name === "accessToken") {
            cookieMaxAge = process.env.ACCESS_COOKIE_MAX_AGE
        }
        else if (name === "refreshToken") {
            cookieMaxAge = process.env.REFRESH_COOKIE_MAX_AGE
        }
        else {
            cookieMaxAge = 3600 * 24 * 7
        }
        const cookieStore = await cookies()

        cookieStore.set({
            name,
            value,
            sameSite: true,
            httpOnly: true,
            maxAge: parseInt(cookieMaxAge),
            path: "/"
        })
        return cookieStore
    } catch (error) {
        console.log("Error While Set Cookies. ", error)
    }
}

export async function cookieGetter(cookiesList) {
    try {
        const cookieStore = await cookies()
        // const cookieExist = cookiesList.filter((cookie) => {
        //     return cookieStore.get(cookie)?.value
        // })
        return cookieStore.get(cookiesList)?.value

    } catch (error) {
        console.log("Error While Getting Cookies. ", error)
    }
}

export async function cookieDeleter() {
    try {
        (await cookies()).delete(data)
    } catch (error) {
        console.log("Error While Deleting Cookies. ", error)
    }
}