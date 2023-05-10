import { MigrationInterface, QueryRunner } from "typeorm";

export class Table1683605635748 implements MigrationInterface {
    name = 'Table1683605635748'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news" ADD "news_len" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "news_len"`);
    }

}
