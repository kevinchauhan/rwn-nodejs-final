import { Router } from "express";
import authenticate from "../middlewares/authenticate.js";
import admin from "../middlewares/admin.js";
import ManagerController from "../controllers/ManagerController.js";

const managerRouter = Router()
const managerController = new ManagerController()

managerRouter.use(authenticate)
managerRouter.use(admin)

managerRouter.get('/', managerController.get)
managerRouter.get('/create', managerController.createForm)
managerRouter.post('/create', managerController.create)
managerRouter.get('/delete/:id', managerController.remove)

export default managerRouter