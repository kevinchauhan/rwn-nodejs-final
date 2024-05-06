import { Router } from "express";
import BrandController from "../controllers/BrandController.js";
import authenticate from "../middlewares/authenticate.js";
import authorized from "../middlewares/authorized.js";

const brandRouter = Router()
const brandController = new BrandController()

brandRouter.use(authenticate)
brandRouter.use(authorized)

brandRouter.get('/', brandController.get)
brandRouter.get('/create', brandController.createForm)
brandRouter.post('/create', brandController.create)
brandRouter.get('/delete/:id', brandController.remove)

export default brandRouter