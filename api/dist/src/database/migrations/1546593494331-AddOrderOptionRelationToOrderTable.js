"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class AddOrderOptionRelationToOrderTable1546593494331 {
    constructor() {
        this.tableForeignKey = new typeorm_1.TableForeignKey({
            name: 'fk_order_option_order1',
            columnNames: ['order_id'],
            referencedColumnNames: ['order_id'],
            referencedTableName: 'order',
            onDelete: 'CASCADE',
        });
    }
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('order_option');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('order_id') !== -1);
            if (!ifDataExsist) {
                yield queryRunner.createForeignKey(table, this.tableForeignKey);
            }
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const table = yield queryRunner.getTable('order_option');
            const ifDataExsist = table.foreignKeys.find(fk => fk.columnNames.indexOf('order_id') !== -1);
            if (ifDataExsist) {
                yield queryRunner.dropForeignKey(table, this.tableForeignKey);
            }
        });
    }
}
exports.AddOrderOptionRelationToOrderTable1546593494331 = AddOrderOptionRelationToOrderTable1546593494331;
//# sourceMappingURL=1546593494331-AddOrderOptionRelationToOrderTable.js.map