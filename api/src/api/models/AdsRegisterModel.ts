/*
 * spurtcommerce API
 * version 3.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Column, Entity} from 'typeorm';
import {PrimaryGeneratedColumn} from 'typeorm/index';




@Entity('adsregister')
export class AdsRegister {

    @PrimaryGeneratedColumn({name: 'id'})
    public id: number;
    @Column({name: 'adsId'})
    public adsId: number;
    @Column({name: 'proName'})
    public proName: string;
    @Column({name: 'codeName'})
    public codeName: string;

    @Column({name: 'vendorId'})
    public vendorId: number;
}
