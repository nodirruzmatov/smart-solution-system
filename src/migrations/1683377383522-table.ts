import { MigrationInterface, QueryRunner } from "typeorm";

export class Table1683377383522 implements MigrationInterface {
    name = 'Table1683377383522'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("product_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "product_name" character varying(32) NOT NULL, "product_desc" character varying(512) NOT NULL, CONSTRAINT "PK_a8940a4bf3b90bd7ac15c8f4dd9" PRIMARY KEY ("product_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
