import { MigrationInterface, QueryRunner } from "typeorm";

export class Table1683796055564 implements MigrationInterface {
    name = 'Table1683796055564'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pImages" DROP CONSTRAINT "FK_6ecd9ff6b9888c958e8cfc2b9da"`);
        await queryRunner.query(`ALTER TABLE "pImages" ADD CONSTRAINT "FK_6ecd9ff6b9888c958e8cfc2b9da" FOREIGN KEY ("productId") REFERENCES "products"("product_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pImages" DROP CONSTRAINT "FK_6ecd9ff6b9888c958e8cfc2b9da"`);
        await queryRunner.query(`ALTER TABLE "pImages" ADD CONSTRAINT "FK_6ecd9ff6b9888c958e8cfc2b9da" FOREIGN KEY ("productId") REFERENCES "products"("product_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
