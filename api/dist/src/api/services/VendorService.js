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
const typedi_1 = require("typedi");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const Logger_1 = require("../../decorators/Logger");
const VendorRepository_1 = require("../repositories/VendorRepository");
const typeorm_1 = require("typeorm");
let VendorService = class VendorService {
    constructor(vendorRepository, log) {
        this.vendorRepository = vendorRepository;
        this.log = log;
    }
    // find Role
    findOne(findCondition) {
        this.log.info('Find role');
        return this.vendorRepository.findOne(findCondition);
    }
    // Role list
    list(limit, offset, select = [], relation = [], whereConditions = [], keyword, count) {
        const condition = {};
        if (select && select.length > 0) {
            condition.select = select;
        }
        condition.where = {};
        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((table) => {
                const operator = table.op;
                if (operator === 'where' && table.value !== undefined) {
                    condition.where[table.name] = table.value;
                }
                else if (operator === 'like' && table.value !== undefined) {
                    condition.where[table.name] = typeorm_1.Like('%' + table.value + '%');
                }
            });
        }
        if (keyword) {
            condition.where = {
                firstName: typeorm_1.Like('%' + keyword + '%'),
            };
        }
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        console.log(condition);
        if (count) {
            return this.vendorRepository.count(condition);
        }
        return this.vendorRepository.find(condition);
    }
    // create role
    create(vendor) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const newVendor = yield this.vendorRepository.save(vendor);
            return newVendor;
        });
    }
    // update role
    update(id, vendor) {
        this.log.info('Update a role');
        vendor.vendor_id = id;
        return this.vendorRepository.save(vendor);
    }
    // delete role
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a role');
            const deleteUser = yield this.vendorRepository.delete(id);
            return deleteUser;
        });
    }
    vendor_by_id(select = [], whereConditions = []) {
        const condition = {};
        if (select && select.length > 0) {
            condition.select = select;
        }
        condition.where = [];
        //condition.where['vendor_id'] = whereConditions;
        if (whereConditions.length > 1) {
            whereConditions.forEach((item) => {
                //condition.where['vendor_id'] = item.value;
                condition.where.push({ 'vendor_id': item });
                console.log('vendor_id' + item);
            });
        }
        else {
            condition.where.push({ 'vendor_id': whereConditions });
        }
        console.log(condition.where);
        condition.order = {
            createdDate: 'DESC',
        };
        return this.vendorRepository.find(condition);
    }
};
VendorService = tslib_1.__decorate([
    typedi_1.Service(),
    tslib_1.__param(0, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(1, Logger_1.Logger(__filename)),
    tslib_1.__metadata("design:paramtypes", [VendorRepository_1.VendorRepository, Object])
], VendorService);
exports.VendorService = VendorService;
//# sourceMappingURL=VendorService.js.map