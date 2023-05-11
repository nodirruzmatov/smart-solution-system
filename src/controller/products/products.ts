import { NextFunction, Request, Response } from "express";
import dataSource from '../../config/orm'
import { Exception } from "../../exception/exception";
import { Products } from "../../entities/products";
import { PImages } from "../../entities/pimages";
import { log } from "console";



class products {

  public async Get(req: Request, res: Response, next: NextFunction) {

    const get = await dataSource
      .getRepository(Products)
      .createQueryBuilder("Products")
      .leftJoinAndSelect("Products.pImages", "pImages")
      .getMany()
      .catch((err) => next(new Exception(err.message, 504)))

    const link = '/products/products'
    res.render('admin.ejs', { link, get })
  }



  public async Create(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { name, desc, len } = req.body

    const create = await dataSource
      .createQueryBuilder()
      .insert()
      .into(Products)
      .values({ name, desc, len })
      .returning("*")
      .execute()
      .catch((err) => next(new Exception(err.message, 504)))

    if (create) res.redirect('/products/products')

  }

  public async Update(req: Request, res: Response, next: NextFunction): Promise<void> {

    const { id } = req.params;
    const { name, desc, len } = req.body

    const one = await dataSource
      .getRepository(Products)
      .findOneBy({ id })
      .catch((err) => next(new Exception(err.message, 504)))

    const n = name ? name : one?.name
    const d = desc ? desc : one?.desc

    const update = await dataSource
      .createQueryBuilder()
      .update(Products)
      .set({ name: n, desc: d, len })
      .where({ id })
      .returning("*")
      .execute()
      .catch((err) => next(new Exception(err.message, 504)))

    if (update) res.redirect('/products/products')

  }

  public async Delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params

    const del = await dataSource
      .createQueryBuilder()
      .delete()
      .from(Products)
      .where('product_id =:id', { id: id })
      .execute()
      .catch((err) => next(new Exception(err.message, 504)))

    if (del) res.redirect('/products/products')

  }

  // ! image ------

  public async NewImgCreate(req: Request, res: Response, next: NextFunction): Promise<void> {


    const id = req.params
    const { link, } = req.body



    const newSubcategories = await dataSource
      .createQueryBuilder()
      .insert()
      .into(PImages)
      .values({ link, product: id })
      .returning("*")
      .execute()
      .catch((err) => next(new Exception(err.message, 504)));


    if (newSubcategories) res.redirect('/products/products')
  }

  public async DelImg(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params

    const del = await dataSource
      .createQueryBuilder()
      .delete()
      .from(PImages)
      .where("pImage_id=:id", { id: id })
      .execute()
      .catch((err) => next(new Exception(err.message, 504)))

    if (del) res.redirect('/products/products')

  }
}

export default new products()