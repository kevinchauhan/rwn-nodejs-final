import mongoose from "mongoose";

const URL = 'mongodb+srv://kevinchauhan:xZyt5ZGM5fo3PMSv@cluster0.ngoyxsf.mongodb.net/finalpr'

const dbConnection = async () => {
    await mongoose.connect(URL)
    console.log('db connected...')
}

export default dbConnection