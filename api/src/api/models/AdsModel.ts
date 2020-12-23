/*
 * spurtcommerce API
 * version 3.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Column, Entity} from 'typeorm';
import {PrimaryGeneratedColumn} from 'typeorm/index';




@Entity('ads')
export class Ads {

    @PrimaryGeneratedColumn({name: 'id'})
    public id: number;
    @Column({name: 'adsName'})
    public adsName: string;
    @Column({name: 'photo'})
    public photo: string;
    @Column({name: 'proName'})
    public proName: string;
    @Column({name: 'proCode'})
    public proCode: string;
    @Column({name: 'allowedPromote'})
    public allowedPromote: number;
    @Column({name: 'isActive'})
    public isActive: boolean;

    @Column({name: 'startPro'})
    public startPro: Date;
    @Column({name: 'endPro'})
    public endPro: Date;
}
