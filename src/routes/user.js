import { Router } from "express";
import UserController from "../controllers/UserController.js";
import authenticate from "../middlewares/authenticate.js";
import user from "../middlewares/user.js";
import guest from "../middlewares/Guest.js";

const userRouter = Router()
const userController = new UserController()

userRouter.get('/signup', guest, userController.signupPage)
userRouter.post('/signup', guest, userController.signup)

userRouter.get('/login', guest, userController.loginPage)
userRouter.post('/login', guest, userController.login)

userRouter.get('/logout', userController.logout)

userRouter.get('/self', userController.self)

userRouter.get('/product', authenticate, user, userController.productPage)

export default userRouter