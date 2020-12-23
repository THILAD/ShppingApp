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
import { AdsRegister } from '../models/AdsRegisterModel';
import { AdsRegisterRepository } from '../repositories/AdsRegisterRepository';
// import { Product } from '../models/Product';
import { ProductService } from '../services/ProductService';


import { Like } from 'typeorm';

@Service()
export class AdsRegisterService {

    constructor(@OrmRepository() private adsRegisterRepository: AdsRegisterRepository,
   private productService:ProductService,
        @Logger(__filename) private log: LoggerInterface) {
    }

    // find product
    public find(adsRegister: any): Promise<any> {
        return this.adsRegisterRepository.find(adsRegister);
    }

    // find one product
    public async findOne(findCondition: any): Promise<any> {
        return await this.adsRegisterRepository.findOne(findCondition);
    }

    // product list
    public list(limit: number, offset: number, select: any = [], relation: any = [], whereConditions: any = [], search: any = [], price: number, count: number | boolean): Promise<any> {
        const condition: any = {};

        if (select && select.length > 0) {
            condition.select = select;
        }

        if (relation && relation.length > 0) {
            condition.relations = relation;
        }

        condition.where = {};
        // if(vendor > 0){
        //     condition.where['vendor'] = vendor;
        // }


        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item: any) => {
                const operator: string = item.op;
                if (operator === 'where' && item.value !== '') {
                    condition.where[item.name] = item.value;
                } else if (operator === 'like' && item.value !== '') {
                    condition.where[item.name] = Like('%' + item.value + '%');
                }
            });
        }

        if (search && search.length > 0) {
            search.forEach((item: any) => {
                const operator: string = item.op;
                if (operator === 'like' && item.value !== '') {
                    condition.where[item.name] = Like('%' + item.value + '%');
                }
            });
        }

        if (price && price === 1) {
            condition.order = {
                price: 'ASC',
                createdDate: 'DESC',
            };
        } else if (price && price === 2) {
            condition.order = {
                price: 'DESC',
                createdDate: 'DESC',
            };
        } else {
            condition.order = {
                createdDate: 'DESC',
            };
        }

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }

        console.log(condition);
        if (count) {
            return this.adsRegisterRepository.count(condition);
        }
        return this.adsRegisterRepository.find(condition);
    }


    // create product
    public async create(adsRegister: AdsRegister): Promise<AdsRegister> {
        const newProduct = await this.adsRegisterRepository.save(adsRegister);
        return newProduct;
    }

    // update product
    public update( adsRegister: AdsRegister): Promise<AdsRegister> {
        this.log.info('Update a product');
        // adsRegister.vendorId = vendorId;
        // adsRegister.adsId = adsId;
        return this.adsRegisterRepository.save(adsRegister);
    }

    // delete product
    public async delete(id: number): Promise<any> {
        this.log.info('Delete a product');
        const newProduct = await this.adsRegisterRepository.delete(id);
        return newProduct;
    }

    // adsregister list
    // need vendor list
    public async adsRegisterList(limit: number, offset: number, select: any = [], searchConditions: any = [], vendorId: number, adsId: number): Promise<any> {
        return await this.adsRegisterRepository.adsRegisterList(limit, offset, select, searchConditions, vendorId, adsId);
    }
    public async adsRegisterProductList(limit: number, offset: number, code: string ): Promise<any> {
        return await this.productService.adsRegisterProductList(limit, offset, code);
    }


    




}
