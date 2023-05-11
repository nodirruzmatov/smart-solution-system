import { Router } from "express";
import Login from './login/login'
import News from './news/news'
import Cases from './cases/cases'
import Employees from './employees/employees'
import Services from './servic/servic'

const router = Router();

export default router
  .use('/login', Login)
  .use('/news', News)
  .use('/cases', Cases)
  .use('/employee', Employees)
  .use('/services', Services)