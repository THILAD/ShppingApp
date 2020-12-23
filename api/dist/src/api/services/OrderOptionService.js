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
const OrderOptionRepository_1 = require("../repositories/OrderOptionRepository");
let OrderOptionService = class OrderOptionService {
    constructor(orderOptionRepository, log) {
        this.orderOptionRepository = orderOptionRepository;
        this.log = log;
    }
    // create a product option data
    create(OrderOptionData) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.log.info('create order option data');
            return this.orderOptionRepository.save(OrderOptionData);
        });
    }
    // findone product option a data
    findOne(id) {
        this.log.info('Find a order option data');
        return this.orderOptionRepository.findOne(id);
    }
    // find product option a data
    find(option) {
        this.log.info('Find a order option data');
        return this.orderOptionRepository.find(option);
    }
};
OrderOptionService = tslib_1.__decorate([
    typedi_1.Service(),
    tslib_1.__param(0, typeorm_typedi_extensions_1.OrmRepository()),
    tslib_1.__param(1, Logger_1.Logger(__filename)),
    tslib_1.__metadata("design:paramtypes", [OrderOptionRepository_1.OrderOptionRepository, Object])
], OrderOptionService);
exports.OrderOptionService = OrderOptionService;
//# sourceMappingURL=OrderOptionService.js.map