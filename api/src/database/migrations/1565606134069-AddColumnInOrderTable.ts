import {MigrationInterface, QueryRunner} from 'typeorm';

export class AddColumnInOrderTable1565606134069 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
       await queryRunner.query('ALTER TABLE `product` CHANGE `price` `price` decimal(10,2) DEFAULT NULL');
       await queryRunner.query('ALTER TABLE `country` CHANGE `country_id` `country_id` INT(11)AUTO_INCREMENT ');
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn('order', 'currency_symbol_left');
        await queryRunner.dropColumn('order', 'currency_symbol_right');
    }

}
