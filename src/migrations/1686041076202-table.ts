import { MigrationInterface, QueryRunner } from "typeorm";

export class Table1686041076202 implements MigrationInterface {
    name = 'Table1686041076202'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "product_video" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "product_video"`);
    }

}
