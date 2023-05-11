import { Router } from "express";
import { validationHandler } from "../../middleware/validatinHandler";
import { verifyToken } from "../../middleware/verifyToken";
import { JOI } from "../../validation/validation";
import employees from "../../controller/employees/employees";

const EmployeesRouter = Router()

export default EmployeesRouter.use(verifyToken)
  .get('/employee', employees.Get)
  .post('/create', validationHandler(JOI.employees), employees.NewEmployee)
  .post('/update/:id', validationHandler(JOI.employeesPut), employees.Update)
  .get('/delete/:id', employees.Delete)

