import { MigrationInterface, QueryRunner } from "typeorm";

export class Table1685947459754 implements MigrationInterface {
    name = 'Table1685947459754'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "products_status" character varying`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "employee__desc"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "employee__desc" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "product_desc"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "product_desc" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "news_desc"`);
        await queryRunner.query(`ALTER TABLE "news" ADD "news_desc" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "service_desc"`);
        await queryRunner.query(`ALTER TABLE "services" ADD "service_desc" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "service_desc"`);
        await queryRunner.query(`ALTER TABLE "services" ADD "service_desc" character varying(512) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "news" DROP COLUMN "news_desc"`);
        await queryRunner.query(`ALTER TABLE "news" ADD "news_desc" character varying(512) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "product_desc"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "product_desc" character varying(512) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "employee__desc"`);
        await queryRunner.query(`ALTER TABLE "employees" ADD "employee__desc" character varying(512) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "products_status"`);
    }

}
