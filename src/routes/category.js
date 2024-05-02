import { Router } from "express";
import CategoryController from "../controllers/categoryController.js";
import authenticate from "../middlewares/authenticate.js";
import authorized from "../middlewares/authorized.js";

const categoryRouter = Router()
const categoryController = new CategoryController()

categoryRouter.use(authenticate)
categoryRouter.use(authorized)

categoryRouter.get('/', categoryController.get)
categoryRouter.get('/create', categoryController.createForm)
categoryRouter.post('/create', categoryController.create)
categoryRouter.get('/delete/:id', categoryController.remove)

export default categoryRouter