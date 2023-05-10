import { Router } from "express";
import Login from './login/login'
import News from './news/news'

const router = Router();

export default router
  .use('/login', Login)
  .use('/news', News)