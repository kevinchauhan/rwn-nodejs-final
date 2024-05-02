import { Router } from "express";
import ProductController from "../controllers/ProductController.js";
import authenticate from "../middlewares/authenticate.js";
import admin from "../middlewares/Admin.js";

const productRouter = Router()
const productController = new ProductController()

productRouter.use(authenticate)
productRouter.use(admin)

productRouter.get('/', productController.get)
productRouter.get('/create', productController.createForm)
productRouter.post('/create', productController.create)
productRouter.get('/delete/:id', productController.remove)

export default productRouter