import { PrimaryGeneratedColumn, CreateDateColumn, Column, Entity, } from 'typeorm'


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
    nullable: false,
    name: 'news_desc'
  })
  desc: string

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

}