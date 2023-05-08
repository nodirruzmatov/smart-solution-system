import { NextFunction, Request, Response } from "express";
import dataSource from '../../config/orm'
import { Admin } from "../../entities/admin";
import { Exception } from "../../exception/exception";
import { sing } from "../../utils/jst";


class login {

  public async GetLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
    res.render('login.ejs')
  }

  public async Login(req: Request, res: Response, next: NextFunction): Promise<void> {

    const { login, password } = req.body

    const admin = await dataSource
      .getRepository(Admin)
      .find()
      .catch((err) => next(new Exception(err.message, 504)))

    const fountAdmin = admin?.find(e => e.login == login && e.password == password)

    if (!fountAdmin) {
      return next(new Exception('admin not fount', 404))
    }

    res.cookie("access_token", sing({ id: fountAdmin?.id }))
    res.redirect('/admin/news')

  }

}

export default new login();