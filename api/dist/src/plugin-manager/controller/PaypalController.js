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
const typeorm_1 = require("typeorm");
const Plugin_1 = require("../models/Plugin");
const Order_1 = require("../../api/models/Order");
const OrderProduct_1 = require("../../api/models/OrderProduct");
const EmailTemplate_1 = require("../../api/models/EmailTemplate");
const Product_1 = require("../../api/models/Product");
const ProductImage_1 = require("../../api/models/ProductImage");
const PaypalOrder_1 = require("../models/PaypalOrder");
const User_1 = require("../../api/models/User");
const PaypalOrderTransaction_1 = require("../models/PaypalOrderTransaction");
const env_1 = require("../../env");
const mail_services_1 = require("../../auth/mail.services");
const paypal = tslib_1.__importStar(require("paypal-rest-sdk"));
class PaypalController {
    static payPalSuccess(config, payerId, paymentId) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                paypal.configure(config);
                const execute_payment_json = {
                    payer_id: payerId,
                };
                paypal.payment.execute(paymentId, execute_payment_json, (error, payment) => {
                    if (error) {
                        console.log(error.response);
                        return reject(error);
                    }
                    else {
                        console.log('Get Payment Response');
                        console.log(JSON.stringify(payment));
                        return resolve(payment);
                    }
                });
            });
        });
    }
    constructor() {
        // ---
    }
    index(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const pluginRepository = typeorm_1.getManager().getRepository(Plugin_1.Plugins);
            const pluginDetail = yield pluginRepository.findOne({
                where: {
                    pluginName: 'paypal',
                },
            });
            if (!pluginDetail) {
                req.flash('errors', ['You not install this plugin. or problem in installation']);
                return res.redirect('/home');
            }
            const paypalAdditionalInfo = pluginDetail.pluginAdditionalInfo ? JSON.parse(pluginDetail.pluginAdditionalInfo) : {};
            res.render('pages/paypal/form', {
                title: 'Paypal',
                clientId: paypalAdditionalInfo.clientId ? paypalAdditionalInfo.clientId : '',
                clientSecret: paypalAdditionalInfo.clientSecret ? paypalAdditionalInfo.clientSecret : '',
                isTest: paypalAdditionalInfo.isTest,
            });
        });
    }
    updateSettings(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            req.assert('clientId', 'Client Id cannot be blank').notEmpty();
            req.assert('clientSecret', 'Client Secret cannot be blank').notEmpty();
            const errors = req.validationErrors();
            console.log(errors);
            if (errors) {
                req.flash('errors', errors);
                return res.redirect('/paypal');
            }
            const pluginRepository = typeorm_1.getManager().getRepository(Plugin_1.Plugins);
            const pluginDetail = yield pluginRepository.findOne({
                where: {
                    pluginName: 'paypal',
                },
            });
            if (!pluginDetail) {
                req.flash('errors', ['You not install this plugin. or problem in installation']);
                return res.redirect('/home');
            }
            const paypalAdditionalInfo = pluginDetail.pluginAdditionalInfo ? JSON.parse(pluginDetail.pluginAdditionalInfo) : {};
            paypalAdditionalInfo.clientId = req.body.clientId;
            paypalAdditionalInfo.clientSecret = req.body.clientSecret;
            paypalAdditionalInfo.isTest = req.body.isTest;
            pluginDetail.pluginAdditionalInfo = JSON.stringify(paypalAdditionalInfo);
            const saveResponse = yield pluginRepository.save(pluginDetail);
            if (saveResponse) {
                req.flash('success', ['Paypal settings updated successfully']);
                return res.redirect('/home');
            }
            req.flash('errors', ['Unable to update the paypal settings']);
            return res.redirect('/home');
        });
    }
    process(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orderPrefixId = req.params.orderPrefixId;
            const orderRepository = typeorm_1.getManager().getRepository(Order_1.Order);
            const order = yield orderRepository.findOne({ where: { orderPrefixId }, select: ['orderId'] });
            const orderId = order.orderId;
            const orderDetail = yield orderRepository.findOne(orderId);
            if (!orderDetail) {
                req.flash('errors', ['Invalid Order Id']);
                return res.redirect('/error');
            }
            const pluginRepository = typeorm_1.getManager().getRepository(Plugin_1.Plugins);
            const pluginDetail = yield pluginRepository.findOne({
                where: {
                    pluginName: 'paypal',
                },
            });
            if (!pluginDetail) {
                req.flash('errors', ['You not install this plugin. or problem in installation']);
                return res.redirect('/home');
            }
            res.render('pages/paypal/process', {
                title: 'Paypal',
                orderId,
                layout: 'pages/layouts/auth',
            });
        });
    }
    proceed(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const orderId = req.params.orderId;
            console.log(orderId);
            const orderRepository = typeorm_1.getManager().getRepository(Order_1.Order);
            const paypalOrderRepository = typeorm_1.getManager().getRepository(PaypalOrder_1.PaypalOrder);
            const orderProductRepository = typeorm_1.getManager().getRepository(OrderProduct_1.OrderProduct);
            const productRepository = typeorm_1.getManager().getRepository(Product_1.Product);
            const orderDetail = yield orderRepository.findOne(orderId);
            if (!orderDetail) {
                req.flash('errors', ['Invalid Order Id']);
                return res.redirect('/error');
            }
            const pluginRepository = typeorm_1.getManager().getRepository(Plugin_1.Plugins);
            const pluginDetail = yield pluginRepository.findOne({
                where: {
                    pluginName: 'paypal',
                },
            });
            if (!pluginDetail) {
                req.flash('errors', ['You not install this plugin. or problem in installation']);
                return res.redirect('/home');
            }
            const paypalAdditionalInfo = pluginDetail.pluginAdditionalInfo ? JSON.parse(pluginDetail.pluginAdditionalInfo) : {};
            paypal.configure({
                mode: paypalAdditionalInfo.isTest ? 'sandbox' : 'live',
                client_id: paypalAdditionalInfo.clientId,
                client_secret: paypalAdditionalInfo.clientSecret,
            });
            const product = yield orderProductRepository.find({ where: { orderId: orderDetail.orderId }, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice'] });
            const productVal = product.map((value) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const productDetail = yield productRepository.findOne({
                    where: { productId: value.productId },
                    select: ['name', 'quantity', 'minimumQuantity', 'image',
                        'imagePath', 'shipping', 'price', 'dateAvailable', 'amount', 'discount', 'isActive']
                });
                const tempVal = value;
                tempVal.productDetail = productDetail;
                return tempVal;
            }));
            const results = yield Promise.all(productVal);
            const items = [];
            results.forEach((element) => {
                const price = Math.round(element.productPrice * 100) / 100;
                items.push({
                    name: element.name,
                    price: price.toString(),
                    currency: 'USD',
                    quantity: element.quantity,
                });
            });
            const orderAmount = Math.round(orderDetail.total * 100) / 100;
            const create_payment_json = {
                intent: 'sale',
                payer: {
                    payment_method: 'paypal',
                },
                redirect_urls: {
                    return_url: 'http://' + req.headers.host + paypalAdditionalInfo.successRoute,
                    cancel_url: 'http://' + req.headers.host + paypalAdditionalInfo.cancelRoute,
                },
                transactions: [{
                        item_list: {
                            items,
                        },
                        amount: {
                            currency: 'USD',
                            total: orderAmount.toString(),
                        },
                        description: 'Product you ordered',
                    }],
            };
            console.log(JSON.stringify(create_payment_json));
            paypal.payment.create(create_payment_json, (error, payment) => {
                if (error) {
                    throw error;
                }
                else {
                    const paypalParams = new PaypalOrder_1.PaypalOrder();
                    paypalParams.orderId = orderDetail.orderId;
                    paypalParams.paypalRefId = payment.id;
                    paypalParams.total = orderAmount.toString();
                    paypalParams.status = 0;
                    paypalOrderRepository.save(paypalParams).then((val) => {
                        // ---
                        console.log(val);
                        for (const item of payment.links) {
                            // Redirect user to this endpoint for redirect url
                            if (item.rel === 'approval_url') {
                                res.redirect(item.href);
                            }
                        }
                        console.log(payment);
                    }).catch((err) => {
                        console.error(err);
                    });
                }
            });
        });
    }
    success(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const pluginRepository = typeorm_1.getManager().getRepository(Plugin_1.Plugins);
            const EmailTemplateRepository = typeorm_1.getManager().getRepository(EmailTemplate_1.EmailTemplate);
            const orderProductRepository = typeorm_1.getManager().getRepository(OrderProduct_1.OrderProduct);
            const productImageRepository = typeorm_1.getManager().getRepository(ProductImage_1.ProductImage);
            const productRepository = typeorm_1.getManager().getRepository(Product_1.Product);
            const userRepository = typeorm_1.getManager().getRepository(User_1.User);
            const pluginDetail = yield pluginRepository.findOne({
                where: {
                    pluginName: 'paypal',
                },
            });
            if (!pluginDetail) {
                req.flash('errors', ['You not install this plugin. or problem in installation']);
                return res.redirect('/home');
            }
            const paypalAdditionalInfo = pluginDetail.pluginAdditionalInfo ? JSON.parse(pluginDetail.pluginAdditionalInfo) : {};
            const config = {
                mode: paypalAdditionalInfo.isTest ? 'sandbox' : 'live',
                client_id: paypalAdditionalInfo.clientId,
                client_secret: paypalAdditionalInfo.clientSecret,
            };
            const paymentDetails = yield PaypalController.payPalSuccess(config, req.query.PayerID, req.query.paymentId);
            const paypalOrderRepository = typeorm_1.getManager().getRepository(PaypalOrder_1.PaypalOrder);
            const paypalOrderTransactionRepository = typeorm_1.getManager().getRepository(PaypalOrderTransaction_1.PaypalOrderTransaction);
            console.log(paymentDetails);
            const paypalDetail = yield paypalOrderRepository.findOne({
                where: {
                    paypalRefId: paymentDetails.id,
                },
            });
            if (!paypalDetail) {
                req.flash('errors', ['Invalid Payment Details']);
                return res.redirect('/error');
            }
            const orderRepository = typeorm_1.getManager().getRepository(Order_1.Order);
            const orderData = yield orderRepository.findOne(paypalDetail.orderId);
            if (!orderData) {
                req.flash('errors', ['Invalid Order Id']);
                return res.redirect('/error');
            }
            const orderStatus = yield orderRepository.findOne({ where: { orderId: paypalDetail.orderId, paymentFlag: 1 } });
            if (orderStatus) {
                req.flash('errors', ['Already Paid for this Order']);
                return res.redirect('/error');
            }
            const paidDetails = paymentDetails.transactions[0].related_resources[0];
            console.log(paidDetails.sale.amount.total + 'paidDetails');
            console.log(paypalDetail.total + 'total');
            const intvalue = Math.round(paidDetails.sale.amount.total);
            if (paidDetails.sale.state === 'completed' && intvalue === +paypalDetail.total) {
                const transactionsParams = new PaypalOrderTransaction_1.PaypalOrderTransaction();
                transactionsParams.paymentType = paidDetails.sale.payment_mode;
                transactionsParams.paypalOrderId = paypalDetail.id;
                transactionsParams.paymentData = JSON.stringify(paymentDetails);
                transactionsParams.paymentStatus = 1;
                yield paypalOrderTransactionRepository.save(transactionsParams);
                paypalDetail.status = 1;
                yield paypalOrderRepository.save(paypalDetail);
                orderData.paymentFlag = 1;
                yield orderRepository.save(orderData);
                const productDetailData = [];
                let i;
                const orderProduct = yield orderProductRepository.find({ where: { orderId: orderData.orderId }, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice'] });
                for (i = 0; i < orderProduct.length; i++) {
                    const productInformation = yield orderProductRepository.findOne({ where: { orderProductId: orderProduct[i].orderProductId }, select: ['orderProductId', 'orderId', 'productId', 'name', 'model', 'quantity', 'total', 'productPrice'] });
                    const productImageData = yield productRepository.findOne(productInformation.productId);
                    const productImageDetail = yield productImageRepository.findOne({ where: { productId: productInformation.productId } });
                    productImageData.productInformationData = productInformation;
                    productImageData.productImage = productImageDetail;
                    productDetailData.push(productImageData);
                }
                const emailContent = yield EmailTemplateRepository.findOne(5);
                const adminEmailContent = yield EmailTemplateRepository.findOne(6);
                const nowDate = new Date();
                const today = ('0' + nowDate.getDate()).slice(-2) + '.' + ('0' + (nowDate.getMonth() + 1)).slice(-2) + '.' + nowDate.getFullYear();
                const customerFirstName = orderData.shippingFirstname;
                const customerLastName = orderData.shippingLastname;
                const customerName = customerFirstName + ' ' + customerLastName;
                const adminMessage = adminEmailContent.content.replace('{name}', customerName).replace('{orderId}', orderData.orderId);
                const customerMessage = emailContent.content.replace('{name}', customerName);
                const adminId = [];
                const adminUser = yield userRepository.find({ select: ['username'], where: { userGroupId: 1 } });
                for (const user of adminUser) {
                    const val = user.username;
                    adminId.push(val);
                }
                mail_services_1.MAILService.adminOrderMail(adminMessage, orderData, adminEmailContent.subject, productDetailData, today, adminId);
                mail_services_1.MAILService.customerOrderMail(customerMessage, orderData, emailContent.subject, productDetailData, today);
            }
            else {
                const transactionsParams = new PaypalOrderTransaction_1.PaypalOrderTransaction();
                transactionsParams.paymentType = 'FAILURE';
                transactionsParams.paypalOrderId = paypalDetail.id;
                transactionsParams.paymentData = JSON.stringify(paymentDetails);
                transactionsParams.paymentStatus = 2;
                yield paypalOrderTransactionRepository.save(transactionsParams);
                paypalDetail.status = 2;
                yield paypalOrderRepository.save(paypalDetail);
                orderData.paymentFlag = 2;
                yield orderRepository.save(orderData);
            }
            res.render('pages/paypal/success', {
                title: 'Paypal',
                storeUrl: env_1.env.storeUrl + paypalDetail.orderId,
                layout: 'pages/layouts/auth',
            });
        });
    }
    cancel(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            res.render('pages/paypal/cancel', {
                title: 'Paypal',
                layout: 'pages/layouts/auth',
            });
        });
    }
}
exports.PaypalController = PaypalController;
//# sourceMappingURL=PaypalController.js.map