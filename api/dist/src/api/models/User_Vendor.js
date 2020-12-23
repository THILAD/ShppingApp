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
const bcrypt = tslib_1.__importStar(require("bcrypt"));
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const Vendor_1 = require("./Vendor");
const BaseModel_1 = require("./BaseModel");
const moment_1 = tslib_1.__importDefault(require("moment"));
const AccessTokenModel_1 = require("./AccessTokenModel");
let User_Vendor = class User_Vendor extends BaseModel_1.BaseModel {
    static hashPassword(password) {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    return reject(err);
                }
                resolve(hash);
            });
        });
    }
    static comparePassword(user, password) {
        console.log(password);
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                resolve(res === true);
            });
        });
    }
    hashPassword() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            // this.password = await User.hashPassword(this.password);
            this.createdDate = moment_1.default().format('YYYY-MM-DD HH:mm:ss');
        });
    }
    updateDetails() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.modifiedDate = moment_1.default().format('YYYY-MM-DD HH:mm:ss');
        });
    }
};
tslib_1.__decorate([
    typeorm_1.PrimaryGeneratedColumn({ name: 'user_vendor_id' }),
    class_validator_1.IsNotEmpty(),
    tslib_1.__metadata("design:type", Number)
], User_Vendor.prototype, "user_vendor_id", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    class_transformer_1.Exclude(),
    typeorm_1.Column({ name: 'vendor_id' }),
    tslib_1.__metadata("design:type", Number)
], User_Vendor.prototype, "vendor_id", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'username' }),
    tslib_1.__metadata("design:type", String)
], User_Vendor.prototype, "username", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty(),
    class_transformer_1.Exclude(),
    typeorm_1.Column({ name: 'password' }),
    tslib_1.__metadata("design:type", String)
], User_Vendor.prototype, "password", void 0);
tslib_1.__decorate([
    typeorm_1.Column({ name: 'permission' }),
    tslib_1.__metadata("design:type", String)
], User_Vendor.prototype, "permission", void 0);
tslib_1.__decorate([
    class_validator_1.IsEmail(),
    typeorm_1.Column({ name: 'email' }),
    tslib_1.__metadata("design:type", String)
], User_Vendor.prototype, "email", void 0);
tslib_1.__decorate([
    typeorm_1.ManyToOne(type => Vendor_1.Vendor, vendor => vendor.user_vendor),
    typeorm_1.JoinColumn({ name: 'vendor_id' }),
    tslib_1.__metadata("design:type", Vendor_1.Vendor)
], User_Vendor.prototype, "vendor", void 0);
tslib_1.__decorate([
    typeorm_1.OneToMany(type => AccessTokenModel_1.AccessToken, accessToken => accessToken.user_vendor),
    tslib_1.__metadata("design:type", Array)
], User_Vendor.prototype, "accessToken", void 0);
tslib_1.__decorate([
    typeorm_1.BeforeInsert(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], User_Vendor.prototype, "hashPassword", null);
tslib_1.__decorate([
    typeorm_1.BeforeUpdate(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], User_Vendor.prototype, "updateDetails", null);
User_Vendor = tslib_1.__decorate([
    typeorm_1.Entity('user_vendor')
], User_Vendor);
exports.User_Vendor = User_Vendor;
//# sourceMappingURL=User_Vendor.js.map