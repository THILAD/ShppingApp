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
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const User_Vendor_1 = require("./User_Vendor");
const BaseModel_1 = require("./BaseModel");
const moment = require("moment");
let Vendor = class Vendor extends BaseModel_1.BaseModel {
    createDetails() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
            this.createdBy = -1; // -1 system , -2 admin , -3 client...
        });
    }
    updateDetails() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
        });
    }
};
tslib_1.__decorate([
    typeorm_1.PrimaryGeneratedColumn({ name: 'vendor_id' }),
    class_validator_1.IsNotEmpty(),
    tslib_1.__metadata("design:type", Number)
], Vendor.prototype, "vendor_id", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: 'vendor_name' }),
    tslib_1.__metadata("design:type", String)
], Vendor.prototype, "vendor_name", void 0);
tslib_1.__decorate([
    class_transformer_1.Exclude(),
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: 'email' }),
    tslib_1.__metadata("design:type", String)
], Vendor.prototype, "email", void 0);
tslib_1.__decorate([
    class_transformer_1.Exclude(),
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: 'phone' }),
    tslib_1.__metadata("design:type", String)
], Vendor.prototype, "phone", void 0);
tslib_1.__decorate([
    class_transformer_1.Exclude(),
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: 'localtion' }),
    tslib_1.__metadata("design:type", String)
], Vendor.prototype, "localtion", void 0);
tslib_1.__decorate([
    class_transformer_1.Exclude(),
    class_validator_1.IsNotEmpty(),
    typeorm_1.Column({ name: 'is_active' }),
    tslib_1.__metadata("design:type", Number)
], Vendor.prototype, "isActive", void 0);
tslib_1.__decorate([
    class_transformer_1.Exclude(),
    typeorm_1.Column({ name: 'img' }),
    tslib_1.__metadata("design:type", String)
], Vendor.prototype, "img", void 0);
tslib_1.__decorate([
    class_transformer_1.Exclude(),
    typeorm_1.Column({ name: 'minimum' }),
    tslib_1.__metadata("design:type", String)
], Vendor.prototype, "minimum", void 0);
tslib_1.__decorate([
    class_transformer_1.Exclude(),
    typeorm_1.Column({ name: 'img_card' }),
    tslib_1.__metadata("design:type", String)
], Vendor.prototype, "img_card", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(type => User_Vendor_1.User_Vendor, user_vendor => user_vendor.vendor),
    tslib_1.__metadata("design:type", Array)
], Vendor.prototype, "user_vendor", void 0);
tslib_1.__decorate([
    typeorm_1.BeforeInsert(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], Vendor.prototype, "createDetails", null);
tslib_1.__decorate([
    typeorm_1.BeforeUpdate(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], Vendor.prototype, "updateDetails", null);
Vendor = tslib_1.__decorate([
    typeorm_1.Entity('vendor')
], Vendor);
exports.Vendor = Vendor;
//# sourceMappingURL=Vendor.js.map