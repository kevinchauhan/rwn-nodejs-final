import { Router } from "express";
import SubCategoryController from "../controllers/SubCategoryController.js";
import authenticate from "../middlewares/authenticate.js";
import authorized from "../middlewares/authorized.js";

const subCategoryRouter = Router()
const subCategoryController = new SubCategoryController()

subCategoryRouter.use(authenticate)
subCategoryRouter.use(authorized)

subCategoryRouter.get('/', subCategoryController.get)
subCategoryRouter.get('/create', subCategoryController.createForm)
subCategoryRouter.post('/create', subCategoryController.create)
subCategoryRouter.get('/delete/:id', subCategoryController.remove)

export default subCategoryRouter