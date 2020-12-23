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
const User_Vendor_1 = require("../models/User_Vendor");
let UserVendorRepository = class UserVendorRepository extends typeorm_1.Repository {
};
UserVendorRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(User_Vendor_1.User_Vendor)
], UserVendorRepository);
exports.UserVendorRepository = UserVendorRepository;
//# sourceMappingURL=UserVendorRepository.js.map