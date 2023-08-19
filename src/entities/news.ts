import { PrimaryGeneratedColumn, CreateDateColumn, Column, Entity, OneToMany, } from 'typeorm'
import { AdditionNews } from './news.image.desc'


@Entity({
  name: 'news'
})
export class News {

  @PrimaryGeneratedColumn('uuid', {
    name: 'news_id'
  })
  id: string

  @Column({
    type: 'varchar',
    length: 64,
    nullable: false,
    name: 'news_title'
  })
  title: string

  @Column({
    type: 'varchar',
    length: 32,
    nullable: false,
    name: 'news_location'
  })
  location: string

  @Column({
    type: 'varchar',
    nullable: false,
    name: 'news_img'
  })
  img: string

  @Column({
    type: 'varchar',
    nullable: false,
    name: 'news_len'
  })
  len: string

  @CreateDateColumn({
    type: 'timestamptz'
  })
  createAt: string


  @OneToMany(() => AdditionNews, (additionNews) => additionNews.news)
  addition_news: AdditionNews[]
}