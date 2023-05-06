import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm'

@Entity({
  name: 'users'
})
export class Users {
  @PrimaryGeneratedColumn('uuid', {
    name: 'user_id'
  })
  id: string

  @Column({
    type: 'varchar',
    length: 32,
    nullable: false,
    name: "user_name"
  })
  name: string

  @Column({
    type: 'varchar',
    length: 32,
    nullable: false,
    name: "user_job"
  })
  job: string

  @Column({
    type: 'varchar',
    length: 32,
    nullable: false,
    name: 'user_desc'
  })
  desc: string

  @Column({
    type: 'varchar',
    length: 64,
    nullable: false,
    name: 'user_telegram'
  })
  telegram: string

  @Column({
    type: 'varchar',
    length: 128,
    nullable: false,
    name: 'user_mail'
  })
  mail: string

  @Column({
    type: 'varchar',
    length: 64,
    nullable: false,
    name: 'user_insta'
  })
  insta: string

  @Column({
    type: 'varchar',
    length: 32,
    nullable: false,
    name: 'user_phone'
  })
  phone: string
}