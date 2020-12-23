/*
 * spurtcommerce API
 * version 3.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {IsNotEmpty,IsEmail} from 'class-validator';

export class CreateUserVendor {

    
    @IsNotEmpty({
        message: 'vender id is required',
    })
    public vendor_id: Number;

    @IsNotEmpty({
        message: 'email is required',
    })
    @IsEmail({},{
        message: 'email is not email format',
    })
    public email: string;

    @IsNotEmpty({
        message: 'username is required',
    })
    public username: string;

    @IsNotEmpty({
        message: 'password is required',
    })
    public password: string;

    @IsNotEmpty({
        message: 'permission is required',
    })
    public permission: string;


}
