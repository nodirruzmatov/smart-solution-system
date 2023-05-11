import { NextFunction, Request, Response } from "express";
import dataSource from '../../config/orm'
import { Exception } from "../../exception/exception";
import { Emmpoyees } from "../../entities/employees";

class employees {

  // ! read ------------
  public async Get(req: Request, res: Response, next: NextFunction) {

    const allEmployees = await dataSource
      .getRepository(Emmpoyees)
      .find()
      .catch((err) => next(new Exception(err.message, 504)))
    const link = '/employee/employee'
    res.render('admin.ejs', { link, allEmployees })
  }
  // ! create --------------------
  public async NewEmployee(req: Request, res: Response, next: NextFunction): Promise<void> {

    const { name, job, desc, telegram, mail, insta, phone, img, len } = req.body

    const createEmployee = await dataSource
      .createQueryBuilder()
      .insert()
      .into(Emmpoyees)
      .values({ name, job, desc, telegram, mail, insta, phone, img, len })
      .returning("*")
      .execute()
      .catch((err) => next(new Exception(err.message, 504)))

    if (createEmployee) res.redirect('/employee/employee')

  }

  // ! update ----------------------
  public async Update(req: Request, res: Response, next: NextFunction): Promise<void> {

    const { id } = req.params;
    const { name, job, desc, telegram, mail, insta, phone, img, len } = req.body

    const oneEmployee = await dataSource
      .getRepository(Emmpoyees)
      .findOneBy({ id })
      .catch((err) => next(new Exception(err.message, 504)))

    const n = name ? name : oneEmployee?.name
    const j = job ? job : oneEmployee?.job
    const d = desc ? desc : oneEmployee?.desc
    const t = telegram ? telegram : oneEmployee?.telegram
    const m = mail ? mail : oneEmployee?.mail
    const ins = insta ? insta : oneEmployee?.insta
    const p = phone ? phone : oneEmployee?.phone
    const i = img ? img : oneEmployee?.img

    const update = await dataSource
      .createQueryBuilder()
      .update(Emmpoyees)
      .set({ name: n, job: j, desc: d, telegram: t, mail: m, insta: ins, phone: p, img: i, len })
      .where({ id })
      .returning("*")
      .execute()
      .catch((err) => next(new Exception(err.message, 504)))

    if (update) res.redirect('/employee/employee')
  }
  // ! delete -----------------------------
  public async Delete(req: Request, res: Response, next: NextFunction): Promise<void> {

    const { id } = req.params;

    const del = await dataSource
      .createQueryBuilder()
      .delete()
      .from(Emmpoyees)
      .where("employee_id = :id", { id: id })
      .returning("*")
      .execute()
      .catch((err) => next(new Exception(err.message, 504)))

    if (del) res.redirect('/employee/employee')

  }

}
export default new employees()