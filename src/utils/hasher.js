import bcrypt from "bcryptjs"

async function hashData(text) {
    try {
        const salt = parseInt(process.env.SALT)
        const hashed = await bcrypt.hash(text, salt)
        return hashed

    } catch (error) {
        console.error("Error from Hashing data ", error)
    }
}

async function compareData(text,hashedText) {
    try {
        const hashed = await bcrypt.compare(text, hashedText)
        if (hashed) {
            return hashed
        }

    } catch (error) {
        console.error("Error from Hashing data ", error)
    }
}
export { hashData, compareData }
