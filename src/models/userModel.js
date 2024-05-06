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
    }
})

export default mongoose.model('users', userSchema)