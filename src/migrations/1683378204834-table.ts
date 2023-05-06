import { MigrationInterface, QueryRunner } from "typeorm";

export class Table1683378204834 implements MigrationInterface {
    name = 'Table1683378204834'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pImages" ("pImage_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "pImage_link" character varying NOT NULL, "productId" uuid, CONSTRAINT "PK_77502aa636710f3a1e9ad3b8e92" PRIMARY KEY ("pImage_id"))`);
        await queryRunner.query(`ALTER TABLE "pImages" ADD CONSTRAINT "FK_6ecd9ff6b9888c958e8cfc2b9da" FOREIGN KEY ("productId") REFERENCES "products"("product_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pImages" DROP CONSTRAINT "FK_6ecd9ff6b9888c958e8cfc2b9da"`);
        await queryRunner.query(`DROP TABLE "pImages"`);
    }

}
