import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Products } from "./products";

@Entity({
  name: 'pImages'
})
export class PImages {

  @PrimaryGeneratedColumn('uuid', {
    name: 'pImage_id'
  })
  id: string

  @Column({
    type: "varchar",
    nullable: false,
    name: 'pImage_link'
  })
  link: string

  @ManyToOne(() => Products, (products) => products.pImages, {
    onDelete: "CASCADE",
    onUpdate: "NO ACTION",
    cascade: true,
  })
  product: Products
}