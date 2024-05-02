import { Router } from "express";
import SubCategoryController from "../controllers/SubCategoryController.js";
import authenticate from "../middlewares/authenticate.js";
import admin from "../middlewares/Admin.js";

const subCategoryRouter = Router()
const subCategoryController = new SubCategoryController()

subCategoryRouter.use(authenticate)
subCategoryRouter.use(admin)

subCategoryRouter.get('/', subCategoryController.get)
subCategoryRouter.get('/create', subCategoryController.createForm)
subCategoryRouter.post('/create', subCategoryController.create)
subCategoryRouter.get('/delete/:id', subCategoryController.remove)

export default subCategoryRouter