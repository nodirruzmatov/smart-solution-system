import { DataSource } from "typeorm";
import path from "path";
import dotenv from 'dotenv'

dotenv.config()

export default new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "nodir",
  database: "smart",
  entities: [path.join(__dirname, "..", "entities", "*.{ts,js}")],
  migrations: [path.join(__dirname, "..", "migrations", "*.{ts,js}")],
  logging: true,
  synchronize: false,
})