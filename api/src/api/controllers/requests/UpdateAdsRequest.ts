/*
 * spurtcommerce API
 * version 3.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {IsNotEmpty} from 'class-validator';

export class UpdateAdsRequest {
    // @IsNotEmpty()
    public id: number;
    // @IsNotEmpty()
    // public codeName: string;
    @IsNotEmpty()
    public photo: string;
    @IsNotEmpty()
    public adsName: string;
    @IsNotEmpty()
    public proName: string;
    @IsNotEmpty()
    public proCode: string;
    
    public allowedPromote: number;
    @IsNotEmpty()
    public isActive: boolean;
    @IsNotEmpty()
    public startPro: Date;
    @IsNotEmpty()
    public endPro: Date;
}
