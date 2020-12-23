"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const AuthRouter_1 = require("./AuthRouter");
const HomeRouter_1 = require("./HomeRouter");
const CashondeliveryRouter_1 = require("./CashondeliveryRouter");
const PaypalRouter_1 = require("./PaypalRouter");
// API keys and Passport configuration
const passportConfig = tslib_1.__importStar(require("../config/passport"));
const globalMiddleware = tslib_1.__importStar(require("../middlewares/environment"));
exports.ROUTER = [
    {
        handler: AuthRouter_1.AuthRoute,
        middleware: [globalMiddleware.index],
        path: '/',
    },
    {
        handler: HomeRouter_1.HomeRoute,
        middleware: [globalMiddleware.index, passportConfig.isAuthenticated],
        path: '/home',
    },
    {
        handler: CashondeliveryRouter_1.cashOnDeliveryRoute,
        middleware: [globalMiddleware.index, passportConfig.isAuthenticated],
        path: '/CashOnDelivery',
    },
    {
        handler: PaypalRouter_1.PaypalRoute,
        middleware: [globalMiddleware.index, passportConfig.isAuthenticated],
        path: '/paypal',
    },
    {
        handler: PaypalRouter_1.PaypalNoAuthRoute,
        middleware: [globalMiddleware.index],
        path: '/paypal-payment',
    },
];
//# sourceMappingURL=index.js.map