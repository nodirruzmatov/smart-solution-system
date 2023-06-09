import { PrimaryGeneratedColumn, Column, Entity, CreateDateColumn, } from "typeorm";


@Entity({
  name: 'cases'
})
export class Cases {

  @PrimaryGeneratedColumn('uuid', {
    name: 'case_id'
  })
  id: string

  @Column({
    type: "varchar",
    length: 32,
    nullable: false,
    name: 'case_title'
  })
  title: string

  @Column({
    type: 'text',
    nullable: false,
    name: 'case_link'
  })
  link: string

  @Column({
    type: 'varchar',
    nullable: false,
    name: 'case_len'
  })
  len: string

  @CreateDateColumn({
    type: 'timestamptz'
  })
  createAt: string
}