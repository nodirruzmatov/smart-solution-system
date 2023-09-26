import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  Entity,
  UpdateDateColumn,
} from "typeorm";

@Entity({
  name: "views",
})
export class View {
  @PrimaryGeneratedColumn("uuid", {
    name: "views_id",
  })
  id: string;

  @Column({
    type: "integer",
    nullable: false,
    name: "views_number",
  })
  number: number;

  @CreateDateColumn({
    type: "timestamptz",
  })
  createAt: string;

  @UpdateDateColumn({
    type: "timestamptz",
  })
  updateAt: string;
}
