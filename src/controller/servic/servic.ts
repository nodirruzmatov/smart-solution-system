import { NextFunction, Request, Response } from "express";
import dataSource from '../../config/orm'
import { Exception } from "../../exception/exception";
import { Services } from "../../entities/services";


class services {

  public async Services(req: Request, res: Response, next: NextFunction) {
    const get = await dataSource
      .getRepository(Services)
      .find()
      .catch((err) => next(new Exception(err.message, 504)))

    const link = '/services/services'

    res.render("admin.ejs", { link, get })
  }

  public async Create(req: Request, res: Response, next: NextFunction): Promise<void> {

    const { title, desc, img, len } = req.body

    const create = await dataSource
      .createQueryBuilder()
      .insert()
      .into(Services)
      .values({ title, desc, img, len })
      .returning("*")
      .execute()
      .catch((err) => next(new Exception(err.message, 504)))

    if (create) res.redirect('/services/services')
  }

  public async Update(req: Request, res: Response, next: NextFunction): Promise<void> {

    const { id } = req.params;
    const { title, desc, img, len } = req.body

    const getOne = await dataSource
      .getRepository(Services)
      .findOneBy({ id: id })
      .catch((err) => next(new Exception(err.message, 504)))

    const t = title ? title : getOne?.title
    const d = desc ? desc : getOne?.desc
    const i = img ? img : getOne?.img

    const update = await dataSource
      .createQueryBuilder()
      .update(Services)
      .set({ title: t, desc: d, img: i, len })
      .where({ id })
      .returning("*")
      .execute()
      .catch((err) => next(new Exception(err.message, 504)))

    if (update) res.redirect('/services/services')

  }

  public async Delete(req: Request, res: Response, next: NextFunction): Promise<void> {

    const { id } = req.params;

    const del = await dataSource
      .createQueryBuilder()
      .delete()
      .from(Services)
      .where('service_id = :id', { id: id })
      .execute()
      .catch((err) => next(new Exception(err.message, 504)))

    if (del) res.redirect('/services/services')

  }
}

export default new services()