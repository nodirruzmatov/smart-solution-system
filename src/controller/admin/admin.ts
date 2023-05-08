import { NextFunction, Request, Response } from "express";
import dataSource from '../../config/orm'
import { News } from "../../entities/news";
import { Exception } from "../../exception/exception";

class admin {

  public async NEWS(req: Request, res: Response, next: NextFunction) {

    const allNews = await dataSource.getRepository(News)
      .find()
      .catch((err) => next(new Exception(err.message, 504)))

    const link = '/admin/news'

    res.render('admin.ejs', { link, allNews })
  }
}

export default new admin()