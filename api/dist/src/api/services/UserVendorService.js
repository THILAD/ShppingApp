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
const UserVendorRepository_1 = require("../repositories/UserVendorRepository");
const typeorm_1 = require("typeorm");
let UserVendorService = class UserVendorService {
    constructor(userVendorLoginRepository, log) {
        this.userVendorLoginRepository = userVendorLoginRepository;
        this.log = log;
    }
    // find user
    findOne(findCondition) {
        this.log.info('Find all users');
        return this.userVendorLoginRepository.findOne(findCondition);
    }
    // user list
    list(limit = 0, offset = 0, select = [], relation = [], whereConditions = [], keyword, count) {
        console.log(keyword);
        const condition = {};
        if (select && select.length > 0) {
            condition.select = select;
        }
        if (relation && relation.length > 0) {
            condition.relations = relation;
        }
        condition.where = {};
        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item) => {
                condition.where[item.name] = item.value;
            });
        }
        if (keyword) {
            condition.where = {
                firstName: typeorm_1.Like('%' + keyword + '%'),
            };
        }
        condition.order = {
            createdDate: 'DESC',
        };
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.userVendorLoginRepository.count(condition);
        }
        else {
            return this.userVendorLoginRepository.find(condition);
        }
    }
    // create user
    create(user_vendor) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Create a new user vendor => ', user_vendor.toString());
            const newUser = yield this.userVendorLoginRepository.save(user_vendor);
            return newUser;
        });
    }
    // update user
    update(id, user_vendor) {
        this.log.info('Update a user');
        user_vendor.user_vendor_id = id;
        return this.userVendorLoginRepository.save(user_vendor);
    }
    // delete user
    delete(id) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('Delete a user');
            const newUser = yield this.userVendorLoginRepository.delete(id);
            return newUser;
        });
    }
    // find user
    findAll(findCondition) {
        this.log.info('Find all users');
        return this.userVendorLoginRepository.find(findCondition);
    }
};
UserVendorService = tslib_1.__decorate([
    typedi_1.Service(),
    tslib_1.__param(0, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(1, Logger_1.Logger(__filename)),
    tslib_1.__metadata("design:paramtypes", [UserVendorRepository_1.UserVendorRepository, Object])
], UserVendorService);
exports.UserVendorService = UserVendorService;
//# sourceMappingURL=UserVendorService.js.map