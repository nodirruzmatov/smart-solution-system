import { MigrationInterface, QueryRunner } from "typeorm";

export class Table1683714373272 implements MigrationInterface {
    name = 'Table1683714373272'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cases" ADD "case_len" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cases" DROP COLUMN "case_len"`);
    }

}
