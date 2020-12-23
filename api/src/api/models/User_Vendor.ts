/*
 * spurtcommerce API
 * version 3.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsEmail } from 'class-validator';
import {
    BeforeInsert, Column, Entity, ManyToOne, JoinColumn, BeforeUpdate, PrimaryGeneratedColumn,
    OneToMany
} from 'typeorm';

import { Vendor } from './Vendor';
import {BaseModel} from './BaseModel';
import moment from 'moment';
import {AccessToken} from './AccessTokenModel';

@Entity('user_vendor')
export class User_Vendor extends BaseModel {

    public static hashPassword(password: string): Promise<string> {
        return new Promise((resolve, reject) => {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    return reject(err);
                }
                resolve(hash);
            });
        });
    }

    public static comparePassword(user: User_Vendor, password: string): Promise<boolean> {
        console.log(password);
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                resolve(res === true);
            });
        });
    }

    
    @PrimaryGeneratedColumn({ name: 'user_vendor_id' })
    @IsNotEmpty()
    public user_vendor_id: number;

    @IsNotEmpty()
    @Exclude()
    @Column({ name: 'vendor_id' })
    public vendor_id: number;

    @Column({ name: 'username' })
    public username: string;

    @IsNotEmpty()
    @Exclude()
    @Column({ name: 'password' })
    public password: string;

    @Column({ name: 'permission' })
    public permission: string;

    @IsEmail()
    @Column({ name: 'email' })
    public email: string;

    @ManyToOne(type => Vendor, vendor => vendor.user_vendor)
    @JoinColumn({ name: 'vendor_id' })
    public vendor: Vendor;

    @OneToMany(type => AccessToken, accessToken => accessToken.user_vendor)
    public accessToken: AccessToken[];

    @BeforeInsert()
    public async hashPassword(): Promise<void> {
        // this.password = await User.hashPassword(this.password);
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
        this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
