import brandModel from "../models/brandModel.js"
import categoryModel from "../models/categoryModel.js"
import productModel from "../models/productModel.js"
import subCategoryModel from "../models/subCategoryModel.js"

class ProductController {
    async get(req, res) {
        try {
            const products = await productModel
                .find()
                .populate({
                    path: 'subCategoryId',
                    populate: {
                        path: 'categoryId'
                    }
                })
                .populate('brandId')

            res.render('pages/product/product', { products })
        } catch (error) {
            res.status(500).send("Internal server error")
        }

    }

    async createForm(req, res) {
        const subCategories = await subCategoryModel.find()
        const categories = await categoryModel.find()
        const brands = await brandModel.find()
        res.render('pages/product/productFrom', { subCategories, categories, brands })
    }

    async create(req, res) {
        const { name, subCategoryId, description, price, brandId } = req.body

        try {
            let image
            if (req.file) {
                image = req.file.path
            }

            await productModel.create({ name, subCategoryId, description, price, image, brandId })
            res.redirect('/product')
        } catch (error) {
            console.log(error)
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

    async editForm(req, res) {
        try {
            const { id } = req.params
            const product = await productModel.findById(id)
            const categories = await categoryModel.find()
            const subCategories = await subCategoryModel.find()
            const brands = await brandModel.find()
            res.render('pages/product/edit', { product, categories, subCategories, brands })
        } catch (error) {
            res.status(500).send("Internal server error")
        }

    }

    async update(req, res) {
        try {
            const { id } = req.params
            const { name, subCategoryId, description, price } = req.body
            let image
            if (req.file) {
                image = req.file.path
            }
            console.log(image)
            await productModel.findByIdAndUpdate(id, { name, subCategoryId, description, price, image })

            res.redirect('/product')
        } catch (error) {
            res.status(500).send("Internal server error")
        }

    }

}

export default ProductController