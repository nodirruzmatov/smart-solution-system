import { NextFunction, Request, Response } from "express";
import dataSource from '../../config/orm'
import { Exception } from "../../exception/exception";

import { Users } from "../../entities/users";

class users {

  public async Getmail(req: Request, res: Response, next: NextFunction) {

    const allMail = await dataSource
      .getRepository(Users)
      .find()
      .catch((err) => next(new Exception(err.message, 504)))

    const link = 'users/users'

    res.render('admin.ejs', { link, allMail })
  }

  public async PostMail(req: Request, res: Response, next: NextFunction): Promise<void> {

    const { name, mail, title, desc, createAt } = req.body

    const createMail = await dataSource
      .createQueryBuilder()
      .insert()
      .into(Users)
      .values({ name, mail, title, desc, createAt })
      .returning("*")
      .execute()
      .catch((err) => next(new Exception(err.message, 504)))


  }

  public async DelMail(req: Request, res: Response, next: NextFunction): Promise<void> {

    const { id } = req.params;

    const delmail = await dataSource
      .createQueryBuilder()
      .delete()
      .from(Users)
      .where('user_id = :id', { id: id })
      .returning("*")
      .execute()
      .catch((err) => next(new Exception(err.message, 504)))
    if (delmail) res.redirect('users/users')
  }
}

export default new users()