/*
 * spurtcommerce API
 * version 3.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { EntityRepository, Repository } from 'typeorm';
import {ProductViewLog} from '../models/ProductViewLog';

@EntityRepository(ProductViewLog)
export class ProductViewLogRepository extends Repository<ProductViewLog>  {

}
