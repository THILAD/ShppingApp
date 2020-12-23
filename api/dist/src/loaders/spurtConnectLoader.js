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
const path = tslib_1.__importStar(require("path"));
const routes_1 = require("../plugin-manager/routes");
const express_session_1 = tslib_1.__importDefault(require("express-session"));
const express_validator_1 = tslib_1.__importDefault(require("express-validator"));
// import * as expressEjsLayout from 'express-ejs-layouts';
exports.spurtConnectLoader = (settings) => {
    if (settings) {
        console.log(path.join(__dirname, '../../', 'views'));
        const expressEjsLayout = require('express-ejs-layouts');
        const passport = require('passport');
        const flash = require('express-flash');
        const expressApp = settings.getData('express_app');
        expressApp
            // view engine setup
            .set('views', path.join(__dirname, '../../', 'views'))
            .set('view engine', 'ejs')
            .use(expressEjsLayout)
            .set('layout', 'pages/layouts/common')
            .use(express_session_1.default({
            resave: true,
            saveUninitialized: true,
            secret: '$$secret*&*((',
        }))
            .use(passport.initialize())
            .use(passport.session())
            .use(express_validator_1.default())
            .use((req, res, next) => {
            res.locals.user = req.user;
            next();
        })
            .use(flash());
        for (const route of routes_1.ROUTER) {
            expressApp.use(route.path, route.middleware, route.handler);
        }
    }
};
//# sourceMappingURL=spurtConnectLoader.js.map