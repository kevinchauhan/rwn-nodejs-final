import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: String,
    subCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'subcategories'
    },
    brandId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'brands'
    },
    price: Number,
    description: String,
    image: String
})

export default mongoose.model('products', productSchema)