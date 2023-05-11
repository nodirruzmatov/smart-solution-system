import { Router } from "express";
import { validationHandler } from "../../middleware/validatinHandler";
import { verifyToken } from "../../middleware/verifyToken";
import { JOI } from "../../validation/validation";
import products from '../../controller/products/products'

const productsRouter = Router()


export default productsRouter.use(verifyToken)
  .get('/products', products.Get)
  .post('/create', validationHandler(JOI.products), products.Create)
  .post('/update/:id', validationHandler(JOI.productsPut), products.Update)
  .get('/delete/:id', products.Delete)
  .post('/img/:id', validationHandler(JOI.images), products.NewImgCreate)
  .get('/delete_img/:id', products.DelImg)
