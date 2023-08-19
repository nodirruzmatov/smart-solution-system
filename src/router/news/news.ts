import { Router } from "express";
import { validationHandler } from "../../middleware/validatinHandler";
import { verifyToken } from "../../middleware/verifyToken";
import { JOI } from "../../validation/validation";
import news from '../../controller/news/news'

const NewsRouter = Router()

export default NewsRouter.use(verifyToken)
  .get("/news", news.News)
  .get("/addition/news/:id", news.NewsAdditon)
  .post("/add_news", validationHandler(JOI.news), news.AddNews)
  .post("/addition/news/:id", news.createAdditionNews)
  .post("/update_news/:id", validationHandler(JOI.newsPut), news.UpdateNews)
  .post("/update/addition/:id", news.UpdateAdditonNews)
  .get("/delete_news/:id", news.DelNews)
  .get("/delete/addition/:id", news.DelAdditionNews);