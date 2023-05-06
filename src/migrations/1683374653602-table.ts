import { MigrationInterface, QueryRunner } from "typeorm";

export class Table1683374653602 implements MigrationInterface {
    name = 'Table1683374653602'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "news" ("_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "news_title" character varying(64) NOT NULL, "news_desc" character varying(512) NOT NULL, "news_location" character varying(32) NOT NULL, "news_img" character varying NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_dfc450f7c4061978577e1c5ff6a" PRIMARY KEY ("_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "news"`);
    }

}
