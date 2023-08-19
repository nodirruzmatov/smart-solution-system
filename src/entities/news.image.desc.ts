import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { News } from "./news";

@Entity({
  name: "addition_news",
})
export class AdditionNews {
  @PrimaryGeneratedColumn("uuid", {
    name: "addition_news_id",
  })
  id: string;

  @Column({
    type: "varchar",
    nullable: false,
    name: "addition_news_desc",
  })
  desc: string;

  @Column({
    type: "varchar",
    nullable: false,
    name: "addition_news_img",
  })
  link: string;

  @ManyToOne(() => News, (news) => news.addition_news, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
    cascade: true,
  })
  news: News;

  @CreateDateColumn({
    type: "timestamptz",
  })
  createAt: string;
}
