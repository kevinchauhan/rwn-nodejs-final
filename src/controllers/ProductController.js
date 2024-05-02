import productModel from "../models/productModel.js"
import subCategoryModel from "../models/subCategoryModel.js"

class ProductController {
    async get(req, res) {
        try {
            const products = await productModel.find().populate({
                path: 'subCategoryId',
                populate: {
                    path: 'categoryId'
                }
            })
            console.log(products)
            res.render('pages/product/product', { products })
        } catch (error) {
            res.status(500).send("Internal server error")
        }

    }

    async createForm(req, res) {
        const subCategories = await subCategoryModel.find()
        res.render('pages/product/productFrom', { subCategories })
    }

    async create(req, res) {
        const { name, subCategoryId } = req.body

        try {
            const category = await productModel.create({ name, subCategoryId })
            res.redirect('/product')
        } catch (error) {
            res.status(500).send("Internal server error")
        }

    }

    async remove(req, res) {
        const { id } = req.params

        try {
            const category = await productModel.findByIdAndDelete(id)
            res.redirect('/product')
        } catch (error) {
            res.status(500).send("Internal server error")
        }

    }
}

export default ProductController