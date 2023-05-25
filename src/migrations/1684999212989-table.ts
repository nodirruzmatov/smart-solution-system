import { MigrationInterface, QueryRunner } from "typeorm";

export class Table1684999212989 implements MigrationInterface {
    name = 'Table1684999212989'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "createAt"`);
    }

}
