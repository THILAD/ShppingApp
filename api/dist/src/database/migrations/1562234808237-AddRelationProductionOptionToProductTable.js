"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddRelationProductionOptionToProductTable1562234808237 {
    constructor() {
        this.ProductOptionToProductForeignKeys = new typeorm_1.TableForeignKey({
            name: 'fk_tbl_product_option_tbl_product',
            columnNames: ['product_id'],
            referencedColumnNames: ['product_id'],
            referencedTableName: 'product',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('product_option');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('product_id') !== -1);
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(table, this.ProductOptionToProductForeignKeys);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('product_option');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('product_id') !== -1);
            if (ifDataExsist) {
                yield queryRunner.dropForeignKey(table, this.ProductOptionToProductForeignKeys);
            }
        });
    }
}
exports.AddRelationProductionOptionToProductTable1562234808237 = AddRelationProductionOptionToProductTable1562234808237;
//# sourceMappingURL=1562234808237-AddRelationProductionOptionToProductTable.js.map