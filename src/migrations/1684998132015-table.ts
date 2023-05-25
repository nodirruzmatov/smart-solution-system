import { MigrationInterface, QueryRunner } from "typeorm";

export class Table1684998132015 implements MigrationInterface {
    name = 'Table1684998132015'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cases" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cases" DROP COLUMN "createAt"`);
    }

}
