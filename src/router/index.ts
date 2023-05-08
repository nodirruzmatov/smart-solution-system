import { Router } from "express";
import Login from './login/login'
import Admin from './admin/admin'

const router = Router();

export default router
  .use('/login', Login)
  .use('/admin', Admin)