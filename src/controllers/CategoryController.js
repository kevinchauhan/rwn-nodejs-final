import categoryModel from "../models/categoryModel.js"

class CategoryController {
    async get(req, res) {
        try {
            const categories = await categoryModel.find()
            res.render('pages/category/category', { categories })
        } catch (error) {
            res.status(500).send("Internal server error")
        }

    }

    createForm(req, res) {
        res.render('pages/category/categoryForm')
    }

    async create(req, res) {
        const { name } = req.body

        try {
            const category = await categoryModel.create({ name })
            res.redirect('/category')
        } catch (error) {
            res.status(500).send("Internal server error")
        }

    }

    async remove(req, res) {
        const { id } = req.params

        try {
            const category = await categoryModel.findByIdAndDelete(id)
            res.redirect('/category')
        } catch (error) {
            res.status(500).send("Internal server error")
        }

    }
}

export default CategoryController