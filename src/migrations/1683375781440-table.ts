import { MigrationInterface, QueryRunner } from "typeorm";

export class Table1683375781440 implements MigrationInterface {
    name = 'Table1683375781440'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_name" character varying(62) NOT NULL, "user_mail" character varying(128) NOT NULL, "user_title" character varying(32) NOT NULL, "user_desc" text NOT NULL, "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_96aac72f1574b88752e9fb00089" PRIMARY KEY ("user_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
