import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"

const guest = async (req, res, next) => {
    try {
        const token = req.cookies.token

        if (!token) {
            return next()
        }

        const payload = jwt.verify(token, 'secret', (err, decoded) => {
            if (err) {
                return res.redirect('/user/login')
            }
            return decoded
        })

        if (!payload) {
            return next()
        }

        const user = await userModel.findById(payload.sub)

        if (!user) {
            res.clearCookie('token')
            return next()
        }

        req.user = user

        if (user.role === 'user') {
            res.redirect('/user/product')
        } else {
            res.redirect('/')
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Error while verifying token',
            success: false
        })
    }
}

export default guest