import { PrimaryGeneratedColumn, CreateDateColumn, Column, Entity } from "typeorm";

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
    length: 62,
    nullable: false,
    name: 'user_name'
  })
  name: string

  @Column({
    type: "varchar",
    length: 128,
    nullable: false,
    name: 'user_mail'
  })
  mail: string

  @Column({
    type: "varchar",
    length: 32,
    nullable: false,
    name: 'user_title'
  })
  title: string

  @Column({
    type: 'text',
    nullable: false,
    name: 'user_desc'
  })
  desc: string

  @CreateDateColumn({
    type: 'timestamptz'
  })
  createAt: string
}