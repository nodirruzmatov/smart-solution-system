import { Router } from "express";
import { validationHandler } from "../../middleware/validatinHandler";
import { verifyToken } from "../../middleware/verifyToken";
import { JOI } from "../../validation/validation";
import cases from "../../controller/cases/cases";

const CasesRouter = Router()

export default CasesRouter.use(verifyToken)
  .get('/cases', cases.Cases)
  .post('/create', validationHandler(JOI.cases), cases.NewCases)
  .post('/update/:id', validationHandler(JOI.casesPut), cases.Update)
  .get('/delete/:id', cases.DeleteCases)
