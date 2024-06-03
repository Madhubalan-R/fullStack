import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1717415621747 implements MigrationInterface {
    name = 'Migrations1717415621747'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_book" DROP CONSTRAINT "FK_4077a975d25c90310520de0b90f"`);
        await queryRunner.query(`ALTER TABLE "user_book" ADD CONSTRAINT "FK_4077a975d25c90310520de0b90f" FOREIGN KEY ("booknameID") REFERENCES "book_details"("ID") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_book" DROP CONSTRAINT "FK_4077a975d25c90310520de0b90f"`);
        await queryRunner.query(`ALTER TABLE "user_book" ADD CONSTRAINT "FK_4077a975d25c90310520de0b90f" FOREIGN KEY ("booknameID") REFERENCES "book_details"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
