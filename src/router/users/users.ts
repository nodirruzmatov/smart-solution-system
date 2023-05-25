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
  .get('/newsThree', users.GetNewsThree)
  .get('/products', users.GetProducts)
  .get('/servicesThree', users.getServicesThree)
  

