import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: 'services'
})
export class Services {

  @PrimaryGeneratedColumn('uuid', {
    name: 'service_id'
  })
  id: string

  @Column({
    type: "varchar",
    length: 32,
    nullable: false,
    name: 'service_title'
  })
  title: string

  @Column({
    type: "varchar",
    nullable: false,
    name: 'service_desc'
  })
  desc: string

  @Column({
    type: "varchar",
    nullable: false,
    name: 'service_img'
  })
  img: string

  @Column({
    type: 'varchar',
    nullable: false,
    name: 'service_len'
  })
  len: string
}