"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
class AddColumnInOrderTable1565606134069 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('ALTER TABLE `product` CHANGE `price` `price` decimal(10,2) DEFAULT NULL');
            yield queryRunner.query('ALTER TABLE `country` CHANGE `country_id` `country_id` INT(11)AUTO_INCREMENT ');
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropColumn('order', 'currency_symbol_left');
            yield queryRunner.dropColumn('order', 'currency_symbol_right');
        });
    }
}
exports.AddColumnInOrderTable1565606134069 = AddColumnInOrderTable1565606134069;
//# sourceMappingURL=1565606134069-AddColumnInOrderTable.js.map