import { Router } from "express";
import Login from './login/login'
import News from './news/news'
import Cases from './cases/cases'

const router = Router();

export default router
  .use('/login', Login)
  .use('/news', News)
  .use('/cases', Cases)