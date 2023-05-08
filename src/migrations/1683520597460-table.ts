import { MigrationInterface, QueryRunner } from "typeorm";

export class Table1683520597460 implements MigrationInterface {
    name = 'Table1683520597460'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "admin" ("admin_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "admin_login" character varying(32) NOT NULL, "admin_password" character varying(32) NOT NULL, CONSTRAINT "PK_08603203f2c50664bda27b1ff89" PRIMARY KEY ("admin_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "admin"`);
    }

}
