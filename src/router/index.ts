import { Router } from "express";
import Login from './login/login'
import News from './news/news'
import Cases from './cases/cases'
import Employees from './employees/employees'
import Services from './servic/servic'
import Products from "./products/products"
import Users from './users/users'
import View from "./views/views";

const router = Router();

export default router
  .use("/login", Login)
  .use("/news", News)
  .use("/cases", Cases)
  .use("/employee", Employees)
  .use("/services", Services)
  .use("/products", Products)
  .use("/users", Users)
  .use("/views", View);