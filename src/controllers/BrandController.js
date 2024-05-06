import brandModel from "../models/brandModel.js"

class BrandController {
    async get(req, res) {
        try {
            const brands = await brandModel.find()
            res.render('pages/brand/brand', { brands })
        } catch (error) {
            res.status(500).send("Internal server error")
        }

    }

    createForm(req, res) {
        res.render('pages/brand/brandForm')
    }

    async create(req, res) {
        const { name } = req.body

        try {
            const brand = await brandModel.create({ name })
            res.redirect('/brand')
        } catch (error) {
            res.status(500).send("Internal server error")
        }

    }

    async remove(req, res) {
        const { id } = req.params

        try {
            const brand = await brandModel.findByIdAndDelete(id)
            res.redirect('/brand')
        } catch (error) {
            res.status(500).send("Internal server error")
        }

    }
}

export default BrandController