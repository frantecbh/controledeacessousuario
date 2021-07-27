import express from 'express'
import { router } from "./routes";
import "reflect-metadata";

import "./database";
import {UserController} from "./controllers/UserController";
import { SessionController } from './controllers/SessionController';
import { PermissionController } from './controllers/PermissionControler';
import { RouleController } from './controllers/RouleController';
import { ProductController } from './controllers/ProductController';
import { is } from './middlewares/permission'


const app = express()

app.use(express.json())

app.use(router)

const userController = new UserController()
const sessionController = new SessionController()
const permissionController = new PermissionController()
const roleController = new RouleController()
const productController = new ProductController()

router.post('/user', userController.create)
router.post('/session', sessionController.create)
router.post('/permissions', permissionController.create)
router.post('/roles', roleController.create)


router.post('/products', is(["ROLE_ADMIN"]),  productController.create)
router.get('/products', is(["ROLE_ADMIN", "ROLE_USER"]), productController.index)
router.get('/products/:id', is(["ROLE_ADMIN", "ROLE_USER"]), productController.show)



app.listen(3333, ()=>{
  console.log("Server on Port 3333")
})