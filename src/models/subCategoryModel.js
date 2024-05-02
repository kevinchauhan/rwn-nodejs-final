import mongoose from "mongoose";

const SubCategorySchema = new mongoose.Schema({
    name: String,
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories'
    }
})

export default mongoose.model('subcategories', SubCategorySchema)