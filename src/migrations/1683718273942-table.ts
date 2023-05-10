import { MigrationInterface, QueryRunner } from "typeorm";

export class Table1683718273942 implements MigrationInterface {
    name = 'Table1683718273942'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employees" ADD "employee_len" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD "product_len" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "services" ADD "service_len" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "service_len"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "product_len"`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "employee_len"`);
    }

}
