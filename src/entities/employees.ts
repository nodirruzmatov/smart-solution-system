import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm'

@Entity({
  name: 'employees'
})
export class Users {
  @PrimaryGeneratedColumn('uuid', {
    name: 'employee_id'
  })
  id: string

  @Column({
    type: 'varchar',
    length: 32,
    nullable: false,
    name: "employee_name"
  })
  name: string

  @Column({
    type: 'varchar',
    length: 32,
    nullable: false,
    name: "employee_job"
  })
  job: string

  @Column({
    type: 'varchar',
    length: 512,
    nullable: false,
    name: 'employee__desc'
  })
  desc: string

  @Column({
    type: 'varchar',
    length: 64,
    nullable: false,
    name: 'employee__telegram'
  })
  telegram: string

  @Column({
    type: 'varchar',
    length: 128,
    nullable: false,
    name: 'employee__mail'
  })
  mail: string

  @Column({
    type: 'varchar',
    length: 64,
    nullable: false,
    name: 'employee__insta'
  })
  insta: string

  @Column({
    type: 'varchar',
    length: 32,
    nullable: false,
    name: 'employee__phone'
  })
  phone: string

  @Column({
    type: 'varchar',
    nullable: false,
    name: 'employee__img'
  })
  img: string

  @Column({
    type: 'varchar',
    nullable: false,
    name: 'employee_len'
  })
  len: string
}