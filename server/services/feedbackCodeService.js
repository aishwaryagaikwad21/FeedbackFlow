import FeedbackCode from "../models/feedbackCode.js";
import {randomBytes} from "node:crypto"

export const generateShortFeedbackCode = async() => {

    while(true){
        let code = `FF-${randomBytes(4).toString("hex").toUpperCase()}`

        const existingCode = await FeedbackCode.exists({
            feedbackCode: code
        })

        if(!existingCode){
            return code
        }
    }
}