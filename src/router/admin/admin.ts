import { Router } from "express"; import { validationHandler } from "../../middleware/validatinHandler";
import admin from '../../controller/admin/admin'
import { verifyToken } from "../../middleware/verifyToken";
import { JOI } from "../../validation/validation";

const AdminRouter = Router()

export default AdminRouter.use(verifyToken)
  .get('/news', admin.News)
  .post('/add_news', validationHandler(JOI.news), admin.AddNews)
  .post('/update_news/:id', validationHandler(JOI.newsPut), admin.UpdateNews)
  .get('/delete_news/:id', admin.DelNews)