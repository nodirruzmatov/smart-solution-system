import { MigrationInterface, QueryRunner } from "typeorm";

export class Table1683376863831 implements MigrationInterface {
    name = 'Table1683376863831'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "services" ("service_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "service_title" character varying(32) NOT NULL, "service_desc" character varying(512) NOT NULL, "service_img" character varying NOT NULL, CONSTRAINT "PK_ef0531b9789b488593690ab8d5d" PRIMARY KEY ("service_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "services"`);
    }

}
