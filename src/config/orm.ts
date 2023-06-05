import { DataSource } from "typeorm";
import path from "path";
import dotenv from 'dotenv'

dotenv.config()

export default new DataSource({
  type: "postgres",
  url: process.env.url,
  // host: process.env.DATBASE_HOST,
  // port: 5432,
  // username: process.env.DATABASE_USER,
  // password: process.env.DATABASE_PASSWORD,
  // database: process.env.DATABASE_DATABASE,
  entities: [path.join(__dirname, "..", "entities", "*.{ts,js}")],
  migrations: [path.join(__dirname, "..", "migrations", "*.{ts,js}")],
  logging: true,
  synchronize: false,
})

