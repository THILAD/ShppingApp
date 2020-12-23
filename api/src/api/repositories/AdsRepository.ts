/*
 * spurtcommerce API
 * version 3.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import { Ads } from '../models/AdsModel';

@EntityRepository(Ads)
export class AdsRepository extends Repository<Ads> {

    public async adsList(limit: number, offset: number, select: any = [], searchConditions: any = []): Promise<any> {
        console.log(select);
        const query: any = await this.manager.createQueryBuilder(Ads, 'ads');
        // Select
        if (select && select.length > 0) {
            query.select(select);
        }

        // Keyword Search
        if (searchConditions && searchConditions.length > 0) {
            searchConditions.forEach((table: any) => {
                const operator: string = table.op;
                if (operator === 'where' && table.value !== '') {
                    query.where(table.name + ' = ' + table.value);
                } else if (operator === 'and' && table.value !== '') {
                    query.andWhere(table.name + ' LIKE ' + "\'%" + table.value + "%\'");
                } else if (operator === 'or' && table.value !== '') {
                    query.orWhere(table.name + ' LIKE ' + "\'%" + table.value + "%\'");
                } else if (operator === 'andWhere' && table.value !== undefined && table.value !== '') {
                    query.andWhere(table.name + ' = ' + table.value);
                }

            });
        }

        // Limit & Offset
        if (limit && limit > 0) {
            query.limit(limit);
            query.offset(offset);
        }

        return query.getMany();
    }
    public async adsByName(limit: number, offset: number, adsName: string): Promise<any> {
       
        const query: any = await this.manager.createQueryBuilder(Ads, 'ads');
        
        if (adsName) {
            query.where('adsName = "' + adsName+'"');
        }
        query.andWhere('isActive = 1');
        // Limit & Offset
        if (limit && limit > 0) {
            query.limit(limit);
            query.offset(offset);
        }

        return query.getMany();
    }
    public async adsById(limit: number, offset: number,  adsId: number): Promise<any> {
        // console.log(select);
        const query: any = await this.manager.createQueryBuilder(Ads, 'ads');
      
        if (adsId) {
            query.andWhere('adsId = ' + adsId);
        }
        // Limit & Offset
        if (limit && limit > 0) {
            query.limit(limit);
            query.offset(offset);
        }

        return query.getMany();
    }

}
