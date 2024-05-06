import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
    name: String
})

export default mongoose.model('brands', brandSchema)