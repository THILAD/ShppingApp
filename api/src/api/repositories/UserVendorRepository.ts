/*
 * spurtcommerce API
 * version 3.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import { User_Vendor } from '../models/User_Vendor';

@EntityRepository(User_Vendor)
export class UserVendorRepository extends Repository<User_Vendor>  {

}
