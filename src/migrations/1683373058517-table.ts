import { MigrationInterface, QueryRunner } from "typeorm";

export class Table1683373058517 implements MigrationInterface {
    name = 'Table1683373058517'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "employees" ("employee_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "employee_name" character varying(32) NOT NULL, "employee_job" character varying(32) NOT NULL, "employee__desc" character varying(512) NOT NULL, "employee__telegram" character varying(64) NOT NULL, "employee__mail" character varying(128) NOT NULL, "employee__insta" character varying(64) NOT NULL, "employee__phone" character varying(32) NOT NULL, "employee__img" character varying NOT NULL, CONSTRAINT "PK_c9a09b8e6588fb4d3c9051c8937" PRIMARY KEY ("employee_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "employees"`);
    }

}
