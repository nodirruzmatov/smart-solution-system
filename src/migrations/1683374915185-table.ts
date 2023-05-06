import { MigrationInterface, QueryRunner } from "typeorm";

export class Table1683374915185 implements MigrationInterface {
    name = 'Table1683374915185'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news" RENAME COLUMN "_id" TO "news_id"`);
        await queryRunner.query(`ALTER TABLE "news" RENAME CONSTRAINT "PK_dfc450f7c4061978577e1c5ff6a" TO "PK_313a1b4b0d8af7de07bfb46b6cb"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "news" RENAME CONSTRAINT "PK_313a1b4b0d8af7de07bfb46b6cb" TO "PK_dfc450f7c4061978577e1c5ff6a"`);
        await queryRunner.query(`ALTER TABLE "news" RENAME COLUMN "news_id" TO "_id"`);
    }

}
