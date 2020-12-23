/*
 * spurtcommerce API
 * version 3.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import { Order } from '../models/Order';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order>  {

    public async salesList(): Promise<any> {

        const query: any = await this.manager.createQueryBuilder(Order, 'order');
        query.select(['COUNT(order_id) as ordercount', 'MONTH(created_date) as month', 'YEAR(created_date) as year']);
      
        query.groupBy('month');
        query.addGroupBy('year');
        query.orderBy('year', 'ASC');
        query.addOrderBy('month', 'ASC');
        query.limit('12');
        console.log(query.getQuery());
        return query.getRawMany();
    }

    public async salesList_vendor(vendor:number): Promise<any> {

        const query: any = await this.manager.createQueryBuilder(Order, 'order');
        query.select(['COUNT(order_id) as ordercount', 'MONTH(created_date) as month', 'YEAR(created_date) as year']);
        query.where('vendor = :vendor',{vendor});
        query.groupBy('month');
        query.addGroupBy('year');
        query.orderBy('year', 'ASC');
        query.addOrderBy('month', 'ASC');
        query.limit('12');
        console.log(query.getQuery());
        return query.getRawMany();
    }

    public async findAllTodayOrder(todaydate: string): Promise<any> {

        const query: any = await this.manager.createQueryBuilder(Order, 'order');
        query.select([  'order.total as total']);
        query.where('DATE(order.createdDate) = :todaydate', {todaydate});
        console.log(query.getQuery());
        return query.getRawMany();
    }

    public async findAllTodayOrder_vendor(todaydate: string,vendor:number): Promise<any> {

        const query: any = await this.manager.createQueryBuilder(Order, 'order');
        query.select([  'order.total as total']);
       // query.where('vendor = :vendor',{vendor});
        query.where('DATE(order.createdDate) = :todaydate And vendor = :vendor', {todaydate,vendor});
        console.log(query.getQuery());
        return query.getRawMany();
    }

    public async findAllTodayOrderCount(todaydate: string): Promise<any> {

        const query: any = await this.manager.createQueryBuilder(Order, 'order');
        query.select([  'COUNT(order.orderId) as orderCount']);
        query.where('DATE(order.createdDate) = :todaydate', {todaydate});
        console.log(query.getQuery());
        return query.getRawOne();
    }

    public async findAllTodayOrderCount_vendor(todaydate: string,vendor:number): Promise<any> {

        const query: any = await this.manager.createQueryBuilder(Order, 'order');
        query.select([  'COUNT(order.orderId) as orderCount']);
        query.where('DATE(order.createdDate) = :todaydate And vendor = :vendor', {todaydate,vendor});
        console.log(query.getQuery());
        return query.getRawOne();
    }

    public async findAllvendor(vendor:number): Promise<any> {

        const query: any = await this.manager.createQueryBuilder(Order, 'order');
        query.select([  'COUNT(order.orderId) as orderCount']);
        query.where('vendor = :vendor',{vendor});
        console.log(query.getQuery());
        return query.getRawOne();
    }

    public async list_customer_vendor(vendor:number): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(Order, 'Order');
        query.select('customer_id as customerId');
        if(vendor > 0){
            query.where('`vendor`= :vendor',{vendor});  
        }
        query.groupBy('customerId');
       
       
        return query.getRawMany();
    }


    
    public async ticket_report(vendor:number,date_start:string,date_end:string): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(Order, 'Order');
        query.select('*');
        if(vendor > 0){
            query.where('`vendor`= :vendor',{vendor}); 
            query.andWhere("created_date BETWEEN '"+date_start+"' AND '"+date_end+"'"); 
        }
        query.orderBy("created_date", "ASC");
       
       
        return query.getRawMany();
    }

}
