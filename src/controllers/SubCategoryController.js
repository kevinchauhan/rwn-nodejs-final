import categoryModel from "../models/categoryModel.js"
import subCategoryModel from "../models/subCategoryModel.js"

class SubCategoryController {
    async get(req, res) {
        try {
            const subCategories = await subCategoryModel.find().populate('categoryId')
            res.render('pages/subcategory/subcategory', { subCategories })
        } catch (error) {
            res.status(500).send("Internal server error")
        }

    }

    async getByCategory(req, res) {
        try {
            const { id } = req.params
            const subCategories = await subCategoryModel.find({ categoryId: id })
            res.json({
                data: subCategories
            })
        } catch (error) {
            res.status(500).send("Internal server error")
        }

    }

    async createForm(req, res) {
        const categories = await categoryModel.find()
        res.render('pages/subcategory/subcategoryForm', { categories })
    }

    async create(req, res) {
        const { name, categoryId } = req.body

        const data = {
            name
        }
        if (categoryId) {
            data.categoryId = categoryId
        }

        try {
            const category = await subCategoryModel.create(data)
            res.redirect('/subcategory')
        } catch (error) {
            console.log(error)
            res.status(500).send("Internal server error")
        }

    }

    async remove(req, res) {
        const { id } = req.params

        try {
            const category = await subCategoryModel.findByIdAndDelete(id)
            res.redirect('/subcategory')
        } catch (error) {
            res.status(500).send("Internal server error")
        }

    }
}

export default SubCategoryController