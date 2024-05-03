import { Router } from "express";
import ProductController from "../controllers/ProductController.js";
import authenticate from "../middlewares/authenticate.js";
import authorized from "../middlewares/authorized.js";
import { upload } from "../middlewares/multer.js";

const productRouter = Router()
const productController = new ProductController()

productRouter.use(authenticate)
productRouter.use(authorized)

productRouter.get('/', productController.get)

productRouter.get('/create', productController.createForm)
productRouter.post('/create', upload, productController.create)

productRouter.get('/edit/:id', productController.editForm)
productRouter.post('/edit/:id', productController.update)

productRouter.get('/delete/:id', productController.remove)

export default productRouter