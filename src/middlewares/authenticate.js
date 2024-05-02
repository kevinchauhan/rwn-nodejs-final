import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"

const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.token

        if (!token) {
            return res.redirect('/user/login')
        }

        const payload = jwt.verify(token, 'secret', (err, decoded) => {
            if (err) {
                return res.redirect('/user/login')
            }
            return decoded
        })

        if (!payload) {
            return res.redirect('/user/login')
        }

        const user = await userModel.findById(payload.sub)

        if (!user) {
            return res.redirect('/user/login')
        }

        req.user = user
        next()
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Error while verifying token',
            success: false
        })
    }
}

export default authenticate