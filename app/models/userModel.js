import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,"Please provide a username"],
        maxlength: 55
    },
    email: {
        type: String,
        required: [true,"Please provide a email address"],
    },
    password: {
        type: String,
        required: [true,"Please provide a password"],
    },
    password2: {
        type: String,
        required: [true,"Please provide a password"],
    },

    isVerified: { 
        type: Boolean,
        default: false
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
    verifyToken:String,
    verifyTokenExpiry:Date
})

const User = mongoose.models.users || mongoose.model("users",userSchema)

export default User;