import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PImages } from './pimages'

@Entity({
  name: 'products'
})
export class Products {

  @PrimaryGeneratedColumn('uuid', {
    name: 'product_id'
  })
  id: string

  @Column({
    type: "varchar",
    length: 32,
    nullable: false,
    name: 'product_name'
  })
  name: string

  @Column({
    type: "varchar",
    length: 512,
    nullable: false,
    name: 'product_desc'
  })
  desc: string

  @Column({
    type: 'varchar',
    nullable: false,
    name: 'product_len'
  })
  len: string

  @OneToMany(() => PImages, (pImages) => pImages.product)
  pImages: PImages[]
}