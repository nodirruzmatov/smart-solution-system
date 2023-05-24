import { NextFunction, Request, Response } from "express";
import moment from "moment";
import path from "path";
import { del } from "../../utils/fs";
import dataSource from '../../config/orm'
import { News } from "../../entities/news";
import { Exception } from "../../exception/exception";



class admin {
  // ! read ------------
  public async News(req: Request, res: Response, next: NextFunction) {

    const allNews = await dataSource.getRepository(News)
      .find()
      .catch((err) => next(new Exception(err.message, 504)))

    allNews?.filter(e => e.createAt = moment(e.createAt).format('LLL'))

    const link = '/news/news'

    res.render('admin.ejs', { link, allNews })
  }
  // ! create --------------------
  public async AddNews(req: Request, res: Response, next: NextFunction): Promise<void> {

    const { title, desc, location, len } = req.body
    const { img }: any = req.files

    // ! for get generate file name for save to database
    let i

    // ! chacking data
    const allNews = await dataSource.getRepository(News)
      .find()
      .catch((err) => next(new Exception(err.message, 504)))

    const fountNews = allNews?.find((e) => e.title == title)

    if (fountNews) {
      return next(new Exception('This news already has been created', 400))
    }

    // ! add image to images folder
    img.mv(path.join(process.cwd(), 'src', 'images', i = Date.now().toString() + path.extname(img.name)), (err: any) => {
      if (err) next(new Exception(err.message, 500))
    })

    // ! save database
    const createNews = await dataSource
      .createQueryBuilder()
      .insert()
      .into(News)
      .values({ title, desc, location, img: i, len })
      .returning("*")
      .execute()
      .catch((err) => next(new Exception(err.message, 504)))


    if (createNews) res.redirect('/news/news')

  }

  // ! update ----------------------
  public async UpdateNews(req: Request, res: Response, next: NextFunction): Promise<void> {

    const { id } = req.params;
    const { title, desc, location, len } = req.body

    // ! for get generate file name for save to database
    let f

    const img: any = req.files?.img

    // ! get data one by id
    const oneNews = await dataSource.getRepository(News)
      .findOneBy({ id: id })
      .catch((err) => next(new Exception(err.message, 504)))

    // ! change image if it come
    if (img) {
      await del(String(oneNews?.img)).catch(err => next(new Exception(err.message, 500)))

      img.mv(path.join(process.cwd(), 'src', 'images', f = Date.now().toString() + path.extname(img.name)), (err: any) => {
        if (err) next(new Exception(err.message, 500))
      })
    }

    // ! change data if it come

    const t = title ? title : oneNews?.title
    const d = desc ? desc : oneNews?.desc
    const i = img ? f : oneNews?.img
    const l = location ? location : oneNews?.location

    // ! save database
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


  // ! delete --------------
  public async DelNews(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;

    // ! get data one by id
    const oneNews = await dataSource.getRepository(News)
      .findOneBy({ id: id })
      .catch((err) => next(new Exception(err.message, 504)))

    if (!oneNews) {
      return next(new Exception('This news not fount', 400))
    }

    const delnews = await dataSource
      .createQueryBuilder()
      .delete()
      .from(News)
      .where("news_id = :id", { id: id })
      .returning("*")
      .execute()
      .catch((err) => next(new Exception(err.message, 504)))

    if (delnews) {
      await del(String(oneNews?.img)).catch(err => next(new Exception(err.message, 500)))
    }

    if (delnews) res.redirect('/news/news')

  }


}

export default new admin()