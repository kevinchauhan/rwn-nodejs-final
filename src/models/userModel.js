import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: {
        type: String,
        default: 'user'
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    show: String
})

export default mongoose.model('users', userSchema)