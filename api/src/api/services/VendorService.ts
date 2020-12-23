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
import { Vendor } from '../models/Vendor';
import { VendorRepository } from '../repositories/VendorRepository';
import {Like} from 'typeorm';

@Service()
export class VendorService {

    constructor(
        @OrmRepository() private vendorRepository: VendorRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    // find Role
    public findOne(findCondition: any): Promise<any> {
        this.log.info('Find role');
        return this.vendorRepository.findOne(findCondition);
    }
    // Role list
    public list(limit: any, offset: any, select: any= [], relation: any = [], whereConditions: any = [],keyword: string , count: number | boolean): Promise<any> {
        const condition: any = {};

        if (select && select.length > 0) {
            condition.select = select;
        }
        condition.where = {};

        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((table: any) => {
                const operator: string = table.op;
                if (operator === 'where' && table.value !== undefined) {
                    condition.where[table.name] = table.value;
                } else if (operator === 'like' && table.value !== undefined) {
                    condition.where[table.name] = Like('%' + table.value + '%');
                }
            });
        }

        if (keyword) {
            condition.where = {
                firstName: Like('%' + keyword + '%'),
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
    public async create(vendor: Vendor): Promise<Vendor> {
        const newVendor = await this.vendorRepository.save(vendor);
        return newVendor;
    }

    // update role
    public update(id: any, vendor: Vendor): Promise<Vendor> {
        this.log.info('Update a role');
        vendor.vendor_id = id;
        return this.vendorRepository.save(vendor);
    }

    // delete role
    public async delete(id: number): Promise<any> {
        this.log.info('Delete a role');
        const deleteUser = await this.vendorRepository.delete(id);
        return deleteUser;
    }

    public vendor_by_id( select: any = [], whereConditions: any = []): Promise<any> {
       
        const condition: any = {};

        if (select && select.length > 0) {
            condition.select = select;
        }


        condition.where = [];
        //condition.where['vendor_id'] = whereConditions;

        if(whereConditions.length > 1){

            whereConditions.forEach((item: any) => {
                //condition.where['vendor_id'] = item.value;
                condition.where.push({'vendor_id':item});
                console.log('vendor_id'+item );
            });

        }else{
            condition.where.push({'vendor_id': whereConditions});
        }
      
           
        
        console.log(condition.where);
     

        condition.order = {
            createdDate: 'DESC',
        };
        
        return this.vendorRepository.find(condition);
        

    }
}
