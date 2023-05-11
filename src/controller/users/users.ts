import { NextFunction, Request, Response } from "express";
import moment from "moment";
import dataSource from '../../config/orm'
import { Exception } from "../../exception/exception";

import { Users } from "../../entities/users";
import { Cases } from "../../entities/cases";
import { Emmpoyees } from "../../entities/employees";
import { News } from "../../entities/news";
import { Products } from "../../entities/products";
import { Services } from "../../entities/services";

class users {

  public async Getmail(req: Request, res: Response, next: NextFunction) {

    const get = await dataSource
      .getRepository(Users)
      .find()
      .catch((err) => next(new Exception(err.message, 504)))

    get?.filter(e => e.createAt = moment(e.createAt).format('LLL'))

    const link = '/users/users'

    res.render('admin.ejs', { link, get })
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

    res.sendStatus(200).json({
      message: "Successfuly"
    })


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
    if (delmail) res.redirect('/users/users')
  }

  public async GetCases(req: Request, res: Response, next: NextFunction) {

    const allCases = await dataSource.getRepository(Cases)
      .find()
      .catch((err) => next(new Exception(err.message, 504)))

    res.json(allCases);

  }

  public async GetEmployees(req: Request, res: Response, next: NextFunction) {

    const allEmployees = await dataSource
      .getRepository(Emmpoyees)
      .find()
      .catch((err) => next(new Exception(err.message, 504)))

    res.json(allEmployees);

  }


  public async GetNews(req: Request, res: Response, next: NextFunction) {

    const allNews = await dataSource.getRepository(News)
      .find()
      .catch((err) => next(new Exception(err.message, 504)))

    allNews?.filter(e => e.createAt = moment(e.createAt).format('LLL'))

    res.json(allNews)
  }


  public async GetProducts(req: Request, res: Response, next: NextFunction) {

    const get = await dataSource
      .getRepository(Products)
      .createQueryBuilder("Products")
      .leftJoinAndSelect("Products.pImages", "pImages")
      .getMany()
      .catch((err) => next(new Exception(err.message, 504)))

    res.json(get)
  }


  public async getServices(req: Request, res: Response, next: NextFunction) {
    const get = await dataSource
      .getRepository(Services)
      .find()
      .catch((err) => next(new Exception(err.message, 504)))

    res.json(get)
  }


}

export default new users()