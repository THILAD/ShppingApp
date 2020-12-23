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
require("reflect-metadata");
const class_validator_1 = require("class-validator");
class CreateUserVendor {
}
tslib_1.__decorate([
    class_validator_1.IsNotEmpty({
        message: 'vender id is required',
    }),
    tslib_1.__metadata("design:type", Number)
], CreateUserVendor.prototype, "vendor_id", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty({
        message: 'email is required',
    }),
    class_validator_1.IsEmail({}, {
        message: 'email is not email format',
    }),
    tslib_1.__metadata("design:type", String)
], CreateUserVendor.prototype, "email", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty({
        message: 'username is required',
    }),
    tslib_1.__metadata("design:type", String)
], CreateUserVendor.prototype, "username", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty({
        message: 'password is required',
    }),
    tslib_1.__metadata("design:type", String)
], CreateUserVendor.prototype, "password", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty({
        message: 'permission is required',
    }),
    tslib_1.__metadata("design:type", String)
], CreateUserVendor.prototype, "permission", void 0);
exports.CreateUserVendor = CreateUserVendor;
//# sourceMappingURL=CreateUserVendorRequest.js.map