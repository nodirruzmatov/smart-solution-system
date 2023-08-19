import { NextFunction, Request, Response } from "express";
import moment from "moment";
import path from "path";
import { del } from "../../utils/fs";
import dataSource from '../../config/orm'
import { News } from "../../entities/news";
import { Exception } from "../../exception/exception";
import { AdditionNews } from "../../entities/news.image.desc";

class admin {
  // ! read ------------
  public async News(req: Request, res: Response, next: NextFunction) {
    const allNews = await dataSource
      .getRepository(News)
      .createQueryBuilder("news")
      .orderBy({ "news.createAt": "DESC" })
      .getMany()
      .catch((err) => next(new Exception(err.message, 504)));

    allNews?.filter((e) => (e.createAt = moment(e.createAt).format("L")));

    const link = "/news/news";

    res.render("admin.ejs", { link, allNews });
  }

  // ! read additon news ------------
  public async NewsAdditon(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    const allNews = await dataSource
      .getRepository(News)
      .createQueryBuilder("news")
      .leftJoinAndSelect("news.addition_news", "addition_news")
      .getMany()
      .catch((err) => next(new Exception(err.message, 504)));

    allNews?.filter((e) => (e.createAt = moment(e.createAt).format("L")));

    const { addition_news }: any = allNews?.find((e) => e.id == id);

    const link = "/news/news/addition";
    res.render("admin.ejs", { link, addition_news });
  }

  // ! create --------------------
  public async AddNews(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { title, location, len } = req.body;
    const { img }: any = req.files;

    // ! for get generate file name for save to database
    let i;

    // ! chacking data
    const allNews = await dataSource
      .getRepository(News)
      .find()
      .catch((err) => next(new Exception(err.message, 504)));

    const fountNews = allNews?.find((e) => e.title == title);

    if (fountNews) {
      return next(new Exception("This news already has been created", 400));
    }

    // ! add image to images folder
    img.mv(
      path.join(
        process.cwd(),
        "src",
        "images",
        (i = Date.now().toString() + path.extname(img.name))
      ),
      (err: any) => {
        if (err) next(new Exception(err.message, 500));
      }
    );

    // ! save database
    const createNews = await dataSource
      .createQueryBuilder()
      .insert()
      .into(News)
      .values({ title, location, img: i, len })
      .returning("*")
      .execute()
      .catch((err) => next(new Exception(err.message, 504)));

    if (createNews) res.redirect("/news/news");
  }

  // ! create addition news --------------------
  public async createAdditionNews(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { desc } = req.body;
    const { link }: any = req.files;
    const { id }: any = req.params;

    // ! for get generate file name for save to database
    let i;

    // ! add image to images folder
    link.mv(
      path.join(
        process.cwd(),
        "src",
        "images",
        (i = Date.now().toString() + path.extname(link.name))
      ),
      (err: any) => {
        if (err) next(new Exception(err.message, 500));
      }
    );

    // ! save database
    const createAdditionNews = await dataSource
      .createQueryBuilder()
      .insert()
      .into(AdditionNews)
      .values({ desc, link: i, news: id })
      .returning("*")
      .execute()
      .catch((err) => next(new Exception(err.message, 504)));

    if (createAdditionNews) res.redirect("/news/news");
  }

  // ! update ----------------------
  public async UpdateNews(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;
    const { title, location, len } = req.body;

    // ! for get generate file name for save to database
    let f;

    const img: any = req.files?.img;

    // ! get data one by id
    const oneNews = await dataSource
      .getRepository(News)
      .findOneBy({ id: id })
      .catch((err) => next(new Exception(err.message, 504)));

    // ! change image if it come
    if (img) {
      await del(String(oneNews?.img)).catch((err) =>
        next(new Exception(err.message, 500))
      );

      img.mv(
        path.join(
          process.cwd(),
          "src",
          "images",
          (f = Date.now().toString() + path.extname(img.name))
        ),
        (err: any) => {
          if (err) next(new Exception(err.message, 500));
        }
      );
    }

    // ! change data if it come

    const t = title ? title : oneNews?.title;
    const i = img ? f : oneNews?.img;
    const l = location ? location : oneNews?.location;

    // ! save database
    const updateNews = await dataSource
      .createQueryBuilder()
      .update(News)
      .set({ title: t, img: i, location: l, len })
      .where({ id })
      .returning("*")
      .execute()
      .catch((err) => next(new Exception(err.message, 504)));

    if (updateNews) res.redirect("/news/news");
  }

  // ! update addition news -------------------- ----------------------
  public async UpdateAdditonNews(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;
    const { desc } = req.body;

    // ! for get generate file name for save to database
    let f;

    const link: any = req.files?.link;

    // ! get data one by id
    const oneNews = await dataSource
      .getRepository(AdditionNews)
      .findOneBy({ id: id })
      .catch((err) => next(new Exception(err.message, 504)));

    // ! change image if it come
    if (link) {
      await del(String(oneNews?.link)).catch((err) =>
        next(new Exception(err.message, 500))
      );

      link.mv(
        path.join(
          process.cwd(),
          "src",
          "images",
          (f = Date.now().toString() + path.extname(link.name))
        ),
        (err: any) => {
          if (err) next(new Exception(err.message, 500));
        }
      );
    }

    // ! change data if it come

    const d = desc ? desc : oneNews?.desc;
    const l = link ? f : oneNews?.link;

    // ! save database
    const updateNews = await dataSource
      .createQueryBuilder()
      .update(AdditionNews)
      .set({ desc: d, link: l })
      .where({ id })
      .returning("*")
      .execute()
      .catch((err) => next(new Exception(err.message, 504)));

    if (updateNews) res.redirect(`/news/news`);
  }

  // ! delete --------------
  public async DelNews(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;

    // ! get data one by id
    const oneNews = await dataSource
      .getRepository(News)
      .findOneBy({ id: id })
      .catch((err) => next(new Exception(err.message, 504)));

    if (!oneNews) {
      return next(new Exception("This news not fount", 400));
    }

    const delnews = await dataSource
      .createQueryBuilder()
      .delete()
      .from(News)
      .where("news_id = :id", { id: id })
      .returning("*")
      .execute()
      .catch((err) => next(new Exception(err.message, 504)));

    if (delnews) {
      await del(String(oneNews?.img)).catch((err) =>
        next(new Exception(err.message, 500))
      );
    }

    if (delnews) res.redirect("/news/news");
  }

  // ! delete addition news --------------
  public async DelAdditionNews(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = req.params;

    // ! get data one by id
    const oneNews = await dataSource
      .getRepository(AdditionNews)
      .findOneBy({ id: id })
      .catch((err) => next(new Exception(err.message, 504)));

      if (!oneNews) {
        return next(new Exception("This news not fount", 400));
      }

    const delnews = await dataSource
      .createQueryBuilder()
      .delete()
      .from(AdditionNews)
      .where("addition_news_id = :id", { id: id })
      .returning("*")
      .execute()
      .catch((err) => next(new Exception(err.message, 504)));

    if (delnews) {
      await del(String(oneNews?.link)).catch((err) =>
        next(new Exception(err.message, 500))
      );
    }

    if (delnews) res.redirect("/news/news");
  }
}

export default new admin();