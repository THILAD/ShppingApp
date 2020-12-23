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
const Vendor_1 = require("../models/Vendor");
let VendorRepository = class VendorRepository extends typeorm_1.Repository {
};
VendorRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(Vendor_1.Vendor)
], VendorRepository);
exports.VendorRepository = VendorRepository;
//# sourceMappingURL=VendorRepository.js.map