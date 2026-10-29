import jwt from 'jsonwebtoken'
import { Admin } from '../models/adminModel.js'
import 'dotenv/config'

export const auth = async (req, res, next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const admin = await Admin.findOne({_id: decoded._id, 'tokens.token': token})

        if(!admin){
            throw new Error()
        }

        req.admin = admin
        req.token = token
        next()
    }
    catch(err){
        res.status(401).send({error: 'Please Authenticate'})
    }
}