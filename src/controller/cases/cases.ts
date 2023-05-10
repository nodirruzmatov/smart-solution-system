import { NextFunction, Request, Response } from "express";
import moment from "moment";
import dataSource from '../../config/orm'
import { Exception } from "../../exception/exception";
import { Cases } from "../../entities/cases";


class cases {

  public async Cases(req: Request, res: Response, next: NextFunction) {
    const allCases = await dataSource.getRepository(Cases)
      .find()
      .catch((err) => next(new Exception(err.message, 504)))

    const link = '/cases/cases'

    res.render('admin.ejs', { link, allCases })

  }

  public async NewCases(req: Request, res: Response, next: NextFunction): Promise<void> {

    const { title, link, len } = req.body

    const allCases = await dataSource.getRepository(Cases)
      .find()
      .catch((err) => next(new Exception(err.message, 504)))

    const fountCases = allCases?.find((e) => e.title == title)

    if (fountCases) {
      return next(new Exception('This case already has been created', 400))
    }

    const createCases = await dataSource
      .createQueryBuilder()
      .insert()
      .into(Cases)
      .values({ title, link, len })
      .returning("*")
      .execute()
      .catch((err) => next(new Exception(err.message, 504)))

    if (createCases) res.redirect('/cases/cases')

  }

  public async Update(req: Request, res: Response, next: NextFunction): Promise<void> {

    const { id } = req.params;
    const { title, link, len } = req.body

    const OneCase = await dataSource
      .getRepository(Cases)
      .findOneBy({ id: id })
      .catch((err) => next(new Exception(err.message, 504)))

    const t = title ? title : OneCase?.title
    const l = link ? link : OneCase?.link

    const updateCase = await dataSource
      .createQueryBuilder()
      .update(Cases)
      .set({ title: t, link: l, len })
      .where({ id })
      .returning("*")
      .execute()
      .catch((err) => next(new Exception(err.message, 504)))

    if (updateCase) res.redirect('/cases/cases')

  }

  public async DeleteCases(req: Request, res: Response, next: NextFunction): Promise<void> {

    const { id } = req.params;


    const del = await dataSource
      .createQueryBuilder()
      .delete()
      .from(Cases)
      .where('case_id = :id', { id: id })
      .returning("*")
      .execute()
      .catch((err) => next(new Exception(err.message, 504)))

    if (del) res.redirect('/cases/cases')

  }

}

export default new cases()
