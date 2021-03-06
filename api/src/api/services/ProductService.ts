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
import {Product} from '../models/Product';
import {ProductRepository} from '../repositories/ProductRepository';
// import {AdsService} from '../services/AdsService';
import {Like} from 'typeorm';
import { Container } from 'typedi';
import { AuthService } from '../../../src/auth/AuthService';

@Service()
export class ProductService {
    
    public authService = Container.get<AuthService>(AuthService);
    constructor(@OrmRepository() private productRepository: ProductRepository,
    // private adsService:AdsService,
                @Logger(__filename) private log: LoggerInterface) {
    }

    // find product
    public find(product: any): Promise<any> {
        return this.productRepository.find(product);
    }

    public findminimun(product: any): Promise<any> {
        return this.productRepository.find(product);
    }

    // find one product
    public async findOne(findCondition: any): Promise<any> {
        return await this.productRepository.findOne(findCondition);
    }

    // product list
    public list(limit: number, offset: number, select: any = [], relation: any = [], whereConditions: any = [], search: any = [], price: number, count: number | boolean ): Promise<any> {
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
        // if (whereConditions && whereConditions.length > 0) {
        //     whereConditions.forEach((table: any) => {
        //         const operator: string = table.op;
        //         if (operator === 'where' && table.value !== '') {
        //             condition.where(table.name + ' = ' + table.value);
        //         } else if (operator === 'and' && table.value !== '') {
        //             condition.andWhere(table.name + ' LIKE ' + "\'%" + table.value + "%\'");
        //         } else if (operator === 'or' && table.value !== '') {
        //             condition.orWhere(table.name + ' LIKE ' + "\'%" + table.value + "%\'");
        //         } else if (operator === 'andWhere' && table.value !== undefined && table.value !== '') {
        //             condition.andWhere(table.name + ' = ' + table.value);
        //         }

        //     });
        // }

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
            return this.productRepository.count(condition);
        }
        return this.productRepository.find(condition);
    }

    public list_vendor(limit: number, offset: number, select: any = [], relation: any = [], whereConditions: any = [], search: any = [], price: number, count: number | boolean ,vendor=0): Promise<any> {
        const condition: any = {};

        if (select && select.length > 0) {
            condition.select = select;
        }

        if (relation && relation.length > 0) {
            condition.relations = relation;
        }

        condition.where = {};
        if(vendor > 0){
            condition.where['vendor'] = vendor;
        }
        

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
            console.log('count');
            return this.productRepository.count(condition);
            
        }
        console.log('data');
        return this.productRepository.find(condition);
    }

    public list_item_minimum_vendor(limit: number, offset: number, select: any = [], relation: any = [], whereConditions: any = [], search: any = [], price: number, count: number | boolean ,vendor:Number ,minimum:number): Promise<any> {
        const condition: any = {};

        if (select && select.length > 0) {
            condition.select = select;
        }

        if (relation && relation.length > 0) {
            condition.relations = relation;
        }

        condition.where = {};
        if(vendor > 0){
            condition.where['vendor'] = vendor;
        }
        console.log('------------------------------- vendor -----------------------');
        console.log(vendor);
        

        //condition.where['quantity'] = {$lt:18};
        //condition.where['quantity'] = LessThan(minimum);
        condition.where="quantity < minimum_quantity AND vendor = "+vendor;

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
            return this.productRepository.count(condition);
        }
        return this.productRepository.find(condition);
    }

    public report_stock(select: any = [],vendor:Number ): Promise<any> {
        const condition: any = {};

        if (select && select.length > 0) {
            condition.select = select;
        }


        condition.where = {};
        if(vendor > 0){
            condition.where['vendor'] = vendor;
        }
        console.log('------------------------------- vendor -----------------------');
        console.log(vendor);
        

        //condition.where['quantity'] = {$lt:18};
        //condition.where['quantity'] = LessThan(minimum);
        condition.where=" vendor = "+vendor;

       

    
      
        return this.productRepository.find(condition);
    }

    // create product
    public async create(product: Product): Promise<Product> {
        const newProduct = await this.productRepository.save(product);
        return newProduct;
    }

    // update product
    public async update(id: any, product: Product ): Promise<Product> {
        this.log.info('Update a product');
        product.productId = id;
        return this.productRepository.save(product);
    }

    // delete product
    public async delete(id: number): Promise<any> {
        this.log.info('Delete a product');
        const newProduct = await this.productRepository.delete(id);
        return newProduct;
    }

    // product list
    public async productList(limit: number, offset: number, select: any = [], searchConditions: any = [], whereConditions: any = [], categoryId: any = [], priceFrom: string, priceTo: string, price: number, count: number | boolean): Promise<any> {
        return await this.productRepository.productList(limit, offset, select, searchConditions, whereConditions, categoryId, priceFrom, priceTo, price, count);
    }

    public async productList_bycategory(select: any = [], searchConditions: any = [], whereConditions: any = [], categoryId: any = [], count: number | boolean,vendor:number): Promise<any> {
        return await this.productRepository.productList_bycategory(select, searchConditions, whereConditions, categoryId, count,vendor);
    }

    public async productListLatest(limit: number, offset: number,count:number): Promise<any> {
        return await this.productRepository.productListLatest(limit, offset, count);
    }

    // Recent selling product
    public async recentProductSelling(limit: number): Promise<any> {
        return await this.productRepository.recentProductSelling(limit);
    }

     // Recent selling product
     public async recentProductSelling_vendor(limit: number,vendor:number): Promise<any> {
        return await this.productRepository.recentProductSelling_vendor(limit,vendor);
    }

    // Maximum Product price
    public async productMaxPrice(maximum: any): Promise<any> {
        return await this.productRepository.productMaxPrice(maximum);
    }

     // product list
     public async customProductList(limit: number, offset: number, categoryId: any = [], manufacturerId: number, condition: number, keyword: string, priceFrom: string, priceTo: string, price: string): Promise<Product[]> {
        return await this.productRepository.customProductList(limit, offset, categoryId, manufacturerId, condition, keyword, priceFrom, priceTo, price);
    }

    public async categoryProductList(limit: number, offset: number, categoryId: any = [], manufacturerId: number, condition: number, keyword: string, priceFrom: string, priceTo: string, price: string,vendor:number): Promise<Product[]> {
        return await this.productRepository.categoryProductList(limit, offset, categoryId, manufacturerId, condition, keyword, priceFrom, priceTo, price,vendor);
    }

     // Product count
     public async productCount(keyword: string, manufacturerId: number, categoryId: number, priceFrom: number, priceTo: number): Promise<any> {
        return await this.productRepository.productCount(keyword, manufacturerId, categoryId, priceFrom, priceTo);
    }

    public async adsRegisterProductList(limit: number, offset: number, code: string ): Promise<any> {
        return await this.productRepository.adsProductList(limit, offset, code);
    }
}
