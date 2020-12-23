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
import { User_Vendor } from '../models/User_Vendor';
import { UserVendorRepository } from '../repositories/UserVendorRepository';
import {Like} from 'typeorm';

@Service()
export class UserVendorService {

    constructor(
        @OrmRepository() private userVendorLoginRepository: UserVendorRepository,
        @Logger(__filename) private log: LoggerInterface
    ) { }

    // find user
    public findOne(findCondition: any): Promise<any> {
        this.log.info('Find all users');
        return this.userVendorLoginRepository.findOne(findCondition);
    }

    

   

    // user list
    public list(limit: number = 0, offset: number = 0, select: any = [], relation: any = [], whereConditions: any = [], keyword: string, count: number | boolean): Promise<any> {
        console.log(keyword);
        const condition: any = {};

        if (select && select.length > 0) {
            condition.select = select;
        }

        if (relation && relation.length > 0) {
            condition.relations = relation;
        }

        condition.where = {};

        if (whereConditions && whereConditions.length > 0) {
            whereConditions.forEach((item: any) => {
                condition.where[item.name] = item.value;
            });
        }
        if (keyword) {
            condition.where = {
                firstName: Like('%' + keyword + '%'),
            };
        }

        condition.order = {
            createdDate: 'DESC',
        };

        if (limit && limit > 0) {
            condition.take = limit;
            condition.skip = offset;
        }

        if (count) {
            return this.userVendorLoginRepository.count(condition);
        } else {
            return this.userVendorLoginRepository.find(condition);
        }

    }

    // create user
    public async create(user_vendor: User_Vendor): Promise<User_Vendor> {
        this.log.info('Create a new user vendor => ', user_vendor.toString());
        const newUser = await this.userVendorLoginRepository.save(user_vendor);
        return newUser;
    }

    // update user
    public update(id: any, user_vendor: User_Vendor): Promise<User_Vendor> {
        this.log.info('Update a user');
        user_vendor.user_vendor_id = id;
        return this.userVendorLoginRepository.save(user_vendor);
    }

    // delete user
    public async delete(id: number): Promise<any> {
        this.log.info('Delete a user');
        const newUser = await this.userVendorLoginRepository.delete(id);
        return newUser;
    }

    // find user
    public findAll(findCondition: any): Promise<any> {
        this.log.info('Find all users');
        return this.userVendorLoginRepository.find(findCondition);
    }
}
