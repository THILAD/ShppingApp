/*
 * spurtcommerce API
 * version 3.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import * as express from 'express';
import jwt from 'jsonwebtoken';
import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';

import { User } from '../api/models/User';
import { UserRepository } from '../api/repositories/UserRepository';
import { UserVendorRepository } from '../api/repositories/UserVendorRepository';
import { CustomerRepository } from '../api/repositories/CustomerRepository';
import { Logger, LoggerInterface } from '../decorators/Logger';
import { User_Vendor } from 'src/api/models/User_Vendor';

@Service()
export class AuthService {

    constructor(
        @Logger(__filename) private log: LoggerInterface,
        @OrmRepository() private userRepository: UserRepository,
        @OrmRepository() private userVendorRepository: UserVendorRepository,
        @OrmRepository() private customerRepository: CustomerRepository
    ) { }

    public async parseBasicAuthFromRequest(req: express.Request): Promise<any> {

        const authorization = req.header('authorization');

        console.log('header authorization');
        console.log(authorization);

        if (authorization) {
            console.log(authorization);
            console.log(authorization.split(' ')[0]);

            if (authorization && authorization.split(' ')[0] === 'Bearer') {
                console.log('Credentials provided by the client');
                this.log.info('Credentials provided by the client');
                if (!authorization) {
                    return undefined;
                }
                console.log(authorization.split(' ')[1]);

                const User = await this.decryptToken(authorization.split(' ')[1]);
                console.log('I m here');
                console.log(User);
                return User;
                console.log('I m here');
            }

            this.log.info('No credentials provided by the client');
        }else{
            this.log.info('Authorization is empty');
        }

        return undefined;
    }

    public async decryptToken(encryptString: string): Promise<any> {
        return new Promise<any>((subresolve, subreject) => {
            jwt.verify(encryptString, '123##$$)(***&', (err, decoded) => {
                if (err) {
                    console.log(err);
                    return subresolve(undefined);
                }
                console.log(decoded);
                return subresolve(decoded);
            });
        });
    }
    public async existUser(username:string): Promise<User> {
        console.log('username' + username);
        const user = await this.userRepository.findOne({
            where: {
                username,
            },
        });
        console.log(user);

        if (user) {
            return user;
        }

        return undefined;
    }
    public async validateUser(userId: number): Promise<User> {
        console.log('userId' + userId);
        const user = await this.userRepository.findOne({
            where: {
                userId,
            },
        });
        console.log(user);

        if (user) {
            return user;
        }

        return undefined;
    }
    public async validateUserVendor(userId: number): Promise<User_Vendor> {
        console.log('userId' + userId);
        const user = await this.userVendorRepository.findOne({
            where: {
                vendor_id:userId,
            },
        });
        console.log(user);

        if (user) {
            return user;
        }

        return undefined;
    }

    public async validateCustomer(userId: number): Promise<any> {
        console.log('customerId' + userId);
        const customer = await this.customerRepository.findOne({
            where: {
                id: userId,
            },
        });
        console.log(customer);

        if (customer) {
            return customer;
        }

        return undefined;
    }

}
