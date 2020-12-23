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
const StockStatus_1 = require("../models/StockStatus");
let StockStatusRepository = class StockStatusRepository extends typeorm_1.Repository {
};
StockStatusRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(StockStatus_1.StockStatus)
], StockStatusRepository);
exports.StockStatusRepository = StockStatusRepository;
//# sourceMappingURL=StockStatusRepository.js.map