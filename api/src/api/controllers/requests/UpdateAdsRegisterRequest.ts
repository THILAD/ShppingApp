/*
 * spurtcommerce API
 * version 3.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {IsNotEmpty} from 'class-validator';

export class UpdateAdsRegisterRequest {
   // @IsNotEmpty()
    public id: number;
    
    @IsNotEmpty()
    public vendor: number;
    @IsNotEmpty()
    public adsId: number;
    @IsNotEmpty()
    public proName: string;

    @IsNotEmpty()
    public codeName: string;
}
