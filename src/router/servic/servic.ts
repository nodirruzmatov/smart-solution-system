import { Router } from "express";
import { validationHandler } from "../../middleware/validatinHandler";
import { verifyToken } from "../../middleware/verifyToken";
import { JOI } from "../../validation/validation";
import services from '../../controller/servic/servic'

const SerevicesRouter = Router()
export default SerevicesRouter.use(verifyToken)
  .get('/services', services.Services)
  .post('/create', validationHandler(JOI.sevices), services.Create)
  .post('/update/:id', validationHandler(JOI.sevicesPut), services.Update)
  .get('/delete/:id', services.Delete)