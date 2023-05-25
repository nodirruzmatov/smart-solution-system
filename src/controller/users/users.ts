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

    res.json(createMail)


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


  // ! cases -------------------
  public async GetCases(req: Request, res: Response, next: NextFunction) {

    const allCases = await dataSource.getRepository(Cases)
      .find({
        order:{
          createAt:"DESC"
        }
      })
      .catch((err) => next(new Exception(err.message, 504)))

    res.json(allCases);

  }

  public async GetCesesThree(req: Request, res: Response, next: NextFunction){

    const threeCases = await dataSource.getRepository(Cases)
      .find({
        order:{
          createAt:"DESC"
        },
        take:3
      })
      .catch((err) => next(new Exception(err.message, 504)))

    res.json(threeCases);
  }

  // ! Employees ----------------
  public async GetEmployees(req: Request, res: Response, next: NextFunction) {

    const allEmployees = await dataSource
      .getRepository(Emmpoyees)
      .find()
      .catch((err) => next(new Exception(err.message, 504)))

    res.json(allEmployees);

  }
  public async GetEmployeesThree(req: Request, res: Response, next: NextFunction) {

    const allEmployees = await dataSource
      .getRepository(Emmpoyees)
      .find({
        order:{
          createAt:"ASC"
        },
        take:6
      })
      .catch((err) => next(new Exception(err.message, 504)))

    res.json(allEmployees);

  }

// !news -----------------
  public async GetNews(req: Request, res: Response, next: NextFunction) {

    const allNews = await dataSource.getRepository(News)
      .find({
        order:{
          createAt:"DESC"
        }
      })
      .catch((err) => next(new Exception(err.message, 504)))

    allNews?.filter(e => e.createAt = moment(e.createAt).format('LLL'))

    res.json(allNews)
  }

  public async GetNewsThree(req: Request, res: Response, next: NextFunction) {

    const allNews = await dataSource.getRepository(News)
      .find({
        order:{
          createAt:"DESC"
        },
        take:5
      })
      .catch((err) => next(new Exception(err.message, 504)))

    allNews?.filter(e => e.createAt = moment(e.createAt).format('LLL'))

    res.json(allNews)
  }


  // ! products ----------
  public async GetProducts(req: Request, res: Response, next: NextFunction) {

    const get = await dataSource
      .getRepository(Products)
      .createQueryBuilder("Products")
      .leftJoinAndSelect("Products.pImages", "pImages")
      .getMany()
      .catch((err) => next(new Exception(err.message, 504)))

    res.json(get)
  }

// ! services ------------------
  public async getServices(req: Request, res: Response, next: NextFunction) {
    const get = await dataSource
      .getRepository(Services)
      .find()
      .catch((err) => next(new Exception(err.message, 504)))

    res.json(get)
  }

  public async getServicesThree(req: Request, res: Response, next: NextFunction) {
    const get = await dataSource
      .getRepository(Services)
      .find({
        take:6
      })
      .catch((err) => next(new Exception(err.message, 504)))

    res.json(get)
  }


}

export default new users()