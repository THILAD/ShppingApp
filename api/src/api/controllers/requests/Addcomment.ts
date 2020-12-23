/*
 * spurtcommerce API
 * version 3.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import { IsNotEmpty } from 'class-validator';
export class Addcomment {

    

    public orderId: number;
    public productId: number;
    @IsNotEmpty()
    public content: string;
    public status: string;
    @IsNotEmpty()
    public userId: number;
    public parentId: number;
    public score:number;
}
