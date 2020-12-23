/*
 * spurtcommerce API
 * version 3.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import { AdsRegister } from '../models/AdsRegisterModel';

@EntityRepository(AdsRegister)
export class AdsRegisterRepository extends Repository<AdsRegister> {

    public async adsRegisterList(limit: number, offset: number, select: any = [], searchConditions: any = [],
        vendor: number, adsRegisterId: number): Promise<any> {
        console.log(select);
        const query = await this.manager.createQueryBuilder(AdsRegister, 'adsregister');
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
        if (adsRegisterId) {
            query.andWhere('adsId = ' + adsRegisterId);
        }
        if (vendor) {
            query.andWhere('vendorId = ' + vendor);
        }

        // Limit & Offset
        if (limit && limit > 0) {
            query.limit(limit);
            query.offset(offset);
        }

        return query.getMany();
    }
    public async adsRegisterListByCode(limit: number, offset: number, code: string): Promise<any> {
        const query: any = await this.manager.createQueryBuilder(AdsRegister, 'adsregister');
        // Select

        if (code) {
            query.andWhere('codeName = ' + code);
        }
        // Limit & Offset
        if (limit && limit > 0) {
            query.limit(limit);
            query.offset(offset);
        }

        return query.getMany();
    }
}
