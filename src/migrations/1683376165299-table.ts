import { MigrationInterface, QueryRunner } from "typeorm";

export class Table1683376165299 implements MigrationInterface {
    name = 'Table1683376165299'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cases" ("case_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "case_title" character varying(32) NOT NULL, "case_link" text NOT NULL, CONSTRAINT "PK_b8dcf802997909e8a6c413bf8d6" PRIMARY KEY ("case_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "cases"`);
    }

}
