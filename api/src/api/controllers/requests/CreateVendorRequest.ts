/*
 * spurtcommerce API
 * version 3.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {IsNotEmpty,IsEmail} from 'class-validator';

export class CreateVendor {

    
    @IsNotEmpty({
        message: 'vender name is required',
    })
    public vendor_name: string;

    @IsNotEmpty({
        message: 'email is required',
    })
    @IsEmail({},{
        message: 'email is not email format',
    })
    public email: string;

    @IsNotEmpty({
        message: 'category is required',
    })
    public category: number;

    @IsNotEmpty({
        message: 'phone is required',
    })
    public phone: string;

    @IsNotEmpty({
        message: 'localtion is required',
    })
    public localtion: string;

    @IsNotEmpty({
        message: 'img is required',
    })
    public img: any;

    @IsNotEmpty({
        message: 'img_card is required',
    })
    public img_card: any;

    

    @IsNotEmpty({
        message: 'password is required',
    })
    public password: string;

  


}
