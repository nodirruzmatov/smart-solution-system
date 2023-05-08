import { Router } from "express"; import { validationHandler } from "../../middleware/validatinHandler";
import admin from '../../controller/admin/admin'
import { verifyToken } from "../../middleware/verifyToken";

const AdminRouter = Router()

export default AdminRouter.use(verifyToken)
  .get('/news', admin.NEWS)