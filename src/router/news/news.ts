import { Router } from "express";
import { validationHandler } from "../../middleware/validatinHandler";
import { verifyToken } from "../../middleware/verifyToken";
import { JOI } from "../../validation/validation";
import news from '../../controller/news/news'

const NewsRouter = Router()

export default NewsRouter.use(verifyToken)
  .get('/news', news.News)
  .post('/add_news', validationHandler(JOI.news), news.AddNews)
  .post('/update_news/:id', validationHandler(JOI.newsPut), news.UpdateNews)
  .get('/delete_news/:id', news.DelNews)