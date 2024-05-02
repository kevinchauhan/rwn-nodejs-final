import bcryptjs from 'bcryptjs'
import userModel from "../models/userModel.js"

class ManagerController {
    async get(req, res) {
        try {
            const managers = await userModel.find({ role: 'manager' })
            console.log(managers)
            res.render('pages/manager/manager', { managers })
        } catch (error) {
            res.status(500).send("Internal server error")
        }

    }

    createForm(req, res) {
        res.render('pages/manager/managerForm')
    }

    async create(req, res) {
        try {
            const { name, email, password } = req.body
            const user = await userModel.findOne({ email })

            if (user) {
                return res.status(400).redirect('back')
            }

            const _SALT_ROUND = 10
            const hashedPassword = await bcryptjs.hash(password, _SALT_ROUND)
            await userModel.create({ name, email, password: hashedPassword, role: 'manager' })

            console.log('Manager created')
            res.status(201).redirect('/manager')
        } catch (error) {
            res.status(500).redirect('back')
        }

    }

    async remove(req, res) {
        const { id } = req.params

        try {
            await userModel.findByIdAndDelete(id)
            res.redirect('/manager')
        } catch (error) {
            res.status(500).send("Internal server error")
        }

    }
}

export default ManagerController