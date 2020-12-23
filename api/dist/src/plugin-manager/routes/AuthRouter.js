"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express = tslib_1.__importStar(require("express"));
const AuthController_1 = require("../controller/AuthController");
const authController = new AuthController_1.AuthController();
exports.AuthRoute = express.Router()
    .get('/', authController.login)
    .get('/login', authController.login)
    .post('/login', authController.postLogin)
    .get('/logout', authController.logout);
//# sourceMappingURL=AuthRouter.js.map