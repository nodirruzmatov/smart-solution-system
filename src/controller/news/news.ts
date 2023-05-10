import { NextFunction, Request, Response } from "express";
import dataSource from '../../config/orm'
import { News } from "../../entities/news";
import { Exception } from "../../exception/exception";
import moment from "moment";

class admin {

  public async News(req: Request, res: Response, next: NextFunction) {

    const allNews = await dataSource.getRepository(News)
      .find()
      .catch((err) => next(new Exception(err.message, 504)))

    allNews?.filter(e => e.createAt = moment(e.createAt).format('LLL'))

    const link = '/news/news'

    res.render('admin.ejs', { link, allNews })
  }

  public async AddNews(req: Request, res: Response, next: NextFunction): Promise<void> {

    const { title, desc, img, location, len } = req.body


    const allNews = await dataSource.getRepository(News)
      .find()
      .catch((err) => next(new Exception(err.message, 504)))


    const fountNews = allNews?.find((e) => e.title == title)

    if (fountNews) {
      return next(new Exception('This news already has been created', 400))
    }

    const createNews = await dataSource
      .createQueryBuilder()
      .insert()
      .into(News)
      .values({ title, desc, location, img, len })
      .returning("*")
      .execute()
      .catch((err) => next(new Exception(err.message, 504)))


    if (createNews) res.redirect('/news/news')

  }

  public async UpdateNews(req: Request, res: Response, next: NextFunction): Promise<void> {

    const { id } = req.params;
    const { title, desc, img, location, len } = req.body

    const oneNews = await dataSource.getRepository(News)
      .findOneBy({ id: id })
      .catch((err) => next(new Exception(err.message, 504)))

    const t = title ? title : oneNews?.title
    const d = desc ? desc : oneNews?.desc
    const i = img ? img : oneNews?.img
    const l = location ? location : oneNews?.location

    const updateNews = await dataSource
      .createQueryBuilder()
      .update(News)
      .set({ title: t, desc: d, img: i, location: l, len })
      .where({ id })
      .returning("*")
      .execute()
      .catch((err) => next(new Exception(err.message, 504)))

    if (updateNews) res.redirect('/news/news')

  }

  public async DelNews(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    const allNews = await dataSource.getRepository(News)
      .find()
      .catch((err) => next(new Exception(err.message, 504)))


    const fountNews = allNews?.find((e) => e.id == id)

    if (!fountNews) {
      return next(new Exception('This news not fount', 400))
    }

    const del = await dataSource
      .createQueryBuilder()
      .delete()
      .from(News)
      .where("news_id = :id", { id: id })
      .returning("*")
      .execute();

    if (del) res.redirect('/news/news')

  }


}

export default new admin()