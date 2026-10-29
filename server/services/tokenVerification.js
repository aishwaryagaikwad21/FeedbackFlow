import { createHash, timingSafeEqual } from "node:crypto";

export const hashVerification = (editToken, editTokenHash) => {

    const suppliedHash = createHash("sha256").update(editToken).digest()
    const storedHash = Buffer.from(editTokenHash, "hex")

    if(storedHash.length !== suppliedHash.length || !timingSafeEqual(suppliedHash, storedHash)) {
        return false
    }

    return true
}