/*
 * spurtcommerce API
 * version 3.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import {Service} from 'typedi';
import {OrmRepository} from 'typeorm-typedi-extensions';
import {Logger, LoggerInterface} from '../../decorators/Logger';
import {Like, Not, In,MoreThan  } from 'typeorm/index';
import {OrderRepository} from '../repositories/OrderRepository';

@Service()
export class OrderService {

    constructor(@OrmRepository() private orderRepository: OrderRepository,
                @Logger(__filename) private log: LoggerInterface) {
    }

    // create order
    public async create(order: any): Promise<any> {
        this.log.info('Create a new order ');
        return this.orderRepository.save(order);
    }

    // order count
    public find(order: any): Promise<any> {
        return this.orderRepository.find(order);
    }

    // order count
    public findAll(): Promise<any> {
        console.log('TOTAL order -------------------------------------------- ');
        //console.log(this.orderRepository.findAll(vendor));

        // const condition: any = {};
        // condition.where = {};
        // condition.where['vendor'] = vendor;
          
        //return this.orderRepository.find(condition);
        return this.orderRepository.find();
    }

    // order count
    public findAll_vendor(vendor:number): Promise<any> {
        //console.log('TOTAL order -------------------------------------------- ');
        //console.log(this.orderRepository.findAll(vendor));

        const condition: any = {};
        condition.where = {};
        condition.where['vendor'] = vendor;
       
          
        return this.orderRepository.find(condition);
        //return this.orderRepository.find();
    }

    public findAll_vendor_clear(vendor:number): Promise<any> {
        //console.log('TOTAL order -------------------------------------------- ');
        //console.log(this.orderRepository.findAll(vendor));

        const condition: any = {};
        condition.where = {};
        condition.where['vendor'] = vendor;
        condition.where['clear'] = 0;
          
        return this.orderRepository.find(condition);
        //return this.orderRepository.find();
    }

    // findOne Condition
    public findOne(whereCondition: any): Promise<any> {
        this.log.info('Find Order Detail');
        const condition: any = {};
        if (whereCondition && whereCondition.length > 0) {
            condition.where = whereCondition[0];
            condition.relations = whereCondition[1].relation;
        } else {
            condition.orderId = whereCondition;
        }
        return this.orderRepository.findOne(condition);
    }

    // update order
    public update(id: any, order: any): Promise<any> {
        order.oderId = id;
        return this.orderRepository.save(order);
    }

    // order List
    public list(limit: number, offset: number, select: any = [], search: any = [], whereConditions: any = [], relation: any = [], count: number | boolean): Promise<any> {
        const condition: any = {};

        if (select && select.length > 0) {
            condition.select = select;
        }

        condition.where = {};

        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item: any) => {
                condition.where[item.name] = item.value;
            });
        }

        if (search && search.length > 0) {
            search.forEach((table: any) => {
                const operator: string = table.op;
                if (operator === 'where' && table.value !== undefined) {
                    condition.where[table.name] = table.value;
                } else if (operator === 'like' && table.value !== undefined) {
                    condition.where[table.name] = Like('%' + table.value + '%');
                }
            });
        }

        if (relation && relation.length > 0) {
            condition.relations = relation;
        }

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }

        condition.order = {
            createdDate: 'DESC',
        };

        if (count) {
            return this.orderRepository.count(condition);
        } else {
            return this.orderRepository.find(condition);
        }
    }

    public list_vendor_only(limit: number, offset: number, select: any = [], search: any = [],search_or:any=[], whereConditions: any = [], relation: any = [], count: number | boolean,vendor:number): Promise<any> {
        const condition: any = {};

        if (select && select.length > 0) {
            condition.select = select;
        }

        //condition.where = [{orderStatusId:Not(6)},{orderStatusId:Not(5)}];
        condition.where = {};

       
        if(vendor > 0){

      
             condition.where['vendor'] = vendor;
            condition.where['type'] = In([0,1]);
           
             // condition.where['orderStatusId'] = Not(6);
            //condition.where['orderStatusId'] != 5;
            
           console.log(vendor);
           
            //condition.where = 'order_status_id != 6';
            //condition.where = ' order_status_id <> 5 ';
           
        }

        condition.where['orderStatusId'] = Not(In([5,6]));

     
       //condition.where={orderStatusId:Not(In([5,6]))};

        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item: any) => {
                console.log(item.name+' - '+item.value);
                
                condition.where[item.name] = item.value;
            });
        }

        
        // console.log('--------------------------------- service ');
        // if (search_or && search_or.length > 0) {
        //     search_or.forEach((table: any) => {
        //         console.log('--------------------------------- item -------'+table);
        //         const operator: string = table.op;
        //         if (operator === 'where' && table.value !== undefined) {
        //             console.log('--------------------------------- Where -------'+table.value);
        //             condition.where[table.name] = table.value;
        //             console.log(condition);
        //         } else if (operator === 'or' && table.value !== undefined) {
        //             console.log('--------------------------------- Where or -------'+table.value);
        //             condition.Where[table.name] = Like('%' + table.value + '%');
        //             console.log(condition);
        //         }
        //     });
           

        // }

      
        

        if (search && search.length > 0) {
            search.forEach((table: any) => {
                const operator: string = table.op;
                if (operator === 'where' && table.value !== undefined) {
                    condition.where[table.name] = table.value;
                } else if (operator === 'like' && table.value !== undefined) {
                    condition.where[table.name] = Like('%' + table.value + '%');
                }else if (operator === 'or' && table.value !== undefined) {
                    condition.orWhere[table.name] = Like('%' + table.value + '%');
                }
            });
        }

        if (relation && relation.length > 0) {
            condition.relations = relation;
        }

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }

        condition.order = {
            createdDate: 'DESC',
        };
        console.log('---------------------------------------------------------------------------------------------------');
        
        console.log(condition);
        
        console.log('---------------------------------------------------------------------------------------------------');

        if (count) {
            return this.orderRepository.count(condition);
        } else {
            return this.orderRepository.find(condition);
        }

        
    }

    public list_vendor(limit: number, offset: number, select: any = [], search: any = [],search_or:any=[], whereConditions: any = [], relation: any = [], count: number | boolean,vendor:number): Promise<any> {
        const condition: any = {};

        if (select && select.length > 0) {
            condition.select = select;
        }

        condition.where = {};
        if(vendor > 0){
            condition.where['vendor'] = vendor;
           
        }


        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item: any) => {
                condition.where[item.name] = item.value;
            });
        }

        
        // console.log('--------------------------------- service ');
        // if (search_or && search_or.length > 0) {
        //     search_or.forEach((table: any) => {
        //         console.log('--------------------------------- item -------'+table);
        //         const operator: string = table.op;
        //         if (operator === 'where' && table.value !== undefined) {
        //             console.log('--------------------------------- Where -------'+table.value);
        //             condition.where[table.name] = table.value;
        //             console.log(condition);
        //         } else if (operator === 'or' && table.value !== undefined) {
        //             console.log('--------------------------------- Where or -------'+table.value);
        //             condition.Where[table.name] = Like('%' + table.value + '%');
        //             console.log(condition);
        //         }
        //     });
           

        // }

      
        

        if (search && search.length > 0) {
            search.forEach((table: any) => {
                const operator: string = table.op;
                if (operator === 'where' && table.value !== undefined) {
                    condition.where[table.name] = table.value;
                } else if (operator === 'like' && table.value !== undefined) {
                    condition.where[table.name] = Like('%' + table.value + '%');
                }else if (operator === 'or' && table.value !== undefined) {
                    condition.orWhere[table.name] = Like('%' + table.value + '%');
                }
            });
        }

        if (relation && relation.length > 0) {
            condition.relations = relation;
        }

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }

        condition.order = {
            createdDate: 'DESC',
        };

        if (count) {
            return this.orderRepository.count(condition);
        } else {
            return this.orderRepository.find(condition);
        }
    }


    public list_vendor_report( select: any = [],date_start:string,date_end:string,vendor:number): Promise<any> {
        const condition: any = {};

        if (select && select.length > 0) {
            condition.select = select;
        }

        condition.where = {};
       
       // condition.where['vendor'] = vendor;

        condition.where['created_date'] = MoreThan(date_start) ;
      //  condition.where['created_date'] = LessThan(date_end) ;


        condition.order = {
            createdDate: 'DESC',
        };

       
     
        return this.orderRepository.ticket_report(vendor,date_start,date_end);
      
    }

    // findOne order
    public findOrder(order: any): Promise<any> {
        return this.orderRepository.findOne(order);
    }

    // delete order
    public async delete(id: number): Promise<any> {
        return await this.orderRepository.delete(id);
    }

    // sales list
    public async salesList(): Promise<any> {
        return await this.orderRepository.salesList();
    }

     // sales list
     public async salesList_vendor(vendor:number): Promise<any> {
        return await this.orderRepository.salesList_vendor(vendor);
    }

    // find today orders
    public async findAlltodayOrder(todaydate: string): Promise<any> {
        return await this.orderRepository.findAllTodayOrder(todaydate);
    }

    public async findAlltodayOrder_vendor(todaydate: string,vendor:number): Promise<any> {
        return await this.orderRepository.findAllTodayOrder_vendor(todaydate,vendor);
    }

    // find today orders count
    public async findAllTodayOrderCount(todaydate: string): Promise<any> {
        return await this.orderRepository.findAllTodayOrderCount(todaydate);
    }

    public async findAllTodayOrderCount_vendor(todaydate: string,vendor:number): Promise<any> {
        return await this.orderRepository.findAllTodayOrderCount_vendor(todaydate,vendor);
    }
}
