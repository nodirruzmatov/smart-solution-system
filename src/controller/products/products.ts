import { NextFunction, Request, Response } from "express";
import path from "path";
import { del } from "../../utils/fs";
import dataSource from '../../config/orm'
import { Exception } from "../../exception/exception";
import { Products } from "../../entities/products";
import { PImages } from "../../entities/pimages";



class products {

  // ! get products
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

  // ! update products
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

  // ! delete products
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
  // ! add images to product
  public async NewImgCreate(req: Request, res: Response, next: NextFunction): Promise<void> {


    const id = req.params
    const { img }: any = req.files

    // ! for get generate file name for save to database
    let i

    // ! add image to images folder
    img.mv(path.join(process.cwd(), 'src', 'images', i = Date.now().toString() + path.extname(img.name)), (err: any) => {
      if (err) next(new Exception(err.message, 500))
    })

    // ! save database
    const newSubcategories = await dataSource
      .createQueryBuilder()
      .insert()
      .into(PImages)
      .values({ link: i, product: id })
      .returning("*")
      .execute()
      .catch((err) => next(new Exception(err.message, 504)));


    if (newSubcategories) res.redirect('/products/products')
    const get = await dataSource
      .getRepository(PImages)
      .find()
      .catch((err) => next(new Exception(err.message, 504)))


    console.log(get);
  }

  // ! delete images from products
  public async DelImg(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params

    // ! get data one by id
    const oneImg = await dataSource.getRepository(PImages)
      .findOneBy({ id: id })
      .catch((err) => next(new Exception(err.message, 504)))

    if (!oneImg) {
      return next(new Exception('This news not fount', 400))
    }


    const delimg = await dataSource
      .createQueryBuilder()
      .delete()
      .from(PImages)
      .where("pImage_id=:id", { id: id })
      .execute()
      .catch((err) => next(new Exception(err.message, 504)))

    if (delimg) {
      await del(String(oneImg?.link)).catch(err => next(new Exception(err.message, 500)))
    }
    if (delimg) res.redirect('/products/products')

  }
}

export default new products()