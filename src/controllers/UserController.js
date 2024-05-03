import bcryptjs from 'bcryptjs'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import productModel from '../models/productModel.js'

class UserController {

    signupPage(req, res) {
        res.render('pages/auth/signup')
    }

    async signup(req, res) {
        try {
            const { name, email, password } = req.body
            const user = await userModel.findOne({ email })

            if (user) {
                return res.status(400).redirect('back')
            }

            const _SALT_ROUND = 10
            const hashedPassword = await bcryptjs.hash(password, _SALT_ROUND)
            await userModel.create({ name, email, password: hashedPassword })

            console.log('User signup')
            res.status(201).redirect('/user/login')
        } catch (error) {
            res.status(500).redirect('/user/login')
        }

    }

    loginPage(req, res) {
        res.render('pages/auth/login')
    }

    async login(req, res) {

        try {
            const { email, password } = req.body
            const user = await userModel.findOne({ email })

            if (!user) {
                return res.status(400).redirect('back')
            }

            const isVerify = await bcryptjs.compare(password, user.password)

            if (!isVerify) {
                return res.status(400).redirect('back')
            }

            const payload = {
                sub: user._id,
                name: user.name
            }

            const token = jwt.sign(payload, 'secret', {
                expiresIn: '1d'
            })

            res.cookie('token', token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24   // 24 hr
            })
            console.log('user logged in')
            if (user.role === 'user') {
                return res.redirect('/user/product')
            }
            res.redirect('/')

        } catch (error) {
            res.status(400).redirect('back')
        }

    }

    logout(req, res) {
        res.clearCookie('token')
        res.redirect('/user/login')
    }

    async productPage(req, res) {
        const products = await productModel.find()
        res.render('pages/user/product', { products })
    }

    async self(req, res) {
        try {
            const token = req.cookies.token

            if (!token) {
                return res.status(401).json({
                    message: 'unauthorized'
                })
            }

            const payload = jwt.verify(token, 'secret', (err, decoded) => {
                if (err) {
                    return res.status(401).json({
                        message: 'unauthorized'
                    })
                }
                return decoded
            })

            if (!payload) {
                return res.status(401).json({
                    message: 'unauthorized'
                })
            }

            const user = await userModel.findById(payload.sub).select('-password -__v')

            if (!user) {
                return res.status(401).json({
                    message: 'unauthorized'
                })
            }

            res.json({
                user
            })

        } catch (error) {
            res.status(500).json({
                message: 'Error while verifying token',
            })
        }

    }
}

export default UserController