import { PrimaryGeneratedColumn, Entity, Column } from "typeorm";

@Entity({
  name: 'admin'
})
export class Admin {

  @PrimaryGeneratedColumn('uuid', {
    name: 'admin_id'
  })
  id: string

  @Column({
    type: "varchar",
    length: 32,
    nullable: false,
    name: 'admin_login'
  })
  login: string

  @Column({
    type: 'varchar',
    length: 32,
    nullable: false,
    name: 'admin_password'
  })
  password: string

}