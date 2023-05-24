import { NextFunction, Request, Response } from "express";
import path from "path";
import { del } from "../../utils/fs";
import dataSource from '../../config/orm'
import { Exception } from "../../exception/exception";
import { Services } from "../../entities/services";


class services {
  // ! read ---------------------
  public async Services(req: Request, res: Response, next: NextFunction) {
    const get = await dataSource
      .getRepository(Services)
      .find()
      .catch((err) => next(new Exception(err.message, 504)))

    const link = '/services/services'

    res.render("admin.ejs", { link, get })
  }

  // ! create --------------------
  public async Create(req: Request, res: Response, next: NextFunction): Promise<void> {

    const { title, desc, len } = req.body
    const {img}:any = req.files

    // ! for get generate file name for save to database
    let i    

    // ! add image to images folder
    img.mv(path.join(process.cwd(), 'src', 'images', i = Date.now().toString() + path.extname(img.name)), (err:any) =>{
      if (err)next( new Exception(err.message, 500))
    })

    // ! save database
    const create = await dataSource
      .createQueryBuilder()
      .insert()
      .into(Services)
      .values({ title, desc, img: i, len })
      .returning("*")
      .execute()
      .catch((err) => next(new Exception(err.message, 504)))

    if (create) res.redirect('/services/services')
  }

  // ! update ----------------------
  public async Update(req: Request, res: Response, next: NextFunction): Promise<void> {

    const { id } = req.params;
    const { title, desc, len } = req.body

    // ! for get generate file name for save to database
    let f

    const img:any= req.files?.img 

    // ! get data one by id
    const getOne = await dataSource
      .getRepository(Services)
      .findOneBy({ id: id })
      .catch((err) => next(new Exception(err.message, 504)))

    // ! change image if it come
    if(img){
      await del(String(getOne?.img)).catch(err => next(new Exception(err.message , 500)))

      img.mv(path.join(process.cwd(), 'src', 'images', f = Date.now().toString() + path.extname(img.name)), (err:any) =>{
        if (err)next( new Exception(err.message, 500))
      })
    }

     // ! change data if it come
    const t = title ? title : getOne?.title
    const d = desc ? desc : getOne?.desc
    const i = img ? f : getOne?.img

    // ! save database
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

  // ! delete -----------------------------
  public async Delete(req: Request, res: Response, next: NextFunction): Promise<void> {

    const { id } = req.params;

    // ! get data one by id
    const getOne = await dataSource
      .getRepository(Services)
      .findOneBy({ id: id })
      .catch((err) => next(new Exception(err.message, 504)))

    const delser = await dataSource
      .createQueryBuilder()
      .delete()
      .from(Services)
      .where('service_id = :id', { id: id })
      .execute()
      .catch((err) => next(new Exception(err.message, 504)))

      if(delser){
        await del(String(getOne?.img)).catch(err => next(new Exception(err.message , 500)))
      }
    if (delser) res.redirect('/services/services')

  }
}

export default new services()