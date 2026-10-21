import mongoose from 'mongoose'
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'

const { Schema } = mongoose

const adminSchema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxlength: 30,
    },

    email:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },

    password:{
        type: String,
        required: true,
        trim: true,
    },

    role: {
      type: String,
      enum: ["admin", "superadmin"],
      default: "admin",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    lastLogin: {
      type: Date,
      default: null,
    },

    tokens: [{
        token:{
            type: String,
            required: true
        }
    }]
})

adminSchema.methods.generateAuthToken = async function(){
    const user = this

    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({token})

    await user.save()

    return token
}

adminSchema.pre('save', async function(next){
    const user = this

    if(user.isModified('password')){
        user.password = await argon2.hash(user.password);
    }
})

adminSchema.statics.findByCredentials = async function(email, password){
    const findAdmin = await Admin.findOne({email})
    if(!email){
        throw new Error('Not Found')
    }

    const isMatch = await argon2.verify(findAdmin.password, password)
    
    if(!isMatch){
        throw new Error('Not Found')
    }

    return findAdmin
}

export const Admin = mongoose.model('Admin', adminSchema)
