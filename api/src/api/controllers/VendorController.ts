/*
 * spurtcommerce API
 * version 3.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {
    Post, Body, JsonController, Res, Get, Authorized, QueryParam, Put, Param, Delete, Req
} from 'routing-controllers';
import { classToPlain } from 'class-transformer';
import jwt from 'jsonwebtoken';

//import { env } from '../../env';
//import { ForgotPassword as ForgotPassword } from './requests/ForgotPasswordRequest';
import { ForgotVendorPassword } from './requests/ForgotVendorPassword';
import { UserLogin as LoginRequest } from './requests/UserLoginRequest';
// import { CreateUser as CreateRequest } from './requests/CreateUserRequest';
import { CreateVendor } from './requests/CreateVendorRequest';

import { Update_status } from './requests/Updatestatus';
import { Vendor } from '../models/Vendor';
import { User_Vendor } from '../models/User_Vendor';
import { AccessToken } from '../models/AccessTokenModel';
import { UserVendorService } from '../services/UserVendorService';
import { VendorService } from '../services/VendorService';
import { ChangePassword } from './requests/ChangePasswordRequest';
import { ChangeLocaltion } from './requests/ChangeLocaltionRequest ';
import { EditProfileRequest } from './requests/EditProfileRequest';
import { AccessTokenService } from '../services/AccessTokenService';
// import {EmailTemplateService} from '../services/EmailTemplateService';
// import {MAILService} from '../../auth/mail.services';
import { ImageService } from '../services/ImageService';
//import { S3Service } from '../services/S3Service';

import { Container } from 'typedi';
import { AuthService } from '../../../src/auth/AuthService';
@JsonController('/auth')
export class UserController {
    authService = Container.get<AuthService>(AuthService);
    constructor(private UserVendorService: UserVendorService,
        private VendorService: VendorService,
        private accessTokenService: AccessTokenService,

        //private s3Service: S3Service,
        private imageService: ImageService
    ) {
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
    @Post('/Vendor-login')
    public async login(@Body({ validate: true }) loginParam: LoginRequest, @Res() response: any): Promise<any> {
        console.log('--------------------------------------------------------------------login-vendor----------------');
        console.log(loginParam.username);
        console.log(loginParam.password);
        const uservendor = await this.UserVendorService.findOne({
            where: {
                username: loginParam.username

            }
        });
        console.log('--------------------------------------------------------------------uservendor----------------');
        console.log(uservendor);

        const vendor = await this.VendorService.findOne({
            where: [
                { vendor_id: uservendor.vendor_id, isActive: 1 },


            ],
        });
        console.log('--------------------------------------------------------------------vendor----------------');
        console.log(vendor);
        if (!vendor) {

            const errorResponse: any = {
                status: 0,
                message: 'User not Active',
            };
            return response.status(400).send(errorResponse);

        }



        if (uservendor) {
            if (await User_Vendor.comparePassword(uservendor, loginParam.password)) {
                // create a token
                const token = jwt.sign({ id: uservendor.vendor_id, usertype: "vendor" }, '123##$$)(***&');
                //   if (uservendor.usergroup.isActive === 0) {
                //       const errorResponse: any = {
                //           status: 0,
                //           message: 'InActive Role',
                //       };
                //       return response.status(400).send(errorResponse);
                //   }
                if (token) {
                    const newToken = new AccessToken();
                    newToken.userId = uservendor.userId;
                    newToken.token = token;
                    const tokenSave = await this.accessTokenService.create(newToken);
                    console.log(tokenSave);
                }
                const successResponse: any = {
                    status: 1,
                    message: 'Loggedin successful',
                    data: {
                        token,
                        user: classToPlain(uservendor),
                        type_id: vendor.category,
                        vendor_id: vendor.vendor_id,
                        phone: vendor.phone,
                    },
                };
                return response.status(200).send(successResponse);
            } else {
                const errorResponse: any = {
                    status: 0,
                    message: 'Invalid password',
                };
                return response.status(400).send(errorResponse);
            }
        } else {

            const errorResponse: any = {
                status: 0,
                message: 'Invalid username',
            };
            return response.status(400).send(errorResponse);
        }
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
    @Get('/vendorlist')
    @Authorized()
    public async findAll(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        console.log(keyword);
        const relation = ['usergroup'];
        const WhereConditions = [{
            name: 'deleteFlag',
            value: 0,
        }];
        const user = await this.VendorService.list(limit, offset, ['vendor_id', 'vendor_name', 'email', 'phone', 'isActive', 'img', 'minimum', 'img_card', 'createdDate'], relation, WhereConditions, keyword, count);
        console.log(user);
        const successResponse: any = {
            status: 1,
            data: user,
            message: 'Successfully get All user List',
        };
        return response.status(200).send(successResponse);
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
    @Get('/vendorlist-NoAu')
    // @Authorized()
    public async findAlll(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('count') count: number | boolean, @Res() response: any): Promise<any> {
        console.log(keyword);
        const relation = ['usergroup'];
        const WhereConditions = [{
            name: 'deleteFlag',
            value: 0,
        }];
        const user = await this.VendorService.list(limit, offset, ['vendor_id', 'vendor_name'], relation, WhereConditions, keyword, count);
        console.log(user);
        const successResponse: any = {
            status: 1,
            data: user,
            message: 'Successfully get All user List',
        };
        return response.status(200).send(successResponse);
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
    @Post('/check-vendor')
    //@Authorized()
    public async check_vendor(@Body({ validate: true }) createParam: LoginRequest, @Res() response: any): Promise<any> {
        console.log('Start');
        console.log(createParam);

        const vendor = await this.VendorService.findOne({
            where: [
                { email: createParam.username },
                // { email: createParam.email }
            ],
        });
        console.log(vendor);
        if (vendor) {
            let message = '';
            message += vendor.email == createParam.username ? '[email]' : '';
            //    message += vendor.vendor_name == createParam.username ? '[vendor name]' : '';
            const errorResponse: any = {
                status: 1,
                message: message + ' already exist',
            };
            return response.status(200).send(errorResponse);
        } else {
            const successResponse: any = {
                status: 0,
                message: 'vendor not exist',
                data: createParam,
            };
            return response.status(402).send(successResponse);
        }

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
    @Post('/register-vendor')
    //@Authorized()
    public async register_vendor(@Body({ validate: true }) createParam: CreateVendor, @Res() response: any): Promise<any> {
        console.log('Start');
        console.log(createParam);
        console.log(createParam);
        const googleTokenId = createParam['verifiedToken'];
        const phoneNumber = createParam['phonenumber'];
        const isvalid = AccessTokenService.verifyGoogleIdToken(googleTokenId, phoneNumber, 'laoappssell');//laoappssell
        if (!isvalid) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid google token id',
            };
            return response.status(400).send(errorResponse);
        }
        const vendor = await this.VendorService.findOne({
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
            const errorResponse: any = {
                status: 400,
                message: message + ' already exist',
            };
            return response.status(400).send(errorResponse);
        }

        console.log("--------------end if -----------------------");
        let newvendor = new Vendor();
        newvendor.vendor_name = createParam.vendor_name;
        newvendor.email = createParam.email;
        newvendor.phone = createParam.phone;
        newvendor.localtion = createParam.localtion;
        newvendor.img = '';
        newvendor.minimum = '5';
        newvendor.isActive = 1;
        newvendor.img_card = createParam.img_card.name;
        newvendor.category = createParam.category;


        if (createParam.img.img) {
            newvendor.img = createParam.img.name;

            var image = createParam.img.img;
            var base64Data;

            if (createParam.img.type == "image/jpeg") {
                base64Data = image.replace(/^data:image\/jpeg;base64,/, "");
            } else if (createParam.img.type == "image/png") {
                base64Data = image.replace(/^data:image\/png;base64,/, "");
            } else if (createParam.img.type == "image/jpg") {
                base64Data = image.replace(/^data:image\/jpg;base64,/, "");
            } else if (createParam.img.type == "image/pdf") {
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
            } else if (createParam.img.type == "image/png") {
                base64Data = image.replace(/^data:image\/png;base64,/, "");
            } else if (createParam.img.type == "image/jpg") {
                base64Data = image.replace(/^data:image\/jpg;base64,/, "");
            } else if (createParam.img.type == "image/pdf") {
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
        newvendor = await this.VendorService.create(newvendor);
        console.log(createParam);


        const newUserPassword = await User_Vendor.hashPassword(createParam.password);
        const newUserVender = new User_Vendor();
        newUserVender.vendor_id = newvendor.vendor_id;
        newUserVender.username = createParam.email;
        newUserVender.password = newUserPassword;
        newUserVender.permission = 'vendor';
        newUserVender.email = createParam.email;

        const user_vendor_data = await this.UserVendorService.create(newUserVender);

        if (user_vendor_data) {

            const uservendor = await this.UserVendorService.findOne({
                where: {
                    username: newvendor.phone + '@laoapps.com'

                }
            });

            if (uservendor) {
                const token = jwt.sign({ id: newvendor.vendor_id, usertype: "vendor" }, '123##$$)(***&');

                if (token) {
                    const newToken = new AccessToken();
                    newToken.userId = uservendor.userId;
                    newToken.token = token;
                    const tokenSave = await this.accessTokenService.create(newToken);
                    console.log(tokenSave);
                }
                const successResponse: any = {
                    status: 1,
                    message: 'Loggedin successful',
                    data: {
                        token,
                        user: classToPlain(uservendor),
                        type_id: newvendor.category,
                        vendor_id: newvendor.vendor_id,
                        phone: newvendor.phone,
                    },
                };
                return response.status(200).send(successResponse);
            }


        }




        console.log("---------------------------------- return vendor -------------------------------------------------------------------------------");
        const successResponse: any = {
            status: 1,
            message: 'Register Vendor successfully cannot Login',
            data: newUserVender,
        };
        return response.status(401).send(successResponse);
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
    @Put('/update-vendor/:id')
    @Authorized()
    public async updateUser(@Param('id') id: number, @Body({ validate: true }) createParam: Update_status, @Req() request: any, @Res() response: any): Promise<any> {
        console.log(createParam);
        // if (request.user.userId === id) {
        //     const errorResponse: any = {
        //         status: 0,
        //         message: 'You cannot Edit loggedin User',
        //     };
        //     return response.status(400).send(errorResponse);
        // }

        const vendorfindOne = await this.VendorService.findOne({
            where: {
                vendor_id: createParam.vendor_id

            },
        });

        if (!vendorfindOne) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid productId',
            };
            return response.status(400).send(errorResponse);
        }
        vendorfindOne.isActive = createParam.isActive;

        const userSaveResponse = await this.VendorService.update(createParam.vendor_id, vendorfindOne);
        if (userSaveResponse) {
            const successResponse: any = {
                status: 1,
                message: 'Vendor updated successfully',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to update user',
            };
            return response.status(400).send(errorResponse);
        }

    }


    @Put('/update-vendor-localtion')
    @Authorized()
    public async updateUserlocaltion(@Body({ validate: true }) changeLocaltion: ChangeLocaltion, @Req() request: any, @Res() response: any): Promise<any> {

        const user = await this.authService.parseBasicAuthFromRequest(request);
        const vendorfindOne = await this.VendorService.findOne({
            where: {
                vendor_id: user.id

            },
        });

        if (!vendorfindOne) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid productId',
            };
            return response.status(400).send(errorResponse);
        }
        vendorfindOne.localtion = changeLocaltion.localtion;

        const userSaveResponse = await this.VendorService.update(user.id, vendorfindOne);
        if (userSaveResponse) {
            const successResponse: any = {
                status: 1,
                message: 'Vendor updated successfully',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'Unable to update user',
            };
            return response.status(400).send(errorResponse);
        }

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
    @Delete('/delete-user/:id')
    //@Authorized()
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
    @Post('/forgot-password-vendor')
    public async forgotPassword(@Body({ validate: true }) forgotPassword: ForgotVendorPassword, @Res() response: any): Promise<any> {
        console.log('--------------------------------------------');
        console.log(forgotPassword);
        const googleTokenId = forgotPassword['verifiedToken'];
        const verifiedCode = forgotPassword['verifiedCode'];
        const phoneNumber = Number(forgotPassword.phone);
        console.log(googleTokenId);
        console.log('------------------googleTokenId--------------------------');
        const isvalid = AccessTokenService.verifyGoogleIdToken(googleTokenId, phoneNumber, 'laoappsbuy');//laoappssell
        if (!isvalid) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid google token id',
            };
            return response.status(400).send(errorResponse);
        }
        const user = await this.UserVendorService.findOne({
            where: {
                phone: phoneNumber,
            },
        });
        if (!user) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid email Id',
            };
            return response.status(400).send(errorResponse);
        }
        // const tempPassword: any = Math.random().toString().substr(2, 5);
        // console.log(tempPassword);

        const password = await User_Vendor.hashPassword(verifiedCode);
        user.password = password;
        console.log(password);

        const updateUser = await this.UserVendorService.update(user.user_vendor_id, user);

        //const sendMailRes = await this.userService.create(user);

        // const emailContent = await this.emailTemplateService.findOne(2);
        // const message = emailContent.content.replace('{name}', user.firstName).replace('{xxxxxx}', tempPassword);
        // const sendMailRes = MAILService.passwordForgotMail(message , user.email , emailContent.subject);
        if (updateUser) {
            const successResponse: any = {
                status: 1,
                message: 'Your password has been sent to your email inbox.',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'error in sending email',
            };
            return response.status(400).send(errorResponse);
        }
    }

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

    @Put('/vendor-change-password')
    @Authorized()
    public async changePassword(@Body({ validate: true }) changePasswordParam: ChangePassword, @Req() request: any, @Res() response: any): Promise<any> {
        const user = await this.authService.parseBasicAuthFromRequest(request);
        const uservendor = await this.UserVendorService.findOne({
            where: {
                vendor_id: user.id,
            }
        });
        console.log("------------- new pw -----------------------------------------------------------------------------");
        console.log(uservendor);
        if (!uservendor) {
            const errResponse: any = {
                status: 0,
                message: 'Invalid userId',
            };
            return response.status(400).send(errResponse);
        }
        if (await User_Vendor.comparePassword(uservendor, changePasswordParam.oldPassword)) {
            const val = await User_Vendor.comparePassword(uservendor, changePasswordParam.newPassword);
            if (val) {
                const errResponse: any = {
                    status: 0,
                    message: 'Existing password and New password should not match',
                };
                return response.status(400).send(errResponse);
            }
            console.log("------------- new pw -----------------------------------------------------------------------------");
            console.log(changePasswordParam.newPassword);
            uservendor.password = await User_Vendor.hashPassword(changePasswordParam.newPassword);
            console.log("------------- pw -------------------------------------------------------------------");
            console.log(uservendor);
            const updateUser = await this.UserVendorService.update(uservendor.user_vendor_id, uservendor);
            if (updateUser) {
                console.log("------------- successfully -----------------------------------------------------------------------------");
                const successResponse: any = {
                    status: 1,
                    message: 'Your password changed successfully',
                };
                return response.status(200).send(successResponse);
            }
        }
        const errorResponse: any = {
            status: 0,
            message: 'Your old password is wrong',
        };
        return response.status(400).send(errorResponse);
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
    @Get('/logout')
    @Authorized()
    public async logout(@Req() request: any, @Res() response: any): Promise<any> {
        console.log('logout');
        console.log(request.user.userId);
        const user = await this.accessTokenService.findOne({
            where: {
                userId: request.user.userId,
            },
        });
        if (!user) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid token',
            };
            return response.status(400).send(errorResponse);
        }
        const deleteToken = await this.accessTokenService.delete(user);
        console.log('token' + deleteToken);
        if (!deleteToken) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully Logout',
            };
            return response.status(200).send(successResponse);
        }
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
    @Post('/vendor-edit-profile')
    @Authorized()
    public async editProfile(@Body({ validate: true }) editProfileParam: EditProfileRequest, @Res() response: any, @Req() request: any): Promise<any> {
        const vendor = await this.authService.parseBasicAuthFromRequest(request);
        const user = await this.VendorService.findOne({
            where: {
                vendor_id: vendor.id,
                //vendor_id: 10,
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
        const userSave = await this.VendorService.update(10, user);
        console.log('-------------------- userSave ------------------------------');
        console.log(userSave);
        if (userSave) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully updated profile',
                data: userSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to edit profile',
            };
            return response.status(400).send(errorResponse);
        }
    }

    @Post('/vendor-load-profile')
    @Authorized()
    public async loadProfile(@Res() response: any, @Req() request: any): Promise<any> {
        const vendor = await this.authService.parseBasicAuthFromRequest(request);
        console.log("------------------------------- user --------------------------------------");

        const user = await this.VendorService.findOne({
            where: {
                vendor_id: vendor.id,
                //vendor_id: request.user.userId,
            },
        });
        console.log(user);
        return response.status(200).send(user);


    }

    @Get('/get-vendor-profile')
    // @Authorized()
    public async load_Profile(@QueryParam('id') id: number, @Res() response: any, @Req() request: any): Promise<any> {
        // const vendor = await this.authService.parseBasicAuthFromRequest(request);
        console.log("------------------------------- user --------------------------------------");

        const user = await this.VendorService.findOne({
            where: {
                vendor_id: id,
                //vendor_id: request.user.userId,
            },
        });
        console.log(user);
        return response.status(200).send(user);


    }


    @Get('/vendor-name')
    public async vendorname(@QueryParam('id') id: any, @Req() request: any, @Res() response: any): Promise<any> {

        console.log("------------------------------- Param --------------------------------------");
        console.log(id);
        console.log("------------------------------- Param --------------------------------------");

        const uservendor = await this.VendorService.vendor_by_id(['vendor_id', 'vendor_name'], id);

        console.log(uservendor);
        if (!uservendor) {
            const errResponse: any = {
                status: 0,
                message: 'Invalid userId',
            };
            return response.status(400).send(errResponse);
        }

        return response.status(200).send(uservendor);



    }
}

