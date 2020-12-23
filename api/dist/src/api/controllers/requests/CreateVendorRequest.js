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
class CreateVendor {
}
tslib_1.__decorate([
    class_validator_1.IsNotEmpty({
        message: 'vender name is required',
    }),
    tslib_1.__metadata("design:type", String)
], CreateVendor.prototype, "vendor_name", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty({
        message: 'email is required',
    }),
    class_validator_1.IsEmail({}, {
        message: 'email is not email format',
    }),
    tslib_1.__metadata("design:type", String)
], CreateVendor.prototype, "email", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty({
        message: 'phone is required',
    }),
    tslib_1.__metadata("design:type", String)
], CreateVendor.prototype, "phone", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty({
        message: 'localtion is required',
    }),
    tslib_1.__metadata("design:type", String)
], CreateVendor.prototype, "localtion", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty({
        message: 'img is required',
    }),
    tslib_1.__metadata("design:type", Object)
], CreateVendor.prototype, "img", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty({
        message: 'img_card is required',
    }),
    tslib_1.__metadata("design:type", Object)
], CreateVendor.prototype, "img_card", void 0);
tslib_1.__decorate([
    class_validator_1.IsNotEmpty({
        message: 'password is required',
    }),
    tslib_1.__metadata("design:type", String)
], CreateVendor.prototype, "password", void 0);
exports.CreateVendor = CreateVendor;
//# sourceMappingURL=CreateVendorRequest.js.map