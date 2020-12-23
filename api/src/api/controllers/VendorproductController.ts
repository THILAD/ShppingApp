/*
 * spurtcommerce API
 * version 3.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import 'reflect-metadata';
import {
    Get,
    JsonController,
    Authorized,
    QueryParam,
    Res,
    Body,
    Req,
    Post,
    Param,
    Put, Delete
} from 'routing-controllers';
import { ProductService } from '../services/ProductService';
import { ProductToCategoryService } from '../services/ProductToCategoryService';
import { ProductImageService } from '../services/ProductImageService';
import { Product } from '../models/Product';
import { classToPlain } from 'class-transformer';
import { DeleteProductRequest } from './requests/DeleteProductRequest';
import { AddProductRequest } from './requests/CreateProductRequest';
import { UpdateProductRequest } from './requests/UpdateProductRequest';
import { ProductToCategory } from '../models/ProductToCategory';
import { ProductImage } from '../models/ProductImage';
import { CategoryService } from '../services/CategoryService';
import { OrderProductService } from '../services/OrderProductService';
import { OrderService } from '../services/OrderService';
import { ProductRelated } from '../models/ProductRelated';
import { ProductRelatedService } from '../services/ProductRelatedService';
import { UpdateTodayDealsParam } from './requests/UpdateTodayDealsParam';
import { ProductViewLogService } from '../services/ProductViewLogService';
import { VendorService } from '../services/VendorService';
import moment = require('moment');
import fs = require('fs');
import { Container } from 'typedi';
import { AuthService } from '../../../src/auth/AuthService';
// instant object
// import { userEntity, dbConnection, DBs } from '../entities/index';
// // factory
// import { UserEntity, UserModel } from '../entities/User.Entity';
// import { Op } from 'sequelize';
// import { QueryTypes } from 'sequelize';
// import { Model } from 'sequelize';
// import { User } from '../models/User';

@JsonController('/vendor-product')
export class VendorProductController {
    authService = Container.get<AuthService>(AuthService);
    constructor(private productService: ProductService,
        private vendorService: VendorService,
        private productToCategoryService: ProductToCategoryService,
        private productImageService: ProductImageService,
        private categoryService: CategoryService,
        private orderProductService: OrderProductService,
        private orderService: OrderService,
        private productRelatedService: ProductRelatedService,
        private productViewLogService: ProductViewLogService

    ) {
    }


    // Product List API
    /**
     * @api {get} /api/product/productlist Product List API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} sku sku
     * @apiParam (Request body) {String} status status
     * @apiParam (Request body) {Number} price=1/2 if 1->asc 2->desc
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get product list",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/product/productlist
     * @apiErrorExample {json} productList error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/productlist')
    @Authorized()
    public async productList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('sku') sku: string, @QueryParam('status') status: string, @QueryParam('price') price: number, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<Product> {

        // 1. query from table 
        // insert
        // userEntity.create({userName:'',password:'').then(r=>{
        // let x = r;
        // delete x.id;
        // response.send(x);
        // })


        // let u = request.body as UserModel;
        // userEntity.create(u).then(r=>{
        // let x = r;
        // delete x.id;
        // response.send(x);
        // });

        // let u = request.body as UserModel;
        // let uEnt =userEntity.build(u);
        // //uEnt.password
        // uEnt.save().then(r=>{
        //     // let x = r;
        //     // delete x.id;
        //     // response.send(x);
        // });
        // let transaction = await dbConnection.transaction();
        // userEntity.create({}as UserModel,{transaction}).then(r=>{
        //     userEntity.create({}as UserModel,{transaction}).then(async r=>{

        //         await transaction.commit();
        //     });
        // })

        // update
        // let u = request.body as UserModel;
        // userEntity.findByPk(u.id).then(r => {
        //     if (r) {

        //     } else {

        //     }
        // });
        // userEntity.findOne({ where: { phoneNumber: u.phoneNumber } }).then(r => {
        //     userEntity.findAndCountAll({ where: { totalBalance: { [Op.gte]: r.totalSpent } } }).then(r2 => {

        //     });
        //     let ids = [1, 2, 3, 4];
        //     userEntity.findAll({ where: { id: { [Op.in]: ids } } }).then(r2 => {

        //     })

        //     let fromDate = new Date();
        //     let endDate = new Date();
        //     let limit = request.body.limit;
        //     let skip = request.body.skip;
        //     let offset = limit * skip;
        //     userEntity.findAndCountAll({
        //         where:
        //         {
        //             createdAt:
        //                 { [Op.between]: [fromDate, endDate] }
        //         }, offset: offset, limit
        //     }).then(r => {

        //     });
        //     userEntity.findOne({where:{userName:u.userName}}).then(r=>{
        //         if(r){
        //             if(r.validPassword(u.password)){
        //                 response.send({});
        //             }else{
        //                 response.send({message:'login failed'});
        //             }
        //         }else{
        //             response.send({message:'user not exist'});
        //         }
        //     })

        // })
        // delete
        // let u = request.body as UserModel;
        // userEntity.findByPk(u.id).then(r=>{
        //     if(r){
        //         r.destroy();
        //         response.send()
        //     }else{
        //         response.send({error:'user not found'});
        //     }
        // })
        //userEntity.bulkCreate([] as UserModel[])
        // subquery 
        // const tempSQL = dbConnection.query(
        //     'SELECT *, (SELECT SUM("Orders"."amount") FROM "Orders" WHERE "Orders"."CustomerId" = "Customer"."id") AS "totalAmount" FROM "Customers" AS "Customer";',

        // ); // to remove the ';' from the end of the SQL

        // userEntity.findAll( {
        //     where: {
        //         id: {
        //               [Op.notIn]: dbConnection.Sequelize.literal(`(${tempSQL})`)
        //         }
        //     } 
        // } );
        // userEntity.findAll({where:{}})
        // let u = request.body as UserModel[];
        // dbConnection.query('sql query',{raw:true,type:QueryTypes.SELECT}).then(function(data){
        //     let x = data as UserModel [];

        // })
        // find


        // 2. create new table 
        // let newUserEntity = UserEntity('NewUserTable',dbConnection);
        // await newUserEntity.sync();






        console.log('------------- productlist ---------------');

        const user = await this.authService.parseBasicAuthFromRequest(request);
        console.log('------------- ' + user.id + ' ---------------');
        const select = ['productId', 'sku', 'name', 'quantity', 'price', 'image', 'imagePath', 'todayDeals', 'isActive', 'vendor'];

        const relation = [];

        const WhereConditions = [

            {
                name: 'name',
                op: 'like',
                value: keyword,
            }, {
                name: 'sku',
                op: 'like',
                value: sku,
            }, {
                name: 'isActive',
                op: 'like',
                value: status,
            },

        ];

        const productLists: any = await this.productService.list_vendor(limit, offset, select, relation, WhereConditions, 0, price, count, user.id);
        console.log(productLists);

        if (count) {
            const successRes: any = {
                status: 1,
                message: 'Successfully got count ',
                data: productLists,
            };
            return response.status(200).send(successRes);
        }
        const productList = productLists.map(async (value: any) => {
            const defaultValue = await this.productImageService.findOne({
                where: {
                    productId: value.productId,
                    defaultImage: 1,
                },
            });
            const temp: any = value;
            temp.productImage = defaultValue;
            return temp;
        });
        const results = await Promise.all(productList);

        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete product list. ',
            data: classToPlain(results),
        };
        return response.status(200).send(successResponse);
    }
    // Product List API
    /**
     * @api {get} /api/product/productlist-vendor Product List API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} sku sku
     * @apiParam (Request body) {String} status status
     * @apiParam (Request body) {Number} price=1/2 if 1->asc 2->desc
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get product list",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/product/productlist
     * @apiErrorExample {json} productList error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/productlist-vendor')

    public async productlistvendor(@QueryParam('limit') limit: number,
        @QueryParam('vendorid') vendorid: number,
        @QueryParam('offset') offset: number,
        @QueryParam('keyword') keyword: string,
        @QueryParam('sku') sku: string,
        @QueryParam('status') status: string,
        @QueryParam('price') price: number,
        @QueryParam('count') count: number | boolean,
        @Req() request: any,
        @Res() response: any): Promise<Product> {

        //const user = await this.authService.parseBasicAuthFromRequest(request);
        const select = ['productId', 'sku', 'name', 'quantity', 'price', 'image', 'imagePath', 'todayDeals', 'isActive', 'vendor'];

        const relation = [];

        const WhereConditions = [
            {
                name: 'name',
                op: 'like',
                value: keyword,
            }, {
                name: 'sku',
                op: 'like',
                value: sku,
            }, {
                name: 'isActive',
                op: 'like',
                value: status,
            },
        ];
        const productLists: any = await this.productService.list_vendor(limit, offset, select, relation, WhereConditions, 0, price, count, vendorid);
        console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++pl+++++++++++++++++++++++++++++++++')
        console.log('product list', vendorid, classToPlain(productLists));
        if (!productLists) {
            const successResponse: any = {
                status: 0,
                message: 'error list product of vendor. ',
                data: classToPlain(productLists),
            };
            return response.status(401).send(successResponse);;
        }
        if (count) {
            const successRes: any = {
                status: 1,
                message: 'Successfully got count ',
                data: productLists,
            };
            return response.status(200).send(successRes);
        }
        const productList = productLists.map(async (value: any) => {
            const defaultValue = await this.productImageService.findOne({
                where: {
                    productId: value.productId,
                    defaultImage: 1,
                },
            });
            const temp: any = value;
            temp.productImage = defaultValue;
            return temp;
        });
        const results = await Promise.all(productList);

        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete product list. ',
            data: classToPlain(results),
        };
        return response.status(200).send(successResponse);
    }

    @Get('/category-product-list')
    @Authorized()
    public async categoryProductList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string,
        @QueryParam('manufacturerId') manufacturerId: number, @QueryParam('categoryId') categoryId: string, @QueryParam('priceFrom') priceFrom: string,
        @QueryParam('priceTo') priceTo: string, @QueryParam('price') price: string, @QueryParam('condition') condition: number, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const user = await this.authService.parseBasicAuthFromRequest(request);

        const vendor = await this.vendorService.findOne({
            where: [
                { vendor_id: user.id }

            ],
        });
        console.log('+++++++++++++++++++++++++++++',vendor.vendor_id);
        console.log('+++++++++++++++++++++++++++++',user);
        
        return new Promise(async () => {
            const productList: any = await this.productService.categoryProductList(limit, offset, categoryId, manufacturerId, condition, keyword, priceFrom, priceTo, price,vendor.vendor_id);
            const promises = productList.map(async (result: any) => {
                const productImage = await this.productImageService.findOne({
                    select: ['productId', 'image', 'containerName', 'defaultImage'],
                    where: {
                        productId: result.productId,
                        defaultImage: 1,
                    },
                });
                const temp: any = result;
                temp.images = productImage;
                return temp;
            });
            const finalResult = await
                Promise.all(promises);
            const successResponse: any = {
                status: 1,
                message: 'Successfully got the complete list of products.',
                data: finalResult,
            };
            return response.status(200).send(successResponse);
        });
    }




    @Get('/produc-category')
    @Authorized()
    public async product_by_category(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('sku') sku: string, @QueryParam('status') status: string, @QueryParam('price') price: number, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<Product> {

        const user = await this.authService.parseBasicAuthFromRequest(request);

        const vendor = await this.vendorService.findOne({
            where: [
                { vendor_id: user.id }

            ],
        });
        console.log('-------user------');

        console.log(user);
        console.log('-------vendor------');
        console.log(vendor);



        const select = ['product_id', 'sku', 'name', 'quantity', 'price', 'image', 'imagePath', 'todayDeals', 'isActive', 'vendor'];

        const relation = [];

        const WhereConditions = [

            {
                name: 'name',
                op: 'like',
                value: keyword,
            }, {
                name: 'sku',
                op: 'like',
                value: sku,
            }, {
                name: 'isActive',
                op: 'like',
                value: status,
            },

        ];
        const productLists: any = await this.productService.productList_bycategory(select, relation, WhereConditions, 13, count, vendor.vendor_id);
        if (count) {
            const successRes: any = {
                status: 1,
                message: 'Successfully got count ',
                data: productLists,
            };
            return response.status(200).send(successRes);
        }
        const productList = productLists.map(async (value: any) => {
            const defaultValue = await this.productImageService.findOne({
                where: {
                    productId: value.productId,
                    defaultImage: 1,
                },
            });
            const temp: any = value;
            temp.productImage = defaultValue;
            return temp;
        });
        const results = await Promise.all(productList);

        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete product list. ',
            data: classToPlain(results),
        };
        return response.status(200).send(successResponse);
    }




    // Product List API
    /**
     * @api {get} /api/product/productlist Product List API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {String} keyword keyword
     * @apiParam (Request body) {String} sku sku
     * @apiParam (Request body) {String} status status
     * @apiParam (Request body) {Number} price=1/2 if 1->asc 2->desc
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get product list",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/product/productlist
     * @apiErrorExample {json} productList error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/productminimum')
    @Authorized()
    public async productminimum(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('keyword') keyword: string, @QueryParam('sku') sku: string, @QueryParam('status') status: string, @QueryParam('price') price: number, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<Product> {

        const user = await this.authService.parseBasicAuthFromRequest(request);

        const vendor = await this.vendorService.findOne({
            where: [
                { vendor_id: user.id }

            ],
        });
        console.log('-------user------');

        console.log(user);
        console.log('-------vendor------');
        console.log(vendor);



        const select = ['productId', 'sku', 'name', 'quantity', 'price', 'image', 'imagePath', 'todayDeals', 'isActive', 'vendor'];

        const relation = [];

        const WhereConditions = [

            {
                name: 'name',
                op: 'like',
                value: keyword,
            }, {
                name: 'sku',
                op: 'like',
                value: sku,
            }, {
                name: 'isActive',
                op: 'like',
                value: status,
            },

        ];
        const productLists: any = await this.productService.list_item_minimum_vendor(limit, offset, select, relation, WhereConditions, 0, price, count, vendor.vendor_id, vendor.minimum);
        if (count) {
            const successRes: any = {
                status: 1,
                message: 'Successfully got count ',
                data: productLists,
            };
            return response.status(200).send(successRes);
        }
        const productList = productLists.map(async (value: any) => {
            const defaultValue = await this.productImageService.findOne({
                where: {
                    productId: value.productId,
                    defaultImage: 1,
                },
            });
            const temp: any = value;
            temp.productImage = defaultValue;
            return temp;
        });
        const results = await Promise.all(productList);

        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete product list. ',
            data: classToPlain(results),
        };
        return response.status(200).send(successResponse);
    }

    // Create Product API
    /**
     * @api {post} /api/product/add-product Add Product API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} productName productName
     * @apiParam (Request body) {String} productDescription productDescription
     * @apiParam (Request body) {String} sku stock keeping unit
     * @apiParam (Request body) {String} upc upc
     * @apiParam (Request body) {String} image product Image
     * @apiParam (Request body) {String} metaTagTitle metaTagTitle
     * @apiParam (Request body) {String} categoryId CategoryId
     * @apiParam (Request body) {String} relatedProductId relatedProductId
     * @apiParam (Request body) {Number}  model model
     * @apiParam (Request body) {String} location location
     * @apiParam (Request body) {String} price price
     * @apiParam (Request body) {Number} outOfStockStatus outOfStockStatus
     * @apiParam (Request body) {Number} requiredShipping requiredShipping
     * @apiParam (Request body) {String} dateAvailable dateAvailable
     * @apiParam (Request body) {Number} condition 1->new 2->used
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {Number} sortOrder sortOrder
     * @apiParamExample {json} Input
     * {
     *      "productName" : "",
     *      "productDescription" : "",
     *      "sku" : "",
     *      "image" : "",
     *      "metaTagTitle" : "",
     *      "categoryId" : "",
     *      "upc" : "",
     *      "model" : "",
     *      "price" : "",
     *      "location" : "",
     *      "outOfStockStatus" : "",
     *      "requiredShipping" : "",
     *      "dateAvailable" : "",
     *      "status" : "",
     *      "outOfStockStatus" : "",
     *      "sortOrder" : "",
     *      "condition" : "",
     *      "image":[
     *      {
     *      "image":""
     *      "containerName":""
     *      "defaultImage":""
     *      }
     *      ]
     *     "relatedProductId":[ ]
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully created new product.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/product/add-product
     * @apiErrorExample {json} AddProduct error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/add-product')
    @Authorized()

    public async addProduct(@Body({ validate: true }) product: AddProductRequest, @Req() request: any, @Res() response: any): Promise<any> {

        const user = await this.authService.parseBasicAuthFromRequest(request);

        const newProduct: any = new Product();
        newProduct.name = product.productName;
        newProduct.description = product.productDescription;
        newProduct.sku = product.sku;
        newProduct.upc = product.upc;
        newProduct.location = product.location;
        newProduct.price = product.price;
        newProduct.quantity = product.quantity;
        newProduct.minimumQuantity = product.minimumQuantity;
        newProduct.stockStatusId = product.outOfStockStatus;
        newProduct.shipping = product.requiredShipping;
        newProduct.dateAvailable = moment(product.dateAvailable).toISOString();
        newProduct.metaTagTitle = product.metaTagTitle;
        newProduct.condition = product.condition;
        newProduct.manufacturerId = product.model;
        newProduct.isActive = product.status;
        newProduct.todayDeals = 0;
        newProduct.vendor = user.id;
        newProduct.forsell = product.forsell;
        newProduct.online = product.online;
        const saveProduct = await this.productService.create(newProduct);
        console.log('------------------ product.relatedProductId ----------------------------------------');

        console.log(product.relatedProductId);
        console.log('------------------ product.relatedProductId ----------------------------------------');
        // Add related product
        if (product.relatedProductId) {
            const relatedProduct: any = product.relatedProductId;
            for (const relatedproduct of relatedProduct) {
                const newRelatedProduct: any = new ProductRelated();
                newRelatedProduct.productId = saveProduct.productId;
                newRelatedProduct.relatedProductId = relatedproduct;
                this.productRelatedService.create(newRelatedProduct);
            }
        }

        // save category
        if (product.categoryId) {
            const category = product.categoryId;
            for (const categoryId of category) {
                const newProductToCategory: any = new ProductToCategory();
                newProductToCategory.productId = saveProduct.productId;
                newProductToCategory.categoryId = categoryId;
                newProductToCategory.isActive = 1;
                this.productToCategoryService.create(newProductToCategory);
            }
        }

        // Save products Image
        const productImage: any = product.image;
        for (const imageRow of productImage) {
            const imageData = JSON.stringify(imageRow);
            const imageResult = JSON.parse(imageData);
            const newProductImage = new ProductImage();
            newProductImage.productId = saveProduct.productId;
            newProductImage.image = imageResult.image;
            newProductImage.containerName = imageResult.containerName;
            newProductImage.defaultImage = imageResult.defaultImage;
            this.productImageService.create(newProductImage);
        }

        if (saveProduct) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully created Product',
                data: saveProduct,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to create Product',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // update Product API
    /**
     * @api {post} /api/product/update-product/:id Update Product API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} productId productId
     * @apiParam (Request body) {String} productName productName
     * @apiParam (Request body) {String} productDescription productDescription
     * @apiParam (Request body) {String} sku stock keeping unit
     * @apiParam (Request body) {String} upc upc
     * @apiParam (Request body) {String} image product Image
     * @apiParam (Request body) {String} metaTagTitle metaTagTitle
     * @apiParam (Request body) {String} categoryId CategoryId
     * @apiParam (Request body) {String} relatedProductId relatedProductId
     * @apiParam (Request body) {Number}  model model
     * @apiParam (Request body) {String} location location
     * @apiParam (Request body) {String} price price
     * @apiParam (Request body) {Number} outOfStockStatus outOfStockStatus
     * @apiParam (Request body) {Number} requiredShipping requiredShipping
     * @apiParam (Request body) {String} dateAvailable dateAvailable
     * @apiParam (Request body) {String} condition 1->new 2->used
     * @apiParam (Request body) {Number} status status
     * @apiParam (Request body) {Number} sortOrder sortOrder
     * @apiParamExample {json} Input
     * {
     *      "productName" : "",
     *      "productDescription" : "",
     *      "sku" : "",
     *      "image" : "",
     *      "metaTagTitle" : "",
     *      "categoryId" : "",
     *      "upc" : "",
     *      "model" : "",
     *      "price" : "",
     *      "location" : "",
     *      "outOfStockStatus" : "",
     *      "requiredShipping" : "",
     *      "dateAvailable" : "",
     *      "status" : "",
     *      "outOfStockStatus" : "",
     *      "condition" : "",
     *      "sortOrder" : "",
     *      "image":[
     *      {
     *      "image":""
     *      "containerName":""
     *      "defaultImage":""
     *      }
     *      ],
     *       "relatedProductId":[ "", ""],
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated product.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/product/update-product/:id
     * @apiErrorExample {json} updateProduct error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/update-product/:id')
    @Authorized()
    public async updateProduct(@Body({ validate: true }) product: UpdateProductRequest, @Res() response: any): Promise<any> {
        console.log('---------------------------------------------------------------');
        console.log(product);
        const updateProduct: any = await this.productService.findOne({
            where: {
                productId: product.productId,
            },
        });
        if (!updateProduct) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid productId',
            };
            return response.status(400).send(errorResponse);
        }
        updateProduct.name = product.productName;
        updateProduct.description = product.productDescription;
        updateProduct.sku = product.sku;
        updateProduct.upc = product.upc;
        updateProduct.location = product.location;
        updateProduct.price = product.price;
        updateProduct.stockStatusId = product.outOfStockStatus;
        updateProduct.shipping = product.requiredShipping;
        updateProduct.dateAvailable = moment(product.dateAvailable).toISOString();
        updateProduct.metaTagTitle = product.metaTagTitle;
        updateProduct.manufacturerId = product.model;
        updateProduct.condition = product.condition;
        updateProduct.isActive = product.status;
        updateProduct.sortOrder = product.sortOrder;
        updateProduct.forsell = product.forsell;
        updateProduct.online = product.online;
        console.log('---------------------------------------------------');
        console.log(updateProduct);
        const saveProduct = await this.productService.create(updateProduct);

        // delete previous category
        this.productToCategoryService.delete({ productId: saveProduct.productId });

        // save category
        if (product.categoryId) {
            const category = product.categoryId;
            for (const categoryId of category) {
                const newProductToCategory: any = new ProductToCategory();
                newProductToCategory.productId = saveProduct.productId;
                newProductToCategory.categoryId = categoryId;
                newProductToCategory.isActive = 1;
                this.productToCategoryService.create(newProductToCategory);
            }
        }

        const findProduct: any = await this.productRelatedService.findOne({
            where: {
                productId: saveProduct.productId,
            },
        });

        console.log('------------------ product.relatedProductId ----------------------------------------');

        console.log(product.relatedProductId);
        console.log('------------------ product.relatedProductId ----------------------------------------');

        if (findProduct) {

            // delete previous related product
            this.productRelatedService.delete({ productId: saveProduct.productId });

            console.log('------------------ product.relatedProductId ----------------------------------------');

            console.log(product.relatedProductId);
            console.log('------------------ product.relatedProductId ----------------------------------------');
            // update related product
            if (product.relatedProductId) {
                const relatedProduct: any = product.relatedProductId;
                for (const relatedproduct of relatedProduct) {
                    const newRelatedProduct: any = new ProductRelated();
                    newRelatedProduct.productId = saveProduct.productId;
                    newRelatedProduct.relatedProductId = relatedproduct;
                    this.productRelatedService.create(newRelatedProduct);
                }
            }
        } else {


            console.log('------------------ product.relatedProductId ----------------------------------------');

            console.log(product.relatedProductId);
            console.log('------------------ product.relatedProductId ----------------------------------------');
            // update related product
            if (product.relatedProductId) {
                const relatedProduct: any = product.relatedProductId;
                for (const relatedproduct of relatedProduct) {
                    const newRelatedProduct: any = new ProductRelated();
                    newRelatedProduct.productId = saveProduct.productId;
                    newRelatedProduct.relatedProductId = relatedproduct;
                    this.productRelatedService.create(newRelatedProduct);
                }
            }

        }

        // Delete previous images
        this.productImageService.delete({ productId: saveProduct.productId });
        // Save products Image
        if (product.image) {
            const productImage: any = product.image;
            for (const imageRow of productImage) {
                const imageData = JSON.stringify(imageRow);
                const imageResult = JSON.parse(imageData);
                const newProductImage = new ProductImage();
                newProductImage.productId = saveProduct.productId;
                newProductImage.image = imageResult.image;
                newProductImage.containerName = imageResult.containerName;
                newProductImage.defaultImage = imageResult.defaultImage;
                this.productImageService.create(newProductImage);
            }
        }

        if (saveProduct) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully updated Product',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to updated Product',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Product Detail API
    /**
     * @api {get} /api/product/product-detail/:id Product Detail API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get product Detail",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/product/product-detail/:id
     * @apiErrorExample {json} productDetail error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/product-detail/:id')
    @Authorized()
    public async productDetail(@Param('id') id: number, @Res() response: any): Promise<any> {
        /// product
        const productDetail: any = await this.productService.findOne({
            productId: id,
        });
        // product image
        const productDetails: any = classToPlain(productDetail);
        productDetails.productImage = await this.productImageService.findAll({
            select: ['productId', 'image', 'containerName', 'defaultImage'],
            where: {
                productId: id,
            },
        });
        // product category
        productDetails.Category = await this.productToCategoryService.findAll({
            select: ['categoryId', 'productId'],
            where: { productId: id },
        }).then((val) => {
            const category = val.map(async (value: any) => {
                const categoryNames = await this.categoryService.findOne({ categoryId: value.categoryId });
                const temp: any = value;
                if (categoryNames !== undefined) {
                    temp.categoryName = categoryNames.name;
                } else {
                    temp.categoryName = '';
                }
                return temp;
            });
            const results = Promise.all(category);
            return results;
        });
        // product related product
        productDetails.relatedProductDetail = await this.productRelatedService.findAll({ where: { productId: id } }).then((val) => {
            const relatedProduct = val.map(async (value: any) => {
                const productId = value.relatedProductId;
                const product = await this.productService.findOne({
                    select: ['productId', 'name'],
                    where: { productId },
                    relations: ['productImage'],
                });
                return classToPlain(product);
            });
            const resultData = Promise.all(relatedProduct);
            return resultData;
        });

        console
        const successResponse: any = {
            status: 1,
            message: 'Successfully get productDetail',
            data: productDetails,
        };
        return response.status(200).send(successResponse);
    }

    //  Top Selling Product List API
    /**
     * @api {get} /api/product/top-selling-productlist  Top selling ProductList API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully get top selling product..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/product/top-selling-productlist
     * @apiErrorExample {json} top selling product error
     * HTTP/1.1 500 Internal Server Error
     */
    // Order Detail Function
    @Get('/top-selling-productlist')
    @Authorized()
    public async topSellingProductList(@Req() request: any, @Res() response: any): Promise<any> {
        const user = await this.authService.parseBasicAuthFromRequest(request);

        const data = await this.productService.recentProductSelling_vendor(4, user.id);
        const promise = data.map(async (result: any) => {
            const product = await this.productService.findOne({
                select: ['productId', 'image', 'imagePath', 'price', 'name', 'description', 'vendor'],
                where: [
                    {
                        productId: result.productId,

                    },

                ],
            });
            const temp: any = result;
            const productImage = await this.productImageService.findAll({
                select: ['productId', 'image', 'containerName'],
                where: {
                    productId: result.productId,
                    defaultImage: 1,

                },
            });

            temp.product = product;
            temp.productImage = productImage;
            return temp;
        });

        const value = await Promise.all(promise);

        const successResponse: any = {
            status: 1,
            message: 'Successfully get Top Selling Product..!',
            data: value,
        };

        return response.status(200).send(successResponse);
    }

    // Recent Selling Product List
    /**
     * @api {get} /api/product/recent-selling-product  Recent Selling Product List API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "successfully listed recent product selling!",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/product/recent-selling-product
     * @apiErrorExample {json} Selling Product List error
     * HTTP/1.1 500 Internal Server Errorproduct
     */
    // Recent selling product function
    @Get('/recent-selling-product')
    @Authorized()
    public async sellingProduct(@Req() request: any, @Res() response: any): Promise<any> {
        const user = await this.authService.parseBasicAuthFromRequest(request);
        const limit = 3;
        const orderList = await this.orderProductService.List_vendor(limit, user.id);
        const promises = orderList.map(async (result: any) => {
            const order = await this.orderService.findOrder({
                select: ['invoiceNo', 'invoicePrefix', 'orderPrefixId', 'orderId', 'orderStatusId', 'vendor'],
                where: {
                    orderId: result.orderId
                },
            });
            const temp: any = result;
            temp.order = order;
            const product = await this.productImageService.findAll({
                where: {
                    productId: result.productId,
                    defaultImage: 1,
                },
            });
            temp.productImage = product;
            return temp;
        });
        const results = await Promise.all(promises);
        const successResponse: any = {
            status: 1,
            message: 'successfully listed recently selling products..!',
            data: results,
        };
        return response.status(200).send(successResponse);
    }

    // update product to Today Deals API
    /**
     * @api {put} /api/product/update-todayDeals/:id Update Today Deals API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} todayDeals TodayDeals should be 0 or 1
     * @apiParamExample {json} Input
     * {
     *      "todayDeals" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully updated product to today Deals.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/product/update-todayDeals/:id
     * @apiErrorExample {json} todayDeals error
     * HTTP/1.1 500 Internal Server Error
     */
    @Put('/update-todayDeals/:id')
    @Authorized()
    public async updateTodayDeals(@Param('id') id: number, @Body({ validate: true }) updateTodayDealsParam: UpdateTodayDealsParam, @Res() response: any): Promise<any> {

        const product = await this.productService.findOne({
            where: {
                productId: id,
            },
        });
        if (!product) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid productId',
            };
            return response.status(400).send(errorResponse);
        }

        product.todayDeals = updateTodayDealsParam.todayDeals;
        const productSave = await this.productService.create(product);
        if (productSave) {
            const successResponse: any = {
                status: 1,
                message: 'product updated successfully .',
                data: productSave,
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to update product',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Recent viewLog list API
    /**
     * @api {get} /api/product/viewLog-list Product View Log List
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got Product view Log List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/product/viewLog-list
     * @apiErrorExample {json} ViewLog List error
     * HTTP/1.1 500 Internal Server Error
     */

    @Get('/viewLog-list')
    @Authorized()
    public async productViewLogList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const select = [];
        const whereConditions = [];
        const search = [];
        const viewLogs = await this.productViewLogService.list(limit, offset, select, search, whereConditions, 0, count);
        if (count) {
            const successresponse: any = {
                status: 1,
                message: 'Successfully got view log count',
                data: viewLogs,
            };
            return response.status(200).send(successresponse);
        } else {
            const successResponse: any = {
                status: 1,
                message: 'Successfully got view log List',
                data: viewLogs,
            };
            return response.status(200).send(successResponse);
        }
    }

    // Customer product view list API
    /**
     * @api {get} /api/product/customerProductView-list/:id Customer product View List
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiParam (Request body) {Number} count count in number or boolean
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully got Product view Log List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/product/customerProductView-list/:id
     * @apiErrorExample {json} customerProductView List error
     * HTTP/1.1 500 Internal Server Error
     */

    @Get('/customerProductView-list/:id')
    @Authorized()
    public async customerProductView(@Param('id') id: number, @QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean, @Req() request: any, @Res() response: any): Promise<any> {
        const select = [];
        const whereConditions = [{
            name: 'customerId',
            value: id,
        }];
        const search = [];
        const customerProductview = await this.productViewLogService.list(limit, offset, select, search, whereConditions, 0, count);
        if (count) {
            const successresponse: any = {
                status: 1,
                message: 'Successfully got view log count',
                data: customerProductview,
            };
            return response.status(200).send(successresponse);
        } else {
            const successResponse: any = {
                status: 1,
                message: 'Successfully got view log List',
                data: customerProductview,
            };
            return response.status(200).send(successResponse);
        }
    }

    // Product Details Excel Document download
    /**
     * @api {get} /api/product/product-excel-list Product Excel
     * @apiGroup Product
     * @apiParam (Request body) {String} productId productId
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully download the Product Excel List..!!",
     *      "status": "1",
     *      "data": {},
     * }
     * @apiSampleRequest /api/product/product-excel-list
     * @apiErrorExample {json} product Excel List error
     * HTTP/1.1 500 Internal Server Error
     */

    @Get('/product-excel-list')
    public async excelProductView(@QueryParam('productId') productId: string, @Req() request: any, @Res() response: any): Promise<any> {
        const excel = require('exceljs');
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet('Product Detail Sheet');
        const rows = [];
        const productid = productId.split(',');
        for (const id of productid) {
            const dataId = await this.productService.findOne(id);
            if (dataId === undefined) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Invalid productId',
                };
                return response.status(400).send(errorResponse);
            }
        }
        // Excel sheet column define
        worksheet.columns = [
            { header: 'Product Id', key: 'productId', size: 16, width: 15 },
            { header: 'Product Name', key: 'name', size: 16, width: 15 },
            { header: 'Description', key: 'description', size: 16, width: 30 },
            { header: 'Price', key: 'price', size: 16, width: 15 },
            { header: 'SKU', key: 'sku', size: 16, width: 15 },
            { header: 'UPC', key: 'upc', size: 16, width: 15 },
            { header: 'Quantity', key: 'quantity', size: 16, width: 15 },
            { header: 'Minimum Quantity', key: 'minimumQuantity', size: 16, width: 19 },
            { header: 'Subtract Stock', key: 'subtractstock', size: 16, width: 15 },
            { header: 'Manufacture Id', key: 'manufactureId', size: 16, width: 15 },
            { header: 'Meta Tag Title', key: 'metaTagTitle', size: 16, width: 15 },
        ];
        worksheet.getCell('A1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('B1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('C1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('D1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('E1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('F1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('G1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('H1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('I1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('J1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        worksheet.getCell('K1').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        for (const id of productid) {
            const dataId = await this.productService.findOne(id);
            const productDescription = dataId.description;
            const dataDescription = productDescription.replace(/(&nbsp;|(<([^>]+)>))/ig, '');
            rows.push([dataId.productId, dataId.name, dataDescription.trim(), dataId.price, dataId.sku, dataId.upc, dataId.quantity, dataId.minimumQuantity, dataId.subtractStock, dataId.manufacturerId, dataId.metaTagTitle]);
        }
        // Add all rows data in sheet
        worksheet.addRows(rows);
        const fileName = './ProductExcel_' + Date.now() + '.xlsx';
        await workbook.xlsx.writeFile(fileName);
        return new Promise((resolve, reject) => {
            response.download(fileName, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    fs.unlinkSync(fileName);
                    return response.end();
                }
            });
        });
    }

    // Delete Product API
    /**
     * @api {delete} /api/product/delete-product/:id Delete Single Product API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParamExample {json} Input
     * {
     *      "id" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully deleted Product.",
     * "status": "1"
     * }
     * @apiSampleRequest /api/product/delete-product/:id
     * @apiErrorExample {json} productDelete error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/delete-product/:id')
    @Authorized()
    public async deleteProduct(@Param('id') productid: number, @Res() response: any, @Req() request: any): Promise<Product> {
        const product = await this.productService.findOne(productid);
        if (product === undefined) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid productId',
            };
            return response.status(400).send(errorResponse);
        }
        const orderProductId = await this.orderProductService.findOne({ where: { productId: productid } });
        if (orderProductId) {
            const errorResponse: any = {
                status: 0,
                message: 'That product is ordered',
            };
            return response.status(400).send(errorResponse);
        }
        const deleteProduct = await this.productService.delete(productid);

        if (deleteProduct) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted Product',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to delete product',
            };
            return response.status(400).send(errorResponse);
        }
    }

    // Delete Multiple Product API

    /**
     * @api {post} /api/product/delete-product Delete Product API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {number} productId productId
     * @apiParamExample {json} Input
     * {
     * "productId" : "",
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     * "message": "Successfully deleted Product.",
     * "status": "1"
     * }
     * @apiSampleRequest /api/product/delete-product
     * @apiErrorExample {json} productDelete error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/delete-product')
    @Authorized()
    public async deleteMultipleProduct(@Body({ validate: true }) productDelete: DeleteProductRequest, @Res() response: any, @Req() request: any): Promise<Product> {

        const productIdNo = productDelete.productId.toString();
        const productid = productIdNo.split(',');
        for (const id of productid) {
            const dataId = await this.productService.findOne(id);
            if (dataId === undefined) {
                const errorResponse: any = {
                    status: 0,
                    message: 'Please choose a product for delete',
                };
                return response.status(400).send(errorResponse);
            }
        }
        for (const id of productid) {
            const orderProductId = await this.orderProductService.findOne({ where: { productId: id } });
            if (orderProductId) {
                const errorResponse: any = {
                    status: 0,
                    message: 'That product is ordered',
                };
                return response.status(400).send(errorResponse);
            }
        }
        for (const id of productid) {
            const deleteProductId = parseInt(id, 10);
            await this.productService.delete(deleteProductId);
        }
        const successResponse: any = {
            status: 1,
            message: 'Successfully deleted Product',
        };
        return response.status(200).send(successResponse);
    }



    @Get('/report_stock')
    @Authorized()
    public async report_stock( @Req() request: any, @Res() response: any): Promise<Product> {

        const user = await this.authService.parseBasicAuthFromRequest(request);

        const vendor = await this.vendorService.findOne({
            where: [
                { vendor_id: user.id }

            ],
        });
    



        const select = ['productId', 'sku', 'name', 'quantity', 'price', 'image', 'imagePath', 'todayDeals', 'isActive', 'vendor'];

        const productLists: any = await this.productService.report_stock( select,vendor.vendor_id);
      


        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete product list. ',
            data: productLists,
        };
        return response.status(200).send(successResponse);
    }
}
