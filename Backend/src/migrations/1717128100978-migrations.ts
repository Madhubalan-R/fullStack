import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1717128100978 implements MigrationInterface {
    name = 'Migrations1717128100978'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "book_details" ("ID" SERIAL NOT NULL, "bookname" character varying NOT NULL, CONSTRAINT "PK_c2a22a7ddf119898730bac1ad13" PRIMARY KEY ("ID"))`);
        await queryRunner.query(`CREATE TABLE "user_book" ("UBID" SERIAL NOT NULL, "startdate" character varying NOT NULL, "enddate" character varying NOT NULL, "usernameID" integer, "booknameID" integer, CONSTRAINT "PK_fdfe121d168b935a3f53d986404" PRIMARY KEY ("UBID"))`);
        await queryRunner.query(`CREATE TABLE "user_details" ("ID" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL DEFAULT 'user', CONSTRAINT "PK_ab3b155a79242ccc06c1607e793" PRIMARY KEY ("ID"))`);
        await queryRunner.query(`ALTER TABLE "user_book" ADD CONSTRAINT "FK_5512c44fe6663e8f1a94e01138d" FOREIGN KEY ("usernameID") REFERENCES "user_details"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_book" ADD CONSTRAINT "FK_4077a975d25c90310520de0b90f" FOREIGN KEY ("booknameID") REFERENCES "book_details"("ID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_book" DROP CONSTRAINT "FK_4077a975d25c90310520de0b90f"`);
        await queryRunner.query(`ALTER TABLE "user_book" DROP CONSTRAINT "FK_5512c44fe6663e8f1a94e01138d"`);
        await queryRunner.query(`DROP TABLE "user_details"`);
        await queryRunner.query(`DROP TABLE "user_book"`);
        await queryRunner.query(`DROP TABLE "book_details"`);
    }

}
