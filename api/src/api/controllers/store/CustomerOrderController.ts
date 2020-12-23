/*
 * spurtcommerce API
 * version 3.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {Post, JsonController, Req, Res, Get, QueryParam, Body, Authorized} from 'routing-controllers';
import {classToPlain} from 'class-transformer';
import {CustomerCheckoutRequest} from './requests/CustomerCheckoutRequest';
import {OrderService} from '../../services/OrderService';
import {OrderProductService} from '../../services/OrderProductService';
import {OrderTotalService} from '../../services/OrderTotalService';
import {Order} from '../../models/Order';
import {OrderProduct} from '../../models/OrderProduct';
import {OrderTotal} from '../../models/OrderTotal';
import {CustomerService} from '../../services/CustomerService';
import {MAILService} from '../../../auth/mail.services';
import {ProductService} from '../../services/ProductService';
import {ProductImageService} from '../../services/ProductImageService';
import {SettingService} from '../../services/SettingService';
import {EmailTemplateService} from '../../services/EmailTemplateService';
import {CountryService} from '../../services/CountryService';
import {UserService} from '../../services/UserService';
import {Customer} from '../../models/Customer';
import {PluginService} from '../../services/PluginService';
import { AuthService } from '../../../../src/auth/AuthService';
import { Container } from 'typedi';
import jwt from 'jsonwebtoken';
import {In} from 'typeorm';
// import { in } from 'sequelize/types/lib/operators';

@JsonController('/orders')
export class CustomerOrderController {
    authService = Container.get<AuthService>(AuthService);
    constructor(private orderService: OrderService, private orderProductService: OrderProductService, private orderTotalService: OrderTotalService,
                private customerService: CustomerService, private productService: ProductService, private productImageService: ProductImageService, private settingService: SettingService,
                private emailTemplateService: EmailTemplateService,
                private countryService: CountryService, private pluginService: PluginService,  private userService: UserService) {
    }

    // customer checkout
    /**
     * @api {post} /api/orders/customer-checkout Checkout
     * @apiGroup Store order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} productDetail Product Details
     * @apiParam (Request body) {Number} paymentMethod paymentMethod
     * @apiParam (Request body) {String} shippingFirstName Shipping First name
     * @apiParam (Request body) {String} shippingLastName Shipping Last Name
     * @apiParam (Request body) {String} shippingCompany Shipping Company
     * @apiParam (Request body) {String} shippingAddress_1 Shipping Address 1
     * @apiParam (Request body) {String} shippingAddress_2 Shipping Address 2
     * @apiParam (Request body) {String} shippingCity Shipping City
     * @apiParam (Request body) {Number} shippingPostCode Shipping PostCode
     * @apiParam (Request body) {String} shippingCountry Shipping Country
     * @apiParam (Request body) {String} shippingZone Shipping Zone
     * @apiParam (Request body) {String} shippingAddressFormat Shipping Address Format
     * @apiparam (Request body) {Number} phoneNumber Customer Phone Number
     * @apiparam (Request body) {String} emailId Customer Email Id
     * @apiparam (Request body) {String} password Customer password
     * @apiParamExample {json} Input
     * {
     *      "productDetail" :[
     *      {
     *      "productId" : "",
     *      "quantity" : "",
     *      "price" : "",
     *      "model" : "",
     *      "name" : "",
     *      }],
     *      "shippingFirstName" : "",
     *      "shippingLastName" : "",
     *      "shippingCompany" : "",
     *      "shippingAddress_1" : "",
     *      "shippingAddress_2" : "",
     *      "shippingCity" : "",
     *      "shippingPostCode" : "",
     *      "shippingCountry" : "",
     *      "shippingZone" : "",
     *      "shippingAddressFormat" : "",
     *      "phoneNumber" : "",
     *      "emailId" : "",
     *      "password" : "",
     *      "paymentMethod" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Check Out the product successfully And Send order detail in your mail ..!!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/orders/customer-checkout
     * @apiErrorExample {json} Checkout error
     * HTTP/1.1 500 Internal Server Error
     */
    // Customer Checkout Function
    @Post('/customer-checkout')
    public async customerCheckout(@Body({validate: true}) checkoutParam: CustomerCheckoutRequest, @Res() response: any, @Req() request: any): Promise<any> {
        console.log('---------------- api customer-checkout -----------------------');
        console.log(checkoutParam);
        const newOrder: any = new Order();
        const newOrderTotal = new OrderTotal();
        let orderProduct = [];
        let i;
        let n;
        let totalProductAmount;
        let totalAmount = 0;
        const productDetailData = [];
        console.log('---------------- if authorization -----------------------');
        if (request.header('authorization')) {
            let customerId;
            jwt.verify(request.header('authorization').split(' ')[1], '123##$$)(***&', (err, decoded) => {
                if (err) {
                    console.log(err);
                }
                customerId = decoded.id;
                console.log(customerId);
            });
           
            newOrder.customerId = customerId;
        } else {
            console.log('---------------- else authorization -----------------------');
            const customerEmail = await this.customerService.findOne({
                where: {
                    email: checkoutParam.emailId,
                    deleteFlag: 0,
                },
            });
            if (customerEmail === undefined) {
                console.log('---------------- if customerEmail -----------------------');
                if (checkoutParam.password) {
                    const newUser = new Customer();
                    newUser.firstName = checkoutParam.shippingFirstName;
                    newUser.password = await Customer.hashPassword(checkoutParam.password);
                    newUser.email = checkoutParam.emailId;
                    newUser.username = checkoutParam.emailId;
                    newUser.mobileNumber = checkoutParam.phoneNumber;
                    newUser.isActive = 1;
                    newUser.ip = (request.headers['x-forwarded-for'] ||
                        request.connection.remoteAddress ||
                        request.socket.remoteAddress ||
                        request.connection.socket.remoteAddress).split(',')[0];
                    const resultDatas = await this.customerService.create(newUser);
                    const emailContents = await this.emailTemplateService.findOne(1);
                    const message = emailContents.content.replace('{name}', resultDatas.firstName);
                    MAILService.registerMail(message, resultDatas.email, emailContents.subject);
                    newOrder.customerId = resultDatas.id;
                } else {
                    newOrder.customerId = 0;
                }
            } else {
                const errorResponse: any = {
                    status: 0,
                    message: 'Please login for checkout, emailId already exist',
                };
                return response.status(400).send(errorResponse);
            }
        }
        console.log('----------------  newOrder object -----------------------');
        // newOrder.customerId = request.user.id;
        newOrder.email = checkoutParam.emailId;
        newOrder.telephone = checkoutParam.phoneNumber;
        newOrder.shippingFirstname = checkoutParam.shippingFirstName;
        newOrder.shippingLastname = checkoutParam.shippingLastName;
        newOrder.shippingAddress1 = checkoutParam.shippingAddress_1;
        newOrder.shippingAddress2 = checkoutParam.shippingAddress_2;
        newOrder.shippingCompany = checkoutParam.shippingCompany;
        newOrder.shippingCity = checkoutParam.shippingCity;
        newOrder.shippingCountry = checkoutParam.shippingCountry;
        newOrder.shippingZone = checkoutParam.shippingZone;
        newOrder.shippingPostcode = checkoutParam.shippingPostCode;
        newOrder.shippingAddressFormat = checkoutParam.shippingAddressFormat;
        newOrder.paymentFirstname = checkoutParam.shippingFirstName;
        newOrder.paymentLastname = checkoutParam.shippingLastName;
        newOrder.paymentAddress1 = checkoutParam.shippingAddress_1;
        newOrder.paymentAddress2 = checkoutParam.shippingAddress_2;
        newOrder.paymentCompany = checkoutParam.shippingCompany;
        newOrder.paymentCity = checkoutParam.shippingCity;
        newOrder.paymentCountry = checkoutParam.shippingCountry;
        newOrder.paymentZone = checkoutParam.shippingZone;
        newOrder.paymentPostcode = checkoutParam.shippingPostCode;
        newOrder.isActive = 1;
        newOrder.vendor = checkoutParam.vendor;
        newOrder.type = 0;
        
       
        orderProduct = checkoutParam.productDetails;
        let productIds:number[] = [];

        for (i = 0; i < orderProduct.length; i++){
            productIds.push(orderProduct[i].productId);
        }

        const product = await this.productService.find({
            where: {
                productId:In(productIds),
            },
        });

        for (let i = 0; i < product.length; i++) {
            const element = product[i];
            for (let j = 0; j < orderProduct.length; j++) {
                const e = orderProduct[j];
                if(element.quantity < e.quantity ||element.quantity ===0 ){

                    const successResponse: any = {
                        status: 0,
                        message: ' Product '+e.name+' Have Quantity :'+element.quantity
                        
                    };
                    return response.status(402).send(successResponse);
                }  
            }
            
        }

       



        console.log('----------------  settingService findOne -----------------------');
        const setting = await this.settingService.findOne();
        newOrder.orderStatusId = setting.orderStatus;
        newOrder.invoicePrefix = setting.invoicePrefix;
        newOrder.paymentAddressFormat = checkoutParam.shippingAddressFormat;
        console.log('----------------  create newOrder -----------------------');
        console.log(newOrder);
        const orderData = await this.orderService.create(newOrder);
        console.log('----------------  create countryName -----------------------');
        const countryName = await this.countryService.findOne(orderData.shippingCountry);
        console.log('----------------  create countryName -----------------------');
        orderData.shippingCountry = countryName.name;
      
        console.log(checkoutParam.productDetails);
        console.log('---------------- for -----------------------');
        for (i = 0; i < orderProduct.length; i++) {
            const productDetails = new OrderProduct();
            productDetails.productId = orderProduct[i].productId;
            productDetails.name = orderProduct[i].name;
            productDetails.orderId = orderData.orderId;
            productDetails.quantity = orderProduct[i].quantity;
            productDetails.productPrice = orderProduct[i].price;
            productDetails.total = +orderProduct[i].quantity * +orderProduct[i].price;
            productDetails.model = orderProduct[i].model;
            productDetails.status = 0;
            const product = await this.productService.findOne({
                where: {
                    productId: productDetails.productId,
                    stock_status_id:79,

                },
            });
            if(product){
                console.log('---------------- product findOne -----------------------');
                console.log(product);
                console.log('---------------- product qty -----------------------');
                const qty = product.quantity - productDetails.quantity;
                product.quantity = qty;
                console.log(product.quantity = qty);
                console.log('---------------- product qty2 -----------------------');
                console.log(product.quantity);
                const productSave = await this.productService.create(product);
                if(productSave) {
                    console.log('product updated successfully ');
                } else {
                    console.log('unable to update product ');
                }

            }
           

            const productInformation = await this.orderProductService.createData(productDetails);
            const productImageData = await this.productService.findOne(productInformation.productId);
            const productImageDetail = await this.productImageService.findOne({where: {productId: productInformation.productId}});
            productImageData.productInformationData = productInformation;
            productImageData.productImage = productImageDetail;
            totalProductAmount = await this.orderProductService.findData(orderProduct[i].productId, orderData.orderId, productInformation.orderProductId);
            for (n = 0; n < totalProductAmount.length; n++) {
                totalAmount += +totalProductAmount[n].total;
            }
            productDetailData.push(productImageData);
        }
        console.log('---------------- end for -----------------------');
        newOrder.total = totalAmount;
        newOrder.invoiceNo = 'INV00'.concat(orderData.orderId);
        const nowDate = new Date();
        const orderDate = nowDate.getFullYear() + ('0' + (nowDate.getMonth() + 1)).slice(-2) + ('0' + nowDate.getDate()).slice(-2);
        newOrder.orderPrefixId = setting.invoicePrefix.concat('-' + orderDate + orderData.orderId);
        const resultData = await this.orderService.update(orderData.orderId, newOrder);
        newOrderTotal.orderId = orderData.orderId;
        newOrderTotal.value = totalAmount;
        await this.orderTotalService.createOrderTotalData(newOrderTotal);
        const plugin = await this.pluginService.findOne({where: {id: checkoutParam.paymentMethod}});

        console.log('---------------- if CashOnDelivery -----------------------');
        if (plugin.pluginName === 'CashOnDelivery') {
            const emailContent = await this.emailTemplateService.findOne(5);
            const adminEmailContent = await this.emailTemplateService.findOne(6);
            const today = ('0' + nowDate.getDate()).slice(-2) + '.' + ('0' + (nowDate.getMonth() + 1)).slice(-2) + '.' + nowDate.getFullYear();
            const customerFirstName = orderData.shippingFirstname;
            const customerLastName = orderData.shippingLastname;
            const customerName = customerFirstName + ' ' + customerLastName;
            const adminMessage = adminEmailContent.content.replace('{name}', customerName).replace('{orderId}', orderData.orderId);
            const customerMessage = emailContent.content.replace('{name}', customerName);
            const adminId: any = [];
            const adminUser = await this.userService.findAll({select: ['username'], where: {userGroupId : 1, deleteFlag: 0}});
            console.log('---------------- for user -----------------------');
            for (const user of adminUser) {
                const val = user.username;
                adminId.push(val);
            }
            console.log('---------------- end for user -----------------------');
            MAILService.adminOrderMail(adminMessage, orderData, adminEmailContent.subject, productDetailData, today, adminId);
            MAILService.customerOrderMail(customerMessage, orderData, emailContent.subject, productDetailData, today);
            const successResponse: any = {
                status: 1,
                message: 'You successfully checked out the product and order details send to your mail',
                data: resultData,
            };
            return response.status(200).send(successResponse);
        } else {
            console.log('---------------- else CashOnDelivery -----------------------');
            const pluginInfo = JSON.parse(plugin.pluginAdditionalInfo);
            console.log(request.headers);

            const route = request.headers.host + pluginInfo.processRoute + '/' + orderData.orderPrefixId;
            const successResponse: any = {
                status: 3,
                message: 'Redirect to this url',
                data: route,
            };
            return response.status(200).send(successResponse);

        }
    }

    @Post('/pos-checkout')
    @Authorized()
    public async posCheckout(@Body({validate: true}) checkoutParam: CustomerCheckoutRequest, @Res() response: any, @Req() request: any): Promise<any> {
        console.log('---------------- api pos-checkout -----------------------');
        console.log(checkoutParam);

        
        const user = await this.authService.parseBasicAuthFromRequest(request);
        const newOrder: any = new Order();
        const newOrderTotal = new OrderTotal();
        let orderProduct = [];
        let i;
        let n;
        let totalProductAmount;
        let totalAmount = 0;
        const productDetailData = [];
        console.log('---------------- if authorization -----------------------');
        if (request.header('authorization')) {
            let customerId;
            jwt.verify(request.header('authorization').split(' ')[1], '123##$$)(***&', (err, decoded) => {
                if (err) {
                    console.log(err);
                }
                customerId = decoded.id;
                console.log(customerId);
            });
           
            newOrder.customerId = customerId;
        } else {
            console.log('---------------- else authorization -----------------------');
            const customerEmail = await this.customerService.findOne({
                where: {
                    email: checkoutParam.emailId,
                    deleteFlag: 0,
                },
            });
            if (customerEmail === undefined) {
                console.log('---------------- if customerEmail -----------------------');
                if (checkoutParam.password) {
                    const newUser = new Customer();
                    newUser.firstName = checkoutParam.shippingFirstName;
                    newUser.password = await Customer.hashPassword(checkoutParam.password);
                    newUser.email = checkoutParam.emailId;
                    newUser.username = checkoutParam.emailId;
                    newUser.mobileNumber = checkoutParam.phoneNumber;
                    newUser.isActive = 1;
                    newUser.ip = (request.headers['x-forwarded-for'] ||
                        request.connection.remoteAddress ||
                        request.socket.remoteAddress ||
                        request.connection.socket.remoteAddress).split(',')[0];
                    const resultDatas = await this.customerService.create(newUser);
                    const emailContents = await this.emailTemplateService.findOne(1);
                    const message = emailContents.content.replace('{name}', resultDatas.firstName);
                    MAILService.registerMail(message, resultDatas.email, emailContents.subject);
                    newOrder.customerId = resultDatas.id;
                } else {
                    newOrder.customerId = 0;
                }
            } else {
                const errorResponse: any = {
                    status: 0,
                    message: 'Please login for checkout, emailId already exist',
                };
                return response.status(400).send(errorResponse);
            }
        }
        console.log('----------------  newOrder object -----------------------');
        // newOrder.customerId = request.user.id;
        newOrder.email = checkoutParam.emailId;
        newOrder.telephone = checkoutParam.phoneNumber;
        newOrder.shippingFirstname = checkoutParam.shippingFirstName;
        newOrder.shippingLastname = checkoutParam.shippingLastName;
        newOrder.shippingAddress1 = checkoutParam.shippingAddress_1;
        newOrder.shippingAddress2 = checkoutParam.shippingAddress_2;
        newOrder.shippingCompany = checkoutParam.shippingCompany;
        newOrder.shippingCity = checkoutParam.shippingCity;
        newOrder.shippingCountry = checkoutParam.shippingCountry;
        newOrder.shippingZone = checkoutParam.shippingZone;
        newOrder.shippingPostcode = checkoutParam.shippingPostCode;
        newOrder.shippingAddressFormat = checkoutParam.shippingAddressFormat;
        newOrder.paymentFirstname = checkoutParam.shippingFirstName;
        newOrder.paymentLastname = checkoutParam.shippingLastName;
        newOrder.paymentAddress1 = checkoutParam.shippingAddress_1;
        newOrder.paymentAddress2 = checkoutParam.shippingAddress_2;
        newOrder.paymentCompany = checkoutParam.shippingCompany;
        newOrder.paymentCity = checkoutParam.shippingCity;
        newOrder.paymentCountry = checkoutParam.shippingCountry;
        newOrder.paymentZone = checkoutParam.shippingZone;
        newOrder.paymentPostcode = checkoutParam.shippingPostCode;
        newOrder.isActive = 1;
        newOrder.discount = checkoutParam.discount;
        newOrder.vendor = user.id;
        newOrder.type = 1;
        //newOrder.vendor = checkoutParam.vendor;
        console.log('----------------  settingService findOne -----------------------');
        const setting = await this.settingService.findOne();
        //newOrder.orderStatusId = setting.orderStatus;
        newOrder.orderStatusId = 7;
        newOrder.invoicePrefix = setting.invoicePrefix;
        newOrder.paymentAddressFormat = checkoutParam.shippingAddressFormat;
        console.log('----------------  create newOrder -----------------------');
        console.log(newOrder);
        const orderData = await this.orderService.create(newOrder);
        console.log('----------------  create countryName -----------------------');
        const countryName = await this.countryService.findOne(orderData.shippingCountry);
        console.log('----------------  create countryName -----------------------');
        orderData.shippingCountry = countryName.name;
        orderProduct = checkoutParam.productDetails;
        console.log(checkoutParam.productDetails);
        console.log('---------------- for -----------------------');
        for (i = 0; i < orderProduct.length; i++) {
            const productDetails = new OrderProduct();
            productDetails.productId = orderProduct[i].productId;
            productDetails.name = orderProduct[i].name;
            productDetails.orderId = orderData.orderId;
            productDetails.quantity = orderProduct[i].quantity;
            productDetails.productPrice = orderProduct[i].price;
            productDetails.total = +orderProduct[i].quantity * +orderProduct[i].price;
            productDetails.model = orderProduct[i].model;
            productDetails.status = orderProduct[i].status;
            const product = await this.productService.findOne({
                where: {
                    productId: productDetails.productId,
                },
            });
            console.log('---------------- product findOne -----------------------');
            console.log(product);
            console.log('---------------- product qty -----------------------');
            const qty = product.quantity - productDetails.quantity;
            product.quantity = qty;
            console.log(product.quantity = qty);
            console.log('---------------- product qty2 -----------------------');
            console.log(product.quantity);
            const productSave = await this.productService.create(product);
            if(productSave) {
                console.log('product updated successfully ');
            } else {
                console.log('unable to update product ');
            }

            const productInformation = await this.orderProductService.createData(productDetails);
            const productImageData = await this.productService.findOne(productInformation.productId);
            const productImageDetail = await this.productImageService.findOne({where: {productId: productInformation.productId}});
            productImageData.productInformationData = productInformation;
            productImageData.productImage = productImageDetail;
            totalProductAmount = await this.orderProductService.findData(orderProduct[i].productId, orderData.orderId, productInformation.orderProductId);
            for (n = 0; n < totalProductAmount.length; n++) {
                totalAmount += +totalProductAmount[n].total;
            }
            productDetailData.push(productImageData);
        }
        console.log('---------------- end for -----------------------');
        newOrder.total = totalAmount;
        newOrder.invoiceNo = 'INVP00'.concat(orderData.orderId);
        const nowDate = new Date();
        const orderDate = nowDate.getFullYear() + ('0' + (nowDate.getMonth() + 1)).slice(-2) + ('0' + nowDate.getDate()).slice(-2);
        newOrder.orderPrefixId = setting.invoicePrefix.concat('-' + orderDate + orderData.orderId);
        const resultData = await this.orderService.update(orderData.orderId, newOrder);
        resultData.orderProduct = orderProduct;
        newOrderTotal.orderId = orderData.orderId;
        newOrderTotal.value = totalAmount;
        await this.orderTotalService.createOrderTotalData(newOrderTotal);
        const plugin = await this.pluginService.findOne({where: {id: checkoutParam.paymentMethod}});

        console.log('---------------- if CashOnDelivery -----------------------');
        if (plugin.pluginName === 'CashOnDelivery') {
            const emailContent = await this.emailTemplateService.findOne(5);
            const adminEmailContent = await this.emailTemplateService.findOne(6);
            const today = ('0' + nowDate.getDate()).slice(-2) + '.' + ('0' + (nowDate.getMonth() + 1)).slice(-2) + '.' + nowDate.getFullYear();
            const customerFirstName = orderData.shippingFirstname;
            const customerLastName = orderData.shippingLastname;
            const customerName = customerFirstName + ' ' + customerLastName;
            const adminMessage = adminEmailContent.content.replace('{name}', customerName).replace('{orderId}', orderData.orderId);
            const customerMessage = emailContent.content.replace('{name}', customerName);
            const adminId: any = [];
            const adminUser = await this.userService.findAll({select: ['username'], where: {userGroupId : 1, deleteFlag: 0}});
            console.log('---------------- for user -----------------------');
            for (const user of adminUser) {
                const val = user.username;
                adminId.push(val);
            }
            console.log('---------------- end for user -----------------------');
            MAILService.adminOrderMail(adminMessage, orderData, adminEmailContent.subject, productDetailData, today, adminId);
            MAILService.customerOrderMail(customerMessage, orderData, emailContent.subject, productDetailData, today);
            const successResponse: any = {
                status: 1,
                message: 'You successfully checked out the product and order details send to your mail',
                data: resultData,
            };
            return response.status(200).send(successResponse);
        } else {
            console.log('---------------- else CashOnDelivery -----------------------');
            const pluginInfo = JSON.parse(plugin.pluginAdditionalInfo);
            console.log(request.headers);

            const route = request.headers.host + pluginInfo.processRoute + '/' + orderData.orderPrefixId;
            const successResponse: any = {
                status: 3,
                message: 'Redirect to this url',
                data: route,
            };
            return response.status(200).send(successResponse);

        }
    }

    @Post('/import-checkout')
    @Authorized()
    public async importCheckout(@Body({validate: true}) checkoutParam: CustomerCheckoutRequest, @Res() response: any, @Req() request: any): Promise<any> {
        console.log('---------------- api pos-checkout -----------------------');
        console.log(checkoutParam);
        const user = await this.authService.parseBasicAuthFromRequest(request);
        const newOrder: any = new Order();
        const newOrderTotal = new OrderTotal();
        let orderProduct = [];
        let i;
        let n;
        let totalProductAmount;
        let totalAmount = 0;
        const productDetailData = [];
        console.log('---------------- if authorization -----------------------');
        if (request.header('authorization')) {
            let customerId;
            jwt.verify(request.header('authorization').split(' ')[1], '123##$$)(***&', (err, decoded) => {
                if (err) {
                    console.log(err);
                }
                customerId = decoded.id;
                console.log(customerId);
            });
           
            newOrder.customerId = customerId;
        } else {
            console.log('---------------- else authorization -----------------------');
            const customerEmail = await this.customerService.findOne({
                where: {
                    email: checkoutParam.emailId,
                    deleteFlag: 0,
                },
            });
            if (customerEmail === undefined) {
                console.log('---------------- if customerEmail -----------------------');
                if (checkoutParam.password) {
                    const newUser = new Customer();
                    newUser.firstName = checkoutParam.shippingFirstName;
                    newUser.password = await Customer.hashPassword(checkoutParam.password);
                    newUser.email = checkoutParam.emailId;
                    newUser.username = checkoutParam.emailId;
                    newUser.mobileNumber = checkoutParam.phoneNumber;
                    newUser.isActive = 1;
                    newUser.ip = (request.headers['x-forwarded-for'] ||
                        request.connection.remoteAddress ||
                        request.socket.remoteAddress ||
                        request.connection.socket.remoteAddress).split(',')[0];
                    const resultDatas = await this.customerService.create(newUser);
                    const emailContents = await this.emailTemplateService.findOne(1);
                    const message = emailContents.content.replace('{name}', resultDatas.firstName);
                    MAILService.registerMail(message, resultDatas.email, emailContents.subject);
                    newOrder.customerId = resultDatas.id;
                } else {
                    newOrder.customerId = 0;
                }
            } else {
                const errorResponse: any = {
                    status: 0,
                    message: 'Please login for checkout, emailId already exist',
                };
                return response.status(400).send(errorResponse);
            }
        }
        console.log('----------------  newOrder object -----------------------');
        // newOrder.customerId = request.user.id;
        newOrder.email = checkoutParam.emailId;
        newOrder.telephone = checkoutParam.phoneNumber;
        newOrder.shippingFirstname = checkoutParam.shippingFirstName;
        newOrder.shippingLastname = checkoutParam.shippingLastName;
        newOrder.shippingAddress1 = checkoutParam.shippingAddress_1;
        newOrder.shippingAddress2 = checkoutParam.shippingAddress_2;
        newOrder.shippingCompany = checkoutParam.shippingCompany;
        newOrder.shippingCity = checkoutParam.shippingCity;
        newOrder.shippingCountry = checkoutParam.shippingCountry;
        newOrder.shippingZone = checkoutParam.shippingZone;
        newOrder.shippingPostcode = checkoutParam.shippingPostCode;
        newOrder.shippingAddressFormat = checkoutParam.shippingAddressFormat;
        newOrder.paymentFirstname = checkoutParam.shippingFirstName;
        newOrder.paymentLastname = checkoutParam.shippingLastName;
        newOrder.paymentAddress1 = checkoutParam.shippingAddress_1;
        newOrder.paymentAddress2 = checkoutParam.shippingAddress_2;
        newOrder.paymentCompany = checkoutParam.shippingCompany;
        newOrder.paymentCity = checkoutParam.shippingCity;
        newOrder.paymentCountry = checkoutParam.shippingCountry;
        newOrder.paymentZone = checkoutParam.shippingZone;
        newOrder.paymentPostcode = checkoutParam.shippingPostCode;
        newOrder.isActive = 1;
        newOrder.type = 2;
        newOrder.vendor = user.id;
        //newOrder.vendor = checkoutParam.vendor;
        console.log('----------------  settingService findOne -----------------------');
        const setting = await this.settingService.findOne();
        //newOrder.orderStatusId = setting.orderStatus;
        newOrder.orderStatusId = 5;
        newOrder.invoicePrefix = setting.invoicePrefix;
        newOrder.paymentAddressFormat = checkoutParam.shippingAddressFormat;
        console.log('----------------  create newOrder -----------------------');
        console.log(newOrder);
        const orderData = await this.orderService.create(newOrder);
        console.log('----------------  create countryName -----------------------');
        const countryName = await this.countryService.findOne(orderData.shippingCountry);
        console.log('----------------  create countryName -----------------------');
        orderData.shippingCountry = countryName.name;
        orderProduct = checkoutParam.productDetails;
        console.log(checkoutParam.productDetails);
        console.log('---------------- for -----------------------');
        for (i = 0; i < orderProduct.length; i++) {
            const productDetails = new OrderProduct();
            productDetails.productId = orderProduct[i].productId;
            productDetails.name = orderProduct[i].name;
            productDetails.orderId = orderData.orderId;
            productDetails.quantity = orderProduct[i].quantity;
            productDetails.productPrice = orderProduct[i].price;
            productDetails.total = +orderProduct[i].quantity * +orderProduct[i].price;
            productDetails.model = orderProduct[i].model;
            productDetails.status = 0;
            const product = await this.productService.findOne({
                where: {
                    productId: productDetails.productId,
                },
            });
            console.log('---------------- product findOne -----------------------');
            console.log(product);
            console.log('---------------- product qty -----------------------');
            const qty = product.quantity + productDetails.quantity;
            product.quantity = qty;
            console.log(product.quantity = qty);
            console.log('---------------- product qty2 -----------------------');
            console.log(product.quantity);
            const productSave = await this.productService.create(product);
            if(productSave) {
                console.log('product updated successfully ');
            } else {
                console.log('unable to update product ');
            }

            const productInformation = await this.orderProductService.createData(productDetails);
            const productImageData = await this.productService.findOne(productInformation.productId);
            const productImageDetail = await this.productImageService.findOne({where: {productId: productInformation.productId}});
            productImageData.productInformationData = productInformation;
            productImageData.productImage = productImageDetail;
            totalProductAmount = await this.orderProductService.findData(orderProduct[i].productId, orderData.orderId, productInformation.orderProductId);
            for (n = 0; n < totalProductAmount.length; n++) {
                totalAmount += +totalProductAmount[n].total;
            }
            productDetailData.push(productImageData);
        }
        console.log('---------------- end for -----------------------');
        newOrder.total = totalAmount;
        newOrder.invoiceNo = 'INVP00'.concat(orderData.orderId);
        const nowDate = new Date();
        const orderDate = nowDate.getFullYear() + ('0' + (nowDate.getMonth() + 1)).slice(-2) + ('0' + nowDate.getDate()).slice(-2);
        newOrder.orderPrefixId = setting.invoicePrefix.concat('-' + orderDate + orderData.orderId);
        const resultData = await this.orderService.update(orderData.orderId, newOrder);
        newOrderTotal.orderId = orderData.orderId;
        newOrderTotal.value = totalAmount;
        await this.orderTotalService.createOrderTotalData(newOrderTotal);
        const plugin = await this.pluginService.findOne({where: {id: checkoutParam.paymentMethod}});

        console.log('---------------- if CashOnDelivery -----------------------');
        if (plugin.pluginName === 'CashOnDelivery') {
            const emailContent = await this.emailTemplateService.findOne(5);
            const adminEmailContent = await this.emailTemplateService.findOne(6);
            const today = ('0' + nowDate.getDate()).slice(-2) + '.' + ('0' + (nowDate.getMonth() + 1)).slice(-2) + '.' + nowDate.getFullYear();
            const customerFirstName = orderData.shippingFirstname;
            const customerLastName = orderData.shippingLastname;
            const customerName = customerFirstName + ' ' + customerLastName;
            const adminMessage = adminEmailContent.content.replace('{name}', customerName).replace('{orderId}', orderData.orderId);
            const customerMessage = emailContent.content.replace('{name}', customerName);
            const adminId: any = [];
            const adminUser = await this.userService.findAll({select: ['username'], where: {userGroupId : 1, deleteFlag: 0}});
            console.log('---------------- for user -----------------------');
            for (const user of adminUser) {
                const val = user.username;
                adminId.push(val);
            }
            console.log('---------------- end for user -----------------------');
            MAILService.adminOrderMail(adminMessage, orderData, adminEmailContent.subject, productDetailData, today, adminId);
            MAILService.customerOrderMail(customerMessage, orderData, emailContent.subject, productDetailData, today);
            const successResponse: any = {
                status: 1,
                message: 'You successfully checked out the product and order details send to your mail',
                data: resultData,
            };
            return response.status(200).send(successResponse);
        } else {
            console.log('---------------- else CashOnDelivery -----------------------');
            const pluginInfo = JSON.parse(plugin.pluginAdditionalInfo);
            console.log(request.headers);

            const route = request.headers.host + pluginInfo.processRoute + '/' + orderData.orderPrefixId;
            const successResponse: any = {
                status: 3,
                message: 'Redirect to this url',
                data: route,
            };
            return response.status(200).send(successResponse);

        }
    }

    @Post('/export-checkout')
    @Authorized()
    public async exportCheckout(@Body({validate: true}) checkoutParam: CustomerCheckoutRequest, @Res() response: any, @Req() request: any): Promise<any> {
        console.log('---------------- api pos-checkout -----------------------');
        console.log(checkoutParam);
        const user = await this.authService.parseBasicAuthFromRequest(request);
        const newOrder: any = new Order();
        const newOrderTotal = new OrderTotal();
        let orderProduct = [];
        let i;
        let n;
        let totalProductAmount;
        let totalAmount = 0;
        const productDetailData = [];
        console.log('---------------- if authorization -----------------------');
        if (request.header('authorization')) {
            let customerId;
            jwt.verify(request.header('authorization').split(' ')[1], '123##$$)(***&', (err, decoded) => {
                if (err) {
                    console.log(err);
                }
                customerId = decoded.id;
                console.log(customerId);
            });
           
            newOrder.customerId = customerId;
        } else {
            console.log('---------------- else authorization -----------------------');
            const customerEmail = await this.customerService.findOne({
                where: {
                    email: checkoutParam.emailId,
                    deleteFlag: 0,
                },
            });
            if (customerEmail === undefined) {
                console.log('---------------- if customerEmail -----------------------');
                if (checkoutParam.password) {
                    const newUser = new Customer();
                    newUser.firstName = checkoutParam.shippingFirstName;
                    newUser.password = await Customer.hashPassword(checkoutParam.password);
                    newUser.email = checkoutParam.emailId;
                    newUser.username = checkoutParam.emailId;
                    newUser.mobileNumber = checkoutParam.phoneNumber;
                    newUser.isActive = 1;
                    newUser.ip = (request.headers['x-forwarded-for'] ||
                        request.connection.remoteAddress ||
                        request.socket.remoteAddress ||
                        request.connection.socket.remoteAddress).split(',')[0];
                    const resultDatas = await this.customerService.create(newUser);
                    const emailContents = await this.emailTemplateService.findOne(1);
                    const message = emailContents.content.replace('{name}', resultDatas.firstName);
                    MAILService.registerMail(message, resultDatas.email, emailContents.subject);
                    newOrder.customerId = resultDatas.id;
                } else {
                    newOrder.customerId = 0;
                }
            } else {
                const errorResponse: any = {
                    status: 0,
                    message: 'Please login for checkout, emailId already exist',
                };
                return response.status(400).send(errorResponse);
            }
        }
        console.log('----------------  newOrder object -----------------------');
        // newOrder.customerId = request.user.id;
        newOrder.email = checkoutParam.emailId;
        newOrder.telephone = checkoutParam.phoneNumber;
        newOrder.shippingFirstname = checkoutParam.shippingFirstName;
        newOrder.shippingLastname = checkoutParam.shippingLastName;
        newOrder.shippingAddress1 = checkoutParam.shippingAddress_1;
        newOrder.shippingAddress2 = checkoutParam.shippingAddress_2;
        newOrder.shippingCompany = checkoutParam.shippingCompany;
        newOrder.shippingCity = checkoutParam.shippingCity;
        newOrder.shippingCountry = checkoutParam.shippingCountry;
        newOrder.shippingZone = checkoutParam.shippingZone;
        newOrder.shippingPostcode = checkoutParam.shippingPostCode;
        newOrder.shippingAddressFormat = checkoutParam.shippingAddressFormat;
        newOrder.paymentFirstname = checkoutParam.shippingFirstName;
        newOrder.paymentLastname = checkoutParam.shippingLastName;
        newOrder.paymentAddress1 = checkoutParam.shippingAddress_1;
        newOrder.paymentAddress2 = checkoutParam.shippingAddress_2;
        newOrder.paymentCompany = checkoutParam.shippingCompany;
        newOrder.paymentCity = checkoutParam.shippingCity;
        newOrder.paymentCountry = checkoutParam.shippingCountry;
        newOrder.paymentZone = checkoutParam.shippingZone;
        newOrder.paymentPostcode = checkoutParam.shippingPostCode;
        newOrder.isActive = 1;
        newOrder.vendor = user.id;
        newOrder.type = 3;
        //newOrder.vendor = checkoutParam.vendor;
        console.log('----------------  settingService findOne -----------------------');
        const setting = await this.settingService.findOne();
        //newOrder.orderStatusId = setting.orderStatus;
        newOrder.orderStatusId = 6;
        newOrder.invoicePrefix = setting.invoicePrefix;
        newOrder.paymentAddressFormat = checkoutParam.shippingAddressFormat;
        console.log('----------------  create newOrder -----------------------');
        console.log(newOrder);
        const orderData = await this.orderService.create(newOrder);
        console.log('----------------  create countryName -----------------------');
        const countryName = await this.countryService.findOne(orderData.shippingCountry);
        console.log('----------------  create countryName -----------------------');
        orderData.shippingCountry = countryName.name;
        orderProduct = checkoutParam.productDetails;
        console.log(checkoutParam.productDetails);
        console.log('---------------- for -----------------------');
        for (i = 0; i < orderProduct.length; i++) {
            
            const productDetails = new OrderProduct();
            productDetails.productId = orderProduct[i].productId;
            productDetails.name = orderProduct[i].name;
            productDetails.orderId = orderData.orderId;
            productDetails.quantity = orderProduct[i].quantity;
            productDetails.productPrice = orderProduct[i].price;
            productDetails.total = +orderProduct[i].quantity * +orderProduct[i].price;
            productDetails.model = orderProduct[i].model;
            productDetails.status = 0;
            const product = await this.productService.findOne({
                where: {
                    productId: productDetails.productId,
                },
            });
            console.log('---------------- product findOne -----------------------');
            console.log(product);
            console.log('---------------- product qty -----------------------');
            const qty = product.quantity - productDetails.quantity;
            product.quantity = qty;
            console.log(product.quantity = qty);
            console.log('---------------- product qty2 -----------------------');
            console.log(product.quantity);
            const productSave = await this.productService.create(product);
            if(productSave) {
                console.log('product updated successfully ');
            } else {
                console.log('unable to update product ');
            }

            const productInformation = await this.orderProductService.createData(productDetails);
            const productImageData = await this.productService.findOne(productInformation.productId);
            const productImageDetail = await this.productImageService.findOne({where: {productId: productInformation.productId}});
            productImageData.productInformationData = productInformation;
            productImageData.productImage = productImageDetail;
            totalProductAmount = await this.orderProductService.findData(orderProduct[i].productId, orderData.orderId, productInformation.orderProductId);
            for (n = 0; n < totalProductAmount.length; n++) {
                totalAmount += +totalProductAmount[n].total;
            }
            productDetailData.push(productImageData);
        }
        console.log('---------------- end for -----------------------');
        newOrder.total = totalAmount;
        newOrder.invoiceNo = 'INVP00'.concat(orderData.orderId);
        const nowDate = new Date();
        const orderDate = nowDate.getFullYear() + ('0' + (nowDate.getMonth() + 1)).slice(-2) + ('0' + nowDate.getDate()).slice(-2);
        newOrder.orderPrefixId = setting.invoicePrefix.concat('-' + orderDate + orderData.orderId);
        const resultData = await this.orderService.update(orderData.orderId, newOrder);
        newOrderTotal.orderId = orderData.orderId;
        newOrderTotal.value = totalAmount;
        await this.orderTotalService.createOrderTotalData(newOrderTotal);
        const plugin = await this.pluginService.findOne({where: {id: checkoutParam.paymentMethod}});

        console.log('---------------- if CashOnDelivery -----------------------');
        if (plugin.pluginName === 'CashOnDelivery') {
            const emailContent = await this.emailTemplateService.findOne(5);
            const adminEmailContent = await this.emailTemplateService.findOne(6);
            const today = ('0' + nowDate.getDate()).slice(-2) + '.' + ('0' + (nowDate.getMonth() + 1)).slice(-2) + '.' + nowDate.getFullYear();
            const customerFirstName = orderData.shippingFirstname;
            const customerLastName = orderData.shippingLastname;
            const customerName = customerFirstName + ' ' + customerLastName;
            const adminMessage = adminEmailContent.content.replace('{name}', customerName).replace('{orderId}', orderData.orderId);
            const customerMessage = emailContent.content.replace('{name}', customerName);
            const adminId: any = [];
            const adminUser = await this.userService.findAll({select: ['username'], where: {userGroupId : 1, deleteFlag: 0}});
            console.log('---------------- for user -----------------------');
            for (const user of adminUser) {
                const val = user.username;
                adminId.push(val);
            }
            console.log('---------------- end for user -----------------------');
            MAILService.adminOrderMail(adminMessage, orderData, adminEmailContent.subject, productDetailData, today, adminId);
            MAILService.customerOrderMail(customerMessage, orderData, emailContent.subject, productDetailData, today);
            const successResponse: any = {
                status: 1,
                message: 'You successfully checked out the product and order details send to your mail',
                data: resultData,
            };
            return response.status(200).send(successResponse);
        } else {
            console.log('---------------- else CashOnDelivery -----------------------');
            const pluginInfo = JSON.parse(plugin.pluginAdditionalInfo);
            console.log(request.headers);

            const route = request.headers.host + pluginInfo.processRoute + '/' + orderData.orderPrefixId;
            const successResponse: any = {
                status: 3,
                message: 'Redirect to this url',
                data: route,
            };
            return response.status(200).send(successResponse);

        }
    }

    // Customer Order List API
    /**
     * @api {get} /api/orders/order-list My Order List
     * @apiGroup Store order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully show the Order List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/orders/order-list
     * @apiErrorExample {json} Order List error
     * HTTP/1.1 500 Internal Server Error
     */
    // Order List Function
    @Get('/order-list')
    @Authorized('customer')
    public async orderList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const search = [
            {
                name: 'customerId',
                op: 'where',
                value: request.user.id,
            },
        ];
        const whereConditions = 0;
        const select = ['orderId', 'customerId', 'currencyId', 'orderStatus', 'total', 'createdDate', 'orderPrefixId','vendor'];
        const relation = ['orderStatus'];
        const OrderData = await this.orderService.list(limit, offset, select, search, whereConditions, relation, count);
        if (count) {
            const Response: any = {
                status: 1,
                message: 'Successfully get Count. ',
                data: OrderData,
            };
            return response.status(200).send(Response);
        }
        const promises = OrderData.map(async (results: any) => {
            const Id = results.orderId;
            const countValue = await this.orderProductService.findAndCount({where: {orderId: Id}});
            results.items = countValue[1];
            return results;
        });
        const result = await Promise.all(promises);
        const successResponse: any = {
            status: 1,
            message: 'Successfully shown the order list. ',
            data: classToPlain(result),
        };
        return response.status(200).send(successResponse);
    }

    // Customer Order Detail API
    /**
     * @api {get} /api/orders/order-detail My OrderDetail
     * @apiGroup Store order
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} orderId Order Id
     * @apiParamExample {json} Input
     * {
     *      "orderId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully show the Order Detail..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/orders/order-detail
     * @apiErrorExample {json} Order Detail error
     * HTTP/1.1 500 Internal Server Error
     */
    // Order Detail Function
    @Get('/order-detail')
    @Authorized('customer')
    public async orderDetail(@QueryParam('orderId') orderid: number, @Req() request: any, @Res() response: any): Promise<any> {
        const orderData = await this.orderService.findOrder({
            where: {orderId: orderid},
            select: ['orderId', 'orderStatusId', 'orderPrefixId', 'customerId', 'invoiceNo', 'telephone', 'shippingFirstname', 'shippingLastname', 'shippingCompany', 'shippingAddress1',
                'shippingAddress2', 'shippingCity', 'shippingZone', 'shippingPostcode', 'shippingCountry', 'shippingAddressFormat',
                'paymentFirstname', 'paymentLastname', 'paymentCompany', 'paymentAddress1', 'paymentAddress2', 'paymentCity',
                'paymentPostcode', 'paymentCountry', 'paymentZone', 'paymentAddressFormat', 'total', 'createdDate'],
        });
         orderData.productList = await this.orderProductService.find({
                where: {orderId: orderid},
                select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice'],
            });
        const successResponse: any = {
            status: 1,
            message: 'Successfully shown the order Detail. ',
            data: orderData,
        };
        return response.status(200).send(successResponse);
    }
}
