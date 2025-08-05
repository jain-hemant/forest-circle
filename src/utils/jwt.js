import jwt from "jsonwebtoken"

async function generateToken(isAccess = true, payload) {
    try {
        let secretKey = ""
        let jwtOption = {}
        if (isAccess) {
            secretKey = process.env.JWT_ACCESS_SECRET
            jwtOption.expiresIn = process.env.JWT_ACCESS_EXPIRY
        }
        else {
            secretKey = process.env.JWT_REFRESH_SECRET
            jwtOption.expiresIn = process.env.JWT_REFRESH_EXPIRY
        }
        const token = jwt.sign(payload, secretKey, jwtOption)
        if (token) {
            return token
        }
        // console.log("Options ", jwtOption)
    } catch (error) {
        console.error("Error while Generating Token. ", error)
    }
}

async function verifyToken(isAccess = true, token) {
    try {
        let secretKey = ""
        if (isAccess) {
            secretKey = process.env.JWT_ACCESS_SECRET
        }
        else {
            secretKey = process.env.JWT_REFRESH_SECRET
        }
        const verified = jwt.verify(token, secretKey)
        if (verified) {
            return verified
        }
    } catch (error) {
        console.error("Error while Verifying Token. ", error)
    }
}

export { generateToken, verifyToken }