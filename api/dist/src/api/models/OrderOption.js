"use strict";
/*
 * spurtcommerce API
 * version 3.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const index_1 = require("typeorm/index");
const BaseModel_1 = require("./BaseModel");
let OrderOption = class OrderOption extends BaseModel_1.BaseModel {
};
tslib_1.__decorate([
    index_1.PrimaryGeneratedColumn({ name: 'order_option_id' }),
    tslib_1.__metadata("design:type", Number)
], OrderOption.prototype, "orderOptionId", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'order_id' }),
    tslib_1.__metadata("design:type", Number)
], OrderOption.prototype, "orderId", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'order_product_id' }),
    tslib_1.__metadata("design:type", Number)
], OrderOption.prototype, "orderProductId", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'product_option_id' }),
    tslib_1.__metadata("design:type", Number)
], OrderOption.prototype, "productOptionId", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'product_option_value_id' }),
    tslib_1.__metadata("design:type", Number)
], OrderOption.prototype, "productOptionValueId", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'name' }),
    tslib_1.__metadata("design:type", String)
], OrderOption.prototype, "name", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'value' }),
    tslib_1.__metadata("design:type", String)
], OrderOption.prototype, "value", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'type' }),
    tslib_1.__metadata("design:type", String)
], OrderOption.prototype, "type", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], OrderOption.prototype, "isActive", void 0);
OrderOption = tslib_1.__decorate([
    typeorm_1.Entity('order_option')
], OrderOption);
exports.OrderOption = OrderOption;
//# sourceMappingURL=OrderOption.js.map