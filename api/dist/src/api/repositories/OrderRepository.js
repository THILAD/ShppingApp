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
const Order_1 = require("../models/Order");
let OrderRepository = class OrderRepository extends typeorm_1.Repository {
    salesList() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(Order_1.Order, 'order');
            query.select(['COUNT(order_id) as ordercount', 'MONTH(created_date) as month', 'YEAR(created_date) as year']);
            query.groupBy('month');
            query.addGroupBy('year');
            query.orderBy('year', 'ASC');
            query.addOrderBy('month', 'ASC');
            query.limit('12');
            console.log(query.getQuery());
            return query.getRawMany();
        });
    }
    salesList_vendor(vendor) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(Order_1.Order, 'order');
            query.select(['COUNT(order_id) as ordercount', 'MONTH(created_date) as month', 'YEAR(created_date) as year']);
            query.where('vendor = :vendor', { vendor });
            query.groupBy('month');
            query.addGroupBy('year');
            query.orderBy('year', 'ASC');
            query.addOrderBy('month', 'ASC');
            query.limit('12');
            console.log(query.getQuery());
            return query.getRawMany();
        });
    }
    findAllTodayOrder(todaydate) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(Order_1.Order, 'order');
            query.select(['order.total as total']);
            query.where('DATE(order.createdDate) = :todaydate', { todaydate });
            console.log(query.getQuery());
            return query.getRawMany();
        });
    }
    findAllTodayOrder_vendor(todaydate, vendor) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(Order_1.Order, 'order');
            query.select(['order.total as total']);
            // query.where('vendor = :vendor',{vendor});
            query.where('DATE(order.createdDate) = :todaydate And vendor = :vendor', { todaydate, vendor });
            console.log(query.getQuery());
            return query.getRawMany();
        });
    }
    findAllTodayOrderCount(todaydate) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(Order_1.Order, 'order');
            query.select(['COUNT(order.orderId) as orderCount']);
            query.where('DATE(order.createdDate) = :todaydate', { todaydate });
            console.log(query.getQuery());
            return query.getRawOne();
        });
    }
    findAllTodayOrderCount_vendor(todaydate, vendor) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(Order_1.Order, 'order');
            query.select(['COUNT(order.orderId) as orderCount']);
            query.where('DATE(order.createdDate) = :todaydate And vendor = :vendor', { todaydate, vendor });
            console.log(query.getQuery());
            return query.getRawOne();
        });
    }
    findAllvendor(vendor) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(Order_1.Order, 'order');
            query.select(['COUNT(order.orderId) as orderCount']);
            query.where('vendor = :vendor', { vendor });
            console.log(query.getQuery());
            return query.getRawOne();
        });
    }
    list_customer_vendor(vendor) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const query = yield this.manager.createQueryBuilder(Order_1.Order, 'Order');
            query.select('customer_id as customerId');
            if (vendor > 0) {
                query.where('`vendor`= :vendor', { vendor });
            }
            query.groupBy('customerId');
            return query.getRawMany();
        });
    }
};
OrderRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(Order_1.Order)
], OrderRepository);
exports.OrderRepository = OrderRepository;
//# sourceMappingURL=OrderRepository.js.map