/*
 * spurtcommerce API
 * version 3.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { IsNotEmpty } from 'class-validator';
import {BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { Exclude } from 'class-transformer';
import {User_Vendor} from './User_Vendor';
import {BaseModel} from './BaseModel';
import moment = require('moment');

@Entity('vendor')
export class Vendor extends BaseModel {

    

    @PrimaryGeneratedColumn({ name: 'vendor_id' })
    @IsNotEmpty()
    public vendor_id: number;

    @IsNotEmpty()
    @Column({ name: 'vendor_name' })
    public vendor_name: string;

    @Exclude()
    @IsNotEmpty()
    @Column({ name: 'email' })
    public email: string;

    @Exclude()
    @IsNotEmpty()
    @Column({ name: 'category' })
    public category: number;

    @Exclude()
    @IsNotEmpty()
    @Column({ name: 'phone' })
    public phone: string;

    @Exclude()
    @IsNotEmpty()
    @Column({ name: 'localtion' })
    public localtion: string;

    @Exclude()
    @IsNotEmpty()
    @Column({ name: 'is_active' })
    public isActive: number;

    @Exclude()
    @Column({ name: 'img' })
    public img: string;


    @Exclude()
    @Column({ name: 'minimum' })
    public minimum: string;


    @Exclude()
    @Column({ name: 'img_card' })
    public img_card: string;

    @OneToMany(type => User_Vendor, user_vendor => user_vendor.vendor)
    public user_vendor: User_Vendor[];

    @BeforeInsert()
    public async createDetails(): Promise<void> {
        this.createdDate = moment().format('YYYY-MM-DD HH:mm:ss');
        this.createdBy = -1;// -1 system , -2 admin , -3 client...
    }

    @BeforeUpdate()
    public async updateDetails(): Promise<void> {
       this.modifiedDate = moment().format('YYYY-MM-DD HH:mm:ss');
    }
    

}
