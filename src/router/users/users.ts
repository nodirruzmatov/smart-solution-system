import { Router } from "express";
import { validationHandler } from "../../middleware/validatinHandler";
import { verifyToken } from "../../middleware/verifyToken";
import { JOI } from "../../validation/validation";
import users from '../../controller/users/users'

const UsersRouter = Router()

export default UsersRouter
  .get('/users', verifyToken, users.Getmail)
  .get('/delMail/:id', verifyToken, users.DelMail)
  .post('/create', validationHandler(JOI.mail), users.PostMail)
  .get('/cases', users.GetCases)
  .get('/casesThree', users.GetCesesThree)
  .get('/employees', users.GetEmployees)
  .get('/employeesThree', users.GetEmployeesThree)
  .get('/newsThree/uz', users.GetNewsThreeUz)
  .get('/newsThree/eng', users.GetNewsThreeEng)
  .get('/news', users.GetNews)
  .get('/products', users.GetProducts)
  .get('/servicesThree/uz', users.getServicesThreeUz)
  .get('/servicesThree/eng', users.getServicesThreeEn)
  .get('/services', users.getServices)