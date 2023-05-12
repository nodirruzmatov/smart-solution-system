import { DataSource } from "typeorm";
import path from "path";
import dotenv from 'dotenv'

dotenv.config()

export default new DataSource({
  type: "postgres",
  url: process.env.DATBASE_URL,
  entities: [path.join(__dirname, "..", "entities", "*.{ts,js}")],
  migrations: [path.join(__dirname, "..", "migrations", "*.{ts,js}")],
  logging: true,
  synchronize: false,
})

