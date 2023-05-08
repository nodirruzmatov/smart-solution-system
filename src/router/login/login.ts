import { Router } from "express";
import login from '../../controller/login/login'
import { validationHandler } from "../../middleware/validatinHandler";
import { JOI } from "../../validation/validation";


const LoginRouter = Router()

export default LoginRouter.get('/get', login.GetLogin)
  .get('/get', validationHandler(JOI.login), login.GetLogin)
  .post('/login', validationHandler(JOI.login), login.Login)