"use strict";
/*
 * spurtcommerce API
 * version 3.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Language_1 = require("../models/Language");
let LanguageRepository = class LanguageRepository extends typeorm_1.Repository {
};
LanguageRepository = tslib_1.__decorate([
    typeorm_1.EntityRepository(Language_1.Language)
], LanguageRepository);
exports.LanguageRepository = LanguageRepository;
//# sourceMappingURL=LanguageRepository.js.map