import express, { Application } from "express";
import dataSource from "./config/orm";
import cors from "cors"
import dotenv from "dotenv";
import { exceptionHandler } from "./middleware/exception";
import router from "./router";
import path from "path";
import cookieParser from "cookie-parser";

dotenv.config();

const app: Application = express();

const main = async (): Promise<void> => {

  try {
    app.use(cors())
    app.use(express.json());
    await dataSource.initialize();


    app.set('view engine', 'ejs')
    app.set('views', path.join(process.cwd(), 'src', 'view'))

    app.use('/assets', express.static(path.join(process.cwd(), 'src', 'assets')))

    app.use(express.urlencoded({ extended: true }))
    app.use(cookieParser())

    app.use(router);

    app.use(exceptionHandler);

  } catch (err: unknown) {
    console.log(err);

  } finally {
    app.listen(5656, (): void => console.log(5656))
  }

}

main()