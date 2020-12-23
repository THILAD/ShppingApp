/*
 * spurtcommerce API
 * version 3.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import { OrderProduct } from '../models/OrderProduct';

@EntityRepository(OrderProduct)
export class OrderProductRepository extends Repository<OrderProduct>  {

    public async List(limit: number): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(OrderProduct, 'orderProduct');
        query.select(['DISTINCT product_id as productId', 'order_id as orderId', 'name as ProductName', 'quantity as Quantity', 'total as Total', ' created_date as CreatedDate']);
        query.groupBy('productId');
        query.orderBy('created_date', 'DESC');
        query.limit(limit);
        return query.getRawMany();
    }

    public async List_vendor(limit: number,vendor:number): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(OrderProduct, 'orderProduct');
        query.select(['DISTINCT product_id as productId', 'order_id as orderId', 'name as ProductName', 'quantity as Quantity', 'total as Total', ' created_date as CreatedDate']);
        if(vendor > 0){
            query.where('order_id in (SELECT `order_id` FROM `order` WHERE `vendor`='+vendor+')');  
        }
        query.groupBy('productId');
        query.orderBy('created_date', 'DESC');
        query.limit(limit);
        return query.getRawMany();
    }

    public async report_order(vendor:number,date_start:string,date_end,ticket_type:string): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(OrderProduct, 'orderProduct');
        query.select(['DISTINCT product_id as productId', 'order_id as orderId', 'name as ProductName', 'sum(quantity) as Quantity','product_price as Price', '(sum(quantity) * product_price) as Total', ' created_date as CreatedDate']);
       
     
        
        if(vendor > 0){
            query.where('order_id in (SELECT `order_id` FROM `order` WHERE `vendor`='+vendor+' AND `type` in ('+ticket_type+') )');  
            query.andWhere("created_date BETWEEN '"+date_start+"' AND '"+date_end+"'"); 
        }
        query.groupBy('productId','ProductName');
        query.orderBy('created_date', 'ASC');
        return query.getRawMany();
    }


}
