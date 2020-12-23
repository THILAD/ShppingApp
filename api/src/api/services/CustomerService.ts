/*
 * spurtcommerce API
 * version 3.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Like } from 'typeorm/index';
import { CustomerRepository } from '../repositories/CustomerRepository';
import { OrderRepository } from '../repositories/OrderRepository';

@Service()
export class CustomerService {

    constructor(@OrmRepository() private customerRepository: CustomerRepository,
        @OrmRepository() private orderRepository: OrderRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    // create customer
    public async create(customer: any): Promise<any> {
        this.log.info('Create a new customer ');
        return this.customerRepository.save(customer);
    }

    // find Condition
    public findOne(customer: any): Promise<any> {
        return this.customerRepository.findOne(customer);
    }

    // update customer
    public update(id: any, customer: any): Promise<any> {
        customer.customerId = id;
        return this.customerRepository.save(customer);
    }


    public async customer_vendor(vendor: number): Promise<any> {

        return await this.orderRepository.list_customer_vendor(vendor);
    }

    // customer List
    public list(limit: any, offset: any, search: any = [], whereConditions: any = [], order: number, count: number | boolean): Promise<any> {
        const condition: any = {};

        condition.where = {};

        //const customer_id = this.customer_vendor(vendor);

        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item: any) => {
                condition.where[item.name] = item.value;
            });
        }

        if (search && search.length > 0) {
            search.forEach((table: any) => {
                const operator: string = table.op;
                if (operator === 'where' && table.value !== '') {
                    condition.where[table.name] = table.value;
                } else if (operator === 'like' && table.value !== '') {
                    condition.where[table.name] = Like('%' + table.value + '%');
                }
            });
        }

        if (order && order > 0) {
            condition.order = {
                createdDate: 'DESC',
            };
            condition.take = 5;

        }

        condition.order = {
            createdDate: 'DESC',
        };

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.customerRepository.count(condition);
        } else {
            return this.customerRepository.find(condition);
        }
    }

    public async list_vendor(limit: any, offset: any, search: any = [], whereConditions: any = [], order: number, count: number | boolean, vendor: number): Promise<any> {
        const condition: any = {};

        condition.where = [];

        const customer = await this.orderRepository.list_customer_vendor(vendor);
      
        console.log("customer");
        console.log(customer);

        if(customer[0]){

            customer.forEach((item: any) => {
                console.log("-------------------------------------");
                console.log("forloop");
                console.log("item.value");
                console.log(item.customerId);

                condition.where.push({'id':item.customerId});
            });

        }else{
            console.log("+++++++++++++++++++++++++++++++++");
            condition.where.push({'id':'-1'});
        }   

        
        console.log(condition);
        







        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item: any) => {
                condition.where[item.name] = item.value;
            });
        }

        if (search && search.length > 0) {
            search.forEach((table: any) => {
                const operator: string = table.op;
                if (operator === 'where' && table.value !== '') {
                    condition.where[table.name] = table.value;
                } else if (operator === 'like' && table.value !== '') {
                    condition.where[table.name] = Like('%' + table.value + '%');
                }
            });
        }

        if (order && order > 0) {
            condition.order = {
                createdDate: 'DESC',
            };
            condition.take = 5;

        }

        condition.order = {
            createdDate: 'DESC',
        };
        console.log(condition);
        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }
        if (count) {
            return this.customerRepository.count(condition);
        } else {
            return this.customerRepository.find(condition);
        }
    }
    // delete customer
    public async delete(id: number): Promise<any> {
        return await this.customerRepository.delete(id);
    }
    // today customer count
    public async todayCustomerCount(todaydate: string): Promise<any> {

        return await this.customerRepository.TodayCustomerCount(todaydate);

    }
}
