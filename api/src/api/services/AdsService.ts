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
import { Ads } from '../models/AdsModel';
import { AdsRepository } from '../repositories/AdsRepository';

// import { Ads } from '../models/Ads';
// import { AdsRepository } from '../repositories/AdsRepository';
import { Like } from 'typeorm';

@Service()
export class AdsService {

    constructor(@OrmRepository() private adsRepository: AdsRepository,
    // private AdsRepository:AdsRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    // find Ads
    public find(adsRegister: any): Promise<any> {
        return this.adsRepository.find(adsRegister);
    }

    // find one Ads
    public async findOne(findCondition: any): Promise<Ads> {
        return await this.adsRepository.findOne(findCondition);
    }

    // Ads list
    public list(limit: number, offset: number, select: any = [], relation: any = [], whereConditions: any = [], search: any = [], count: number | boolean): Promise<any> {
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



        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }

        console.log(condition);
        if (count) {
            return this.adsRepository.count(condition);
        }
        return this.adsRepository.find(condition);
    }


    // create Ads
    public async create(adsRegister: Ads): Promise<Ads> {
        const newAds = await this.adsRepository.save(adsRegister);
        return newAds;
    }

    // update Ads
    public update(ads: Ads): Promise<Ads> {
        this.log.info('Update a Ads');
        return this.adsRepository.save(ads);
    }

    // delete Ads
    public async delete(id: number): Promise<any> {
        this.log.info('Delete a Ads');
        const newAds = await this.adsRepository.delete(id);
        return newAds;
    }

    // adsregister list
    // need vendor list
    public async adsList(limit: number, offset: number, select: any = [], searchConditions: any = []): Promise<any> {
        return await this.adsRepository.adsList(limit, offset, select, searchConditions);
    }
    public async adsByName(limit: number, offset: number, name:string): Promise<any> {
        return await this.adsRepository.adsByName(limit, offset,name);
    }
    




}
