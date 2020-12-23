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
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const class_transformer_1 = require("class-transformer");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
//import { env } from '../../env';
// import { ForgotPassword as ForgotPassword } from './requests/ForgotPasswordRequest';
const UserLoginRequest_1 = require("./requests/UserLoginRequest");
// import { CreateUser as CreateRequest } from './requests/CreateUserRequest';
const CreateVendorRequest_1 = require("./requests/CreateVendorRequest");
const Updatestatus_1 = require("./requests/Updatestatus");
const Vendor_1 = require("../models/Vendor");
const User_Vendor_1 = require("../models/User_Vendor");
const AccessTokenModel_1 = require("../models/AccessTokenModel");
const UserVendorService_1 = require("../services/UserVendorService");
const VendorService_1 = require("../services/VendorService");
const ChangePasswordRequest_1 = require("./requests/ChangePasswordRequest");
const EditProfileRequest_1 = require("./requests/EditProfileRequest");
const AccessTokenService_1 = require("../services/AccessTokenService");
// import {EmailTemplateService} from '../services/EmailTemplateService';
// import {MAILService} from '../../auth/mail.services';
const ImageService_1 = require("../services/ImageService");
//import { S3Service } from '../services/S3Service';
const typedi_1 = require("typedi");
const AuthService_1 = require("../../../src/auth/AuthService");
let UserController = class UserController {
    constructor(UserVendorService, VendorService, accessTokenService, 
    //private s3Service: S3Service,
    imageService) {
        this.UserVendorService = UserVendorService;
        this.VendorService = VendorService;
        this.accessTokenService = accessTokenService;
        this.imageService = imageService;
        this.authService = typedi_1.Container.get(AuthService_1.AuthService);
    }
    // Login API
    /**
     * @api {post} /api/auth/login Login
     * @apiGroup Authentication
     * @apiParam (Request body) {String} username User Username
     * @apiParam (Request body) {String} password User Password
     * @apiParamExample {json} Input
     * {
     *      "username" : "",
     *      "password" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "data": "{
     *         "token":''
     *      }",
     *      "message": "Successfully login",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/auth/login
     * @apiErrorExample {json} Login error
     * HTTP/1.1 500 Internal Server Error
     */
    login(loginParam, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log('--------------------------------------------------------------------login-vendor----------------');
            console.log(loginParam.username);
            console.log(loginParam.password);
            const uservendor = yield this.UserVendorService.findOne({
                where: {
                    username: loginParam.username
                }
            });
            console.log(uservendor);
            const vendor = yield this.VendorService.findOne({
                where: [
                    { vendor_id: uservendor.vendor_id, isActive: 1 },
                ],
            });
            console.log('--------------------------------------------------------------------vendor----------------');
            console.log(vendor);
            if (!vendor) {
                const errorResponse = {
                    status: 0,
                    message: 'User not Active',
                };
                return response.status(400).send(errorResponse);
            }
            if (uservendor) {
                if (yield User_Vendor_1.User_Vendor.comparePassword(uservendor, loginParam.password)) {
                    // create a token
                    const token = jsonwebtoken_1.default.sign({ id: uservendor.vendor_id, usertype: "vendor" }, '123##$$)(***&');
                    //   if (uservendor.usergroup.isActive === 0) {
                    //       const errorResponse: any = {
                    //           status: 0,
                    //           message: 'InActive Role',
                    //       };
                    //       return response.status(400).send(errorResponse);
                    //   }
                    if (token) {
                        const newToken = new AccessTokenModel_1.AccessToken();
                        newToken.userId = uservendor.userId;
                        newToken.token = token;
                        const tokenSave = yield this.accessTokenService.create(newToken);
                        console.log(tokenSave);
                    }
                    const successResponse = {
                        status: 1,
                        message: 'Loggedin successful',
                        data: {
                            token,
                            user: class_transformer_1.classToPlain(uservendor),
                        },
                    };
                    return response.status(200).send(successResponse);
                }
                else {
                    const errorResponse = {
                        status: 0,
                        message: 'Invalid password',
                    };
                    return response.status(400).send(errorResponse);
                }
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid username',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // User List API
    /**
     * @api {get} /api/auth/userlist User List API
     * @apiGroup Authentication
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get user list",
     *      "data":"{}"
     *      "status": "1"
     * }
     * @apiSampleRequest /api/auth/userlist
     * @apiErrorExample {json} User Profile error
     * HTTP/1.1 500 Internal Server Error
     */
    findAll(limit, offset, keyword, count, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log(keyword);
            const relation = ['usergroup'];
            const WhereConditions = [{
                    name: 'deleteFlag',
                    value: 0,
                }];
            const user = yield this.VendorService.list(limit, offset, ['vendor_id', 'vendor_name', 'email', 'phone', 'isActive', 'img', 'minimum', 'img_card', 'createdDate'], relation, WhereConditions, keyword, count);
            console.log(user);
            const successResponse = {
                status: 1,
                data: user,
                message: 'Successfully get All user List',
            };
            return response.status(200).send(successResponse);
        });
    }
    // Create User API
    /**
     * @api {post} /api/auth/create-user Create User API
     * @apiGroup Authentication
     * @apiParam (Request body) {String} vendor_name vendor_name
     * @apiParam (Request body) {String} gmail gmail
     * @apiParam (Request body) {String} address address
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "vendor_name" : "",
     *      "gmail" : "",
     *      "address" : "",
     *
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "New User is created successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/auth/create-user
     * @apiErrorExample {json} createUser error
     * HTTP/1.1 500 Internal Server Error
     */
    register_vendor(createParam, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log('Start');
            console.log(createParam);
            const vendor = yield this.VendorService.findOne({
                where: [
                    { vendor_name: createParam.vendor_name },
                    { email: createParam.email }
                ],
            });
            console.log(vendor);
            if (vendor) {
                let message = '';
                message += vendor.email == createParam.email ? '[email]' : '';
                message += vendor.vendor_name == createParam.vendor_name ? '[vendor name]' : '';
                const errorResponse = {
                    status: 400,
                    message: message + ' already exist',
                };
                return response.status(400).send(errorResponse);
            }
            console.log("--------------end if -----------------------");
            let newvendor = new Vendor_1.Vendor();
            newvendor.vendor_name = createParam.vendor_name;
            newvendor.email = createParam.email;
            newvendor.phone = createParam.phone;
            newvendor.localtion = createParam.localtion;
            newvendor.img = '';
            newvendor.minimum = '5';
            newvendor.isActive = 0;
            newvendor.img_card = createParam.img_card.name;
            if (createParam.img.img) {
                newvendor.img = createParam.img.name;
                var image = createParam.img.img;
                var base64Data;
                if (createParam.img.type == "image/jpeg") {
                    base64Data = image.replace(/^data:image\/jpeg;base64,/, "");
                }
                else if (createParam.img.type == "image/png") {
                    base64Data = image.replace(/^data:image\/png;base64,/, "");
                }
                else if (createParam.img.type == "image/jpg") {
                    base64Data = image.replace(/^data:image\/jpg;base64,/, "");
                }
                else if (createParam.img.type == "image/pdf") {
                    base64Data = image.replace(/^data:image\/pdf;base64,/, "");
                }
                var path = 'vendor/' + createParam.img.name;
                let upload = this.imageService.imageUpload(path, base64Data);
                // require("fs").writeFile("../../../uploads/vendor/"+createParam.img.name, base64Data, 'base64', function(err) {
                console.log("---------------------------------- if -------------------------------------------------------------------------------");
                upload.then(v => {
                }).catch(e => {
                    console.log(e);
                });
            }
            if (createParam.img_card.img) {
                newvendor.img_card = createParam.img_card.name;
                var image = createParam.img_card.img;
                var base64Data;
                if (createParam.img.type == "image/jpeg") {
                    base64Data = image.replace(/^data:image\/jpeg;base64,/, "");
                }
                else if (createParam.img.type == "image/png") {
                    base64Data = image.replace(/^data:image\/png;base64,/, "");
                }
                else if (createParam.img.type == "image/jpg") {
                    base64Data = image.replace(/^data:image\/jpg;base64,/, "");
                }
                else if (createParam.img.type == "image/pdf") {
                    base64Data = image.replace(/^data:image\/pdf;base64,/, "");
                }
                var path = 'vendor/' + createParam.img_card.name;
                let upload = this.imageService.imageUpload(path, base64Data);
                // require("fs").writeFile("../../../uploads/vendor/"+createParam.img.name, base64Data, 'base64', function(err) {
                console.log("---------------------------------- if -------------------------------------------------------------------------------");
                upload.then(v => {
                }).catch(e => {
                    console.log(e);
                });
            }
            // });let
            console.log("---------------------------------- insert vendor -------------------------------------------------------------------------------");
            newvendor = yield this.VendorService.create(newvendor);
            const newUserPassword = yield User_Vendor_1.User_Vendor.hashPassword(createParam.password);
            const newUserVender = new User_Vendor_1.User_Vendor();
            newUserVender.vendor_id = newvendor.vendor_id;
            newUserVender.username = createParam.email;
            newUserVender.password = newUserPassword;
            newUserVender.permission = 'vendor';
            newUserVender.email = createParam.email;
            yield this.UserVendorService.create(newUserVender);
            console.log("---------------------------------- return vendor -------------------------------------------------------------------------------");
            return response.status(200).send(newUserVender);
        });
    }
    // update User API
    /**
     * @api {put} /api/auth/update-user/:id Update User API
     * @apiGroup Authentication
     * @apiParam (Request body) {String} vendor_name vendor_name
     * @apiParam (Request body) {String} gmail gmail
     * @apiParam (Request body) {String} address address
     *
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "username" : "",
     *      "password" : "",
     *      "firstName" : "",
     *      "lastName" : "",
     *      "email" : "",
     *      "userGroupId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "User is updated successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/auth/update-user/:id
     * @apiErrorExample {json} updateUser error
     * HTTP/1.1 500 Internal Server Error
     */
    updateUser(id, createParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log(createParam);
            // if (request.user.userId === id) {
            //     const errorResponse: any = {
            //         status: 0,
            //         message: 'You cannot Edit loggedin User',
            //     };
            //     return response.status(400).send(errorResponse);
            // }
            const vendorfindOne = yield this.VendorService.findOne({
                where: {
                    vendor_id: createParam.vendor_id
                },
            });
            if (!vendorfindOne) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid productId',
                };
                return response.status(400).send(errorResponse);
            }
            vendorfindOne.isActive = createParam.isActive;
            const userSaveResponse = yield this.VendorService.update(createParam.vendor_id, vendorfindOne);
            if (userSaveResponse) {
                const successResponse = {
                    status: 1,
                    message: 'Vendor updated successfully',
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'Unable to update user',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    // Delete User API
    /**
     * @api {delete} /api/auth/delete-user/:id Delete User
     * @apiGroup Authentication
     * @apiParam (Request body) {Number} id UserId
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "User is deleted successfully",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/auth/delete-user/:id
     * @apiErrorExample {json} updateUser error
     * HTTP/1.1 500 Internal Server Error
     */
    changePassword(changePasswordParam, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const user = yield this.authService.parseBasicAuthFromRequest(request);
            const uservendor = yield this.UserVendorService.findOne({
                where: {
                    user_vendor_id: user.id,
                }
            });
            console.log("------------- new pw -----------------------------------------------------------------------------");
            console.log(uservendor);
            if (!uservendor) {
                const errResponse = {
                    status: 0,
                    message: 'Invalid userId',
                };
                return response.status(400).send(errResponse);
            }
            if (yield User_Vendor_1.User_Vendor.comparePassword(uservendor, changePasswordParam.oldPassword)) {
                const val = yield User_Vendor_1.User_Vendor.comparePassword(uservendor, changePasswordParam.newPassword);
                if (val) {
                    const errResponse = {
                        status: 0,
                        message: 'Existing password and New password should not match',
                    };
                    return response.status(400).send(errResponse);
                }
                console.log("------------- new pw -----------------------------------------------------------------------------");
                console.log(changePasswordParam.newPassword);
                uservendor.password = yield User_Vendor_1.User_Vendor.hashPassword(changePasswordParam.newPassword);
                console.log("------------- pw -------------------------------------------------------------------");
                console.log(uservendor);
                const updateUser = yield this.UserVendorService.update(uservendor.user_vendor_id, uservendor);
                if (updateUser) {
                    console.log("------------- successfully -----------------------------------------------------------------------------");
                    const successResponse = {
                        status: 1,
                        message: 'Your password changed successfully',
                    };
                    return response.status(200).send(successResponse);
                }
            }
            const errorResponse = {
                status: 0,
                message: 'Your old password is wrong',
            };
            return response.status(400).send(errorResponse);
        });
    }
    // Logout API
    /**
     * @api {get} /api/auth/logout Log Out API
     * @apiGroup Authentication
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully logout",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/auth/logout
     * @apiErrorExample {json} Logout error
     * HTTP/1.1 500 Internal Server Error
     */
    logout(request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log('logout');
            console.log(request.user.userId);
            const user = yield this.accessTokenService.findOne({
                where: {
                    userId: request.user.userId,
                },
            });
            if (!user) {
                const errorResponse = {
                    status: 0,
                    message: 'Invalid token',
                };
                return response.status(400).send(errorResponse);
            }
            const deleteToken = yield this.accessTokenService.delete(user);
            console.log('token' + deleteToken);
            if (!deleteToken) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully Logout',
                };
                return response.status(200).send(successResponse);
            }
        });
    }
    // Edit Profile API
    /**
     * @api {post} /api/auth/edit-profile Edit Profile API
     * @apiGroup Authentication
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} username User username
     * @apiParam (Request body) {String} email User email
     * @apiParam (Request body) {String} phoneNumber User phoneNumber
     * @apiParam (Request body) {String} address User address
     * @apiParam (Request body) {String} avatar User avatar
     * @apiParamExample {json} Input
     * {
     *      "username" : "",
     *      "email" : "",
     *      "phoneNumber" : "",
     *      "address" : "",
     *      "avatar" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated User.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/auth/edit-profile
     * @apiErrorExample {json} User error
     * HTTP/1.1 500 Internal Server Error
     */
    editProfile(editProfileParam, response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendor = yield this.authService.parseBasicAuthFromRequest(request);
            const user = yield this.VendorService.findOne({
                where: {
                    vendor_id: vendor.id,
                },
            });
            // const avatar = editProfileParam.avatar;
            // if (avatar) {
            //     const type = avatar.split(';')[0].split('/')[1];
            //     const name = 'Img_' + Date.now() + '.' + type;
            //     const path = 'user/';
            //     const base64Data = new Buffer(avatar.replace(/^data:image\/\w+;base64,/, ''), 'base64');
            //     if (env.imageserver === 's3') {
            //         await this.s3Service.imageUpload((path + name), base64Data, type);
            //     } else {
            //         await this.imageService.imageUpload((path + name), base64Data);
            //     }
            //     user.avatar = name;
            //     user.avatarPath = path;
            // }
            console.log('-------------------- editProfileParam ------------------------------');
            console.log(editProfileParam);
            user.vendor_name = editProfileParam.username;
            user.email = editProfileParam.email;
            user.minimum = editProfileParam.minimun;
            user.address = editProfileParam.address;
            console.log(user);
            const userSave = yield this.VendorService.update(10, user);
            console.log('-------------------- userSave ------------------------------');
            console.log(userSave);
            if (userSave) {
                const successResponse = {
                    status: 1,
                    message: 'Successfully updated profile',
                    data: userSave,
                };
                return response.status(200).send(successResponse);
            }
            else {
                const errorResponse = {
                    status: 0,
                    message: 'unable to edit profile',
                };
                return response.status(400).send(errorResponse);
            }
        });
    }
    loadProfile(response, request) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const vendor = yield this.authService.parseBasicAuthFromRequest(request);
            console.log("------------------------------- user --------------------------------------");
            const user = yield this.VendorService.findOne({
                where: {
                    vendor_id: vendor.id,
                },
            });
            console.log(user);
            return response.status(200).send(user);
        });
    }
    vendorname(id, request, response) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            console.log("------------------------------- Param --------------------------------------");
            console.log(id);
            console.log("------------------------------- Param --------------------------------------");
            const uservendor = yield this.VendorService.vendor_by_id(['vendor_id', 'vendor_name'], id);
            console.log(uservendor);
            if (!uservendor) {
                const errResponse = {
                    status: 0,
                    message: 'Invalid userId',
                };
                return response.status(400).send(errResponse);
            }
            return response.status(200).send(uservendor);
        });
    }
};
tslib_1.__decorate([
    routing_controllers_1.Post('/Vendor-login'),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [UserLoginRequest_1.UserLogin, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/vendorlist'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.QueryParam('limit')), tslib_1.__param(1, routing_controllers_1.QueryParam('offset')), tslib_1.__param(2, routing_controllers_1.QueryParam('keyword')), tslib_1.__param(3, routing_controllers_1.QueryParam('count')), tslib_1.__param(4, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "findAll", null);
tslib_1.__decorate([
    routing_controllers_1.Post('/register-vendor'),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [CreateVendorRequest_1.CreateVendor, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "register_vendor", null);
tslib_1.__decorate([
    routing_controllers_1.Put('/update-vendor/:id'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Param('id')), tslib_1.__param(1, routing_controllers_1.Body({ validate: true })), tslib_1.__param(2, routing_controllers_1.Req()), tslib_1.__param(3, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Updatestatus_1.Update_status, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
tslib_1.__decorate([
    routing_controllers_1.Delete('/delete-user/:id'),
    routing_controllers_1.Authorized()
    // public async remove(@Param('id') id: number, @Req() request: any, @Res() response: any): Promise<any> {
    //     console.log(request.user.userId);
    //     if (request.user.userId === id) {
    //         const errorResponse: any = {
    //             status: 0,
    //             message: 'You cannot delete loggedin user',
    //         };
    //         return response.status(400).send(errorResponse);
    //     }
    //     const user = await this.userService.findOne({
    //         where: {
    //             userId: id,
    //         },
    //     });
    //     user.deleteFlag = 1;
    //     const deleteUser = await this.userService.create(user);
    //     // const userDelete = await this.userService.delete(id);
    //     if (deleteUser) {
    //         const successResponse: any = {
    //             status: 1,
    //             message: 'User Deleted successfully',
    //         };
    //         return response.status(200).send(successResponse);
    //     } else {
    //         const errorResponse: any = {
    //             status: 0,
    //             message: 'Unable to delete user',
    //         };
    //         return response.status(400).send(errorResponse);
    //     }
    // }
    // forgot Password API
    /**
     * @api {post} /api/auth/forgot-password Forgot Password API
     * @apiGroup Authentication
     * @apiParam (Request body) {String} email User email
     * @apiParamExample {json} Input
     * {
     *      "email" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Thank you. Your password send to your email",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/auth/forgot-password
     * @apiErrorExample {json} User error
     * HTTP/1.1 500 Internal Server Error
     */
    ,
    routing_controllers_1.Post('/forgot-password')
    // public async forgotPassword(@Body({ validate: true }) forgotPassword: ForgotPassword, @Res() response: any): Promise<any> {
    //     console.log('emailId' + forgotPassword.email);
    //     const user = await this.userService.findOne({
    //         where: {
    //             email: forgotPassword.email,
    //         },
    //     });
    //     if (!user) {
    //         const errorResponse: any = {
    //             status: 0,
    //             message: 'Invalid email Id',
    //         };
    //         return response.status(400).send(errorResponse);
    //     }
    //     const tempPassword: any = Math.random().toString().substr(2, 5);
    //     console.log(tempPassword);
    //     const password = await User.hashPassword(tempPassword);
    //     user.password = password;
    //     console.log(password);
    //     await this.userService.create(user);
    //     const emailContent = await this.emailTemplateService.findOne(2);
    //     const message = emailContent.content.replace('{name}', user.firstName).replace('{xxxxxx}', tempPassword);
    //     const sendMailRes = MAILService.passwordForgotMail(message , user.email , emailContent.subject);
    //     if (sendMailRes) {
    //         const successResponse: any = {
    //             status: 1,
    //             message: 'Your password has been sent to your email inbox.',
    //         };
    //         return response.status(200).send(successResponse);
    //     } else {
    //         const errorResponse: any = {
    //             status: 0,
    //             message: 'error in sending email',
    //         };
    //         return response.status(400).send(errorResponse);
    //     }
    // }
    // Change Password API
    /**
     * @api {put} /api/auth/change-password Change Password API
     * @apiGroup Authentication
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} oldPassword User oldPassword
     * @apiParam (Request body) {String} newPassword User newPassword
     * @apiParamExample {json} Input
     * {
     *      "oldPassword" : "",
     *      "newPassword" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully Password changed",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/auth/change-password
     * @apiErrorExample {json} User error
     * HTTP/1.1 500 Internal Server Error
     */
    ,
    routing_controllers_1.Put('/vendor-change-password'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [ChangePasswordRequest_1.ChangePassword, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "changePassword", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/logout'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Req()), tslib_1.__param(1, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "logout", null);
tslib_1.__decorate([
    routing_controllers_1.Post('/vendor-edit-profile'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Body({ validate: true })), tslib_1.__param(1, routing_controllers_1.Res()), tslib_1.__param(2, routing_controllers_1.Req()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [EditProfileRequest_1.EditProfileRequest, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "editProfile", null);
tslib_1.__decorate([
    routing_controllers_1.Post('/vendor-load-profile'),
    routing_controllers_1.Authorized(),
    tslib_1.__param(0, routing_controllers_1.Res()), tslib_1.__param(1, routing_controllers_1.Req()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "loadProfile", null);
tslib_1.__decorate([
    routing_controllers_1.Get('/vendor-name'),
    tslib_1.__param(0, routing_controllers_1.QueryParam('id')), tslib_1.__param(1, routing_controllers_1.Req()), tslib_1.__param(2, routing_controllers_1.Res()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "vendorname", null);
UserController = tslib_1.__decorate([
    routing_controllers_1.JsonController('/auth'),
    tslib_1.__metadata("design:paramtypes", [UserVendorService_1.UserVendorService,
        VendorService_1.VendorService,
        AccessTokenService_1.AccessTokenService,
        ImageService_1.ImageService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=VendorController.js.map