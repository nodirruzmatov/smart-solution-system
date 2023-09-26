import { NextFunction, Request, Response } from "express";
import dataSource from "../../config/orm";
import { View } from "../../entities/views";
import { Exception } from "../../exception/exception";
import { AdditionNews } from "../../entities/news.image.desc";

class Views {
  // ! read ------------
  public async GetViews(req: Request, res: Response, next: NextFunction) {
    const get = await dataSource
      .getRepository(View)
      .find()
      .catch((err) => next(new Exception(err.message, 504)));

    const link = "/views/views";

    res.render("admin.ejs", { link, get });
  }

  // ! create --------------------
  public async AddView(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    let { number } = req.body;

    const allViews: any = await dataSource
      .getRepository(View)
      .createQueryBuilder("views")
      .getMany()
      .catch((err) => next(new Exception(err.message, 504)));
    console.log(allViews.length);

    if (allViews.length == 0) {
      const createView = await dataSource
        .createQueryBuilder()
        .insert()
        .into(View)
        .values({ number })
        .returning("*")
        .execute()
        .catch((err) => next(new Exception(err.message, 504)));

      if (createView) {
        res.json({
          status: 401,
          message: "Create view successfully",
        });
      }
    } else if (allViews.length > 0) {
      number = allViews[0].number + number;

      const createView = await dataSource
        .createQueryBuilder()
        .update(View)
        .set({ number: number })
        .where({ id: allViews[0].id })
        .returning("*")
        .execute()
        .catch((err) => next(new Exception(err.message, 504)));

      if (createView) {
        res.json({
          status: 401,
          message: "Update view successfully",
        });
      }
    }
  }
}

export default new Views();
