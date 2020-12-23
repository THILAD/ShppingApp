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
    // Put,
     Delete,
} from 'routing-controllers';
import { ProductService } from '../services/ProductService';
// import { ProductToCategoryService } from '../services/ProductToCategoryService';
import { ProductImageService } from '../services/ProductImageService';
// import { Product } from '../models/Product';
import { classToPlain } from 'class-transformer';
// import { DeleteProductRequest } from './requests/DeleteProductRequest';
// import { AddProductRequest } from './requests/CreateProductRequest';
// import { UpdateProductRequest } from './requests/UpdateProductRequest';
// import { ProductToCategory } from '../models/ProductToCategory';
// import { ProductImage } from '../models/ProductImage';
// import { CategoryService } from '../services/CategoryService';
// import { OrderProductService } from '../services/OrderProductService';
// import { OrderService } from '../services/OrderService';
// import { ProductRelated } from '../models/ProductRelated';
// import { ProductRelatedService } from '../services/ProductRelatedService';
// import { UpdateTodayDealsParam } from './requests/UpdateTodayDealsParam';
// import { ProductViewLogService } from '../services/ProductViewLogService';

import { VendorService } from '../services/VendorService';

import { AdsRegisterService } from '../services/AdsRegisterService';
import { AdsService } from '../services/AdsService';
import { UpdateAdsRegisterRequest } from './requests/UpdateAdsRegisterRequest';
import { UpdateAdsRequest } from './requests/UpdateAdsRequest';
import { Ads } from '../models/AdsModel';
import { AdsRegister } from '../models/AdsRegisterModel';

// import moment = require('moment');
// import fs = require('fs');
import { Container } from 'typedi';
import { AuthService } from '../../../src/auth/AuthService';
import { Vendor } from '../models/Vendor';

@JsonController('/ads')
export class AdsRegisterController {
    public authService = Container.get<AuthService>(AuthService);
    constructor(
        private productService: ProductService,
        // private ToCategoryService: ProductToCategoryService,
        private productImageService: ProductImageService,
        // private categoryService: CategoryService,
        // private orderProductService: OrderProductService,
        // private orderService: OrderService,
        // private productRelatedService: ProductRelatedService,
        // private productViewLogService: ProductViewLogService,
        private adsService: AdsService,
        private adsRegisterService: AdsRegisterService,
        private vendorService: VendorService
    ) {
    }

    // Ads List API
    /**
     * @api {get} /api/ads/adsList Product List API
     * @apiGroup ads
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get product list",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/ads/adslist
     * @apiErrorExample {json} adslist error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/ads-list')
    public async adsList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @Req() request: any, @Res() response: any): Promise<Ads> {

        const adsLists: any = await this.adsService.adsList(limit, offset);

        const results = await Promise.all(adsLists);

        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete ads list. ',
            data: classToPlain(results),
        };
        return response.status(200).send(successResponse);
    }


    // Ads List by name API
    /**
     * @api {get} /api/ads/ads-by-name ads List API
     * @apiGroup ads     
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * * @apiParam (Request body) {String} name name
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get ads list",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/ads/ads-by-name
     * @apiErrorExample {json} adslist error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/ads-by-name')
    public async adsByName(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('adsname') adsName: string, @Req() request: any, @Res() response: any): Promise<Ads> {

        const adsLists: any = await this.adsService.adsByName(limit, offset, adsName);

        const results = await Promise.all(adsLists);

        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete ads list. ',
            data: classToPlain(results),
        };
        return response.status(200).send(successResponse);
    }

    // Ads register List API
    /**
     * @api {get} /api/ads/ads-register-list
     * @apiGroup ads     
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * * @apiParam (Request body) {Number} adsid adsid
     * @apiParam (Request body) {Number} vendorid vendorid
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get product list",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/ads/ads-register-list
     * @apiErrorExample {json} adslist error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/ads-register-list')
    public async adsRegisterList(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('adsid') adsid: number,
        @QueryParam('vendorid') vendorid: number, @Req() request: any, @Res() response: any): Promise<Ads> {

        const adsLists: any = await this.adsRegisterService.adsRegisterList(limit, offset, [], [], vendorid, adsid);

        const results = await Promise.all(adsLists);

        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete ads list. ',
            data: classToPlain(results),
        };
        return response.status(200).send(successResponse);
    }

    // Ads register List by Code API
    /**
     * @api {get} /api/ads/ads-register-list-by-code
     * @apiGroup ads
     * @apiParam (Request body) {Number} limit limit
     * @apiParam (Request body) {Number} offset offset
     * * @apiParam (Request body) {String} code code
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get ads list",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/ads/ads-register-list-by-code
     * @apiErrorExample {json} adslist error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/ads-register-list-by-code')
    public async adsRegisterProductListByCode(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('code') code: string, @Req() request: any, @Res() response: any): Promise<Ads> {

        const adsLists: any = await this.adsRegisterService.adsRegisterProductList(limit, offset, code);

        const results = await Promise.all(adsLists);

        const successResponse: any = {
            status: 1,
            message: 'Successfully got the complete ads list. ',
            data: classToPlain(results),
        };
        return response.status(200).send(successResponse);
    }

    // Create Ads API
    /**
     * @api {post} /api/product/add-ads Add ads API
     * @apiGroup ads
     * @apiHeader {String} Authorization
     * @apiParam (Request body) {String} productName productName
     * @apiParamExample {json} Input
     * {
     *      "productName" : "",
     *      "productDescription" : "",
   
     * }
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "message": "Successfully created new ads.",
     *      "status": "1"
     * }
     * @apiSampleRequest /api/ads/add-ads
     * @apiErrorExample {json} AddAds error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/add-ads')
    @Authorized()

    public async addAds(@Body({ validate: true }) ads: UpdateAdsRequest, @Req() request: any, @Res() response: any): Promise<any> {
        console.log('------------------- add Ads -----------------------------------------');
        // const user = await this.authService.parseBasicAuthFromRequest(request);

        const newAds: Ads = new Ads();
        newAds.adsName = ads.adsName;
        newAds.allowedPromote = ads.allowedPromote || 5;
        newAds.endPro = ads.endPro;
        newAds.isActive = ads.isActive;
        // newAds.photo = JSON.stringify(ads.photo); // ["image1","images"]
        newAds.photo = ads.photo;
        newAds.proCode = ads.proCode;
        newAds.proName = ads.proName;
        newAds.startPro = ads.startPro;
        console.log('------------------------------------------------------------');
        console.log(newAds);
        const saveAds = await this.adsService.create(newAds);
        console.log('----------------------- save Ads -------------------------------------');
        console.log(saveAds);
        // Add related product
     
        if (saveAds) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully created Product',
                data: saveAds,
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
    @Post('/update-ads')
    @Authorized()
    public async updateAds(@Body({ validate: true }) ads: UpdateAdsRequest, @Res() response: any): Promise<any> {
        console.log(ads);
        const updateAds: Ads = await this.adsService.findOne({
            where: {
                id: ads.id,
            },
        });
        if (!updateAds) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid adsId',
            };
            return response.status(400).send(errorResponse);
        }
        updateAds.adsName = ads.adsName;
        updateAds.allowedPromote = ads.allowedPromote;
        updateAds.endPro = ads.endPro;
        updateAds.isActive = ads.isActive;
        updateAds.photo = ads.photo;
        // updateAds.proCode
        updateAds.proName = ads.proName;
        updateAds.startPro = ads.startPro;
        const saveAds = await this.adsService.create(updateAds);

        // TODO: delete and update image 

        // Save products Image
        // if (ads.image) {
        //     const productImage: any = ads.image;
        //     for (const imageRow of productImage) {
        //         const imageData = JSON.stringify(imageRow);
        //         const imageResult = JSON.parse(imageData);
        //         const newProductImage = new ProductImage();
        //         newProductImage.productId = saveAds.productId;
        //         newProductImage.image = imageResult.image;
        //         newProductImage.containerName = imageResult.containerName;
        //         newProductImage.defaultImage = imageResult.defaultImage;
        //         this.productImageService.create(newProductImage);
        //     }
        // }
        // let images= JSON.parse('');// [{},{}]
        // images.push({});
        // let json =JSON.stringify(images);
        // ads.photo = json;
        if (saveAds) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully updated ads',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to updated ads',
            };
            return response.status(400).send(errorResponse);
        }
    }

    /// Ads register by ads id API
    /**
     * @api {get} /api/ads/ads-register-by-ads-id/:id ads register by ads id API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get ads  register",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/ads/ads-register-by-ads-id/:id
     * @apiErrorExample {json} adsRegiseterByAdsId error
     * HTTP/1.1 500 Internal Server Error
     */
   
    @Get('/details-ads/:id')
    @Authorized()
    public async getAds(@Param('id') Id: number, @Res() response: any): Promise<any> {
       console.log('-------------------------------------------------------');
       console.log(Id);
       
        const getAds: Ads = await this.adsService.findOne({
            where: {
                id: Id,
            },
        });
        console.log(getAds);
        if (!getAds) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid adsId',
            };
            return response.status(400).send(errorResponse);
        }

        const successResponse: any = {
            status: 1,
            message: 'Successfully get ads Details',
            data: getAds,
        };
        return response.status(200).send(successResponse);
      
    }
// Ads register by ads id API
    /**
     * @api {get} /api/ads/ads-register-by-ads-id/:id ads register by ads id API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get ads  register",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/ads/ads-register-by-ads-id/:id
     * @apiErrorExample {json} adsRegiseterByAdsId error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/custom_ads')
    // @Authorized()
    public async customAds(@Req() resquest,@Res() response: any,
    @QueryParam('limit') limit: number, @QueryParam('offset') offset: number, @QueryParam('count') count: number | boolean,
    ): Promise<any> {
        
        //const user = await this.authService.parseBasicAuthFromRequest(request);

        const data = await this.productService.productListLatest(limit,offset,1);
        const promise = data.map(async (result: any) => {
            const product = await this.productService.findOne({
                select: ['productId', 'image', 'imagePath', 'price', 'name', 'description','vendor'],
                where: [
                    { productId: result.productId,
                       
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
    // Ads register by ads id API
    /**
     * @api {get} /api/ads/ads-register-by-ads-id/:id ads register by ads id API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get ads  register",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/ads/ads-register-by-ads-id/:id
     * @apiErrorExample {json} adsRegiseterByAdsId error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/ads-register-by-ads-id')
    // @Authorized()
    public async adsRegisterByAdsId(@QueryParam('id') id: number, @Res() response: any): Promise<any> {
        /// product
        const adsRegister: any = await this.adsRegisterService.findOne({
            adsId: id,
        });
        // product image
        const adsRegisterDetails: any = classToPlain(adsRegister);

        const successResponse: any = {
            status: 1,
            message: 'Successfully get ads Register Details',
            data: adsRegisterDetails,
        };
        return response.status(200).send(successResponse);
    }

  // ads register Detail by vendor API
    /**
     * @api {get} /api/ads/ads-register-by-ads-vendor/:vendor ads register by vendor API
     * @apiGroup ads
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get ads  register",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/ads/ads-register-by-ads-vendor/:vendor
     * @apiErrorExample {json} adsRegiseterByAdsId error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/product-by-ads-name')
    // @Authorized()
    public async productByAdsCode(@QueryParam('limit') limit: number, @QueryParam('offset') offset: number,@QueryParam('name') name: string, @Res() response: any): Promise<any> {
        /// product
        const ads: any = await this.adsService.findOne({
            adsName: name,
            isActive : true
        });
        if(!ads){
            const errorResponse: any = {
                status: 0,
                message: 'Invalid ads name',
            };
            return response.status(400).send(errorResponse);
        }
        const products: any = await this.adsRegisterService.adsRegisterProductList(limit,offset,ads.proCode);
        // product image
        const productAdsDetails: any = classToPlain(products);

        const successResponse: any = {
            status: 1,
            message: 'Successfully get ads Register Details',
            data: productAdsDetails,
        };
        return response.status(200).send(successResponse);
    }
    // ads register Detail by code API
    /**
     * @api {get} /api/ads/ads-register-by-ads-id/:code ads register by ads code API
     * @apiGroup ads
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get ads  register",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/ads/ads-register-by-ads-id/:code
     * @apiErrorExample {json} adsRegiseterByAdsId error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/ads-register-by-ads-code')
    // @Authorized()
    public async adsRegisterByCode(@QueryParam('code') code: string, @Res() response: any): Promise<any> {
        /// product
        const adsRegister: any = await this.adsRegisterService.findOne({
            codeName: code,
        });
        // product image
        const adsRegisterDetails: any = classToPlain(adsRegister);

        const successResponse: any = {
            status: 1,
            message: 'Successfully get ads Register Details',
            data: adsRegisterDetails,
        };
        return response.status(200).send(successResponse);
    }

    // ads register Detail by vendor API
    /**
     * @api {get} /api/ads/ads-register-by-ads-vendor/:vendor ads register by vendor API
     * @apiGroup ads
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get ads  register",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/ads/ads-register-by-ads-vendor/:vendor
     * @apiErrorExample {json} adsRegiseterByAdsId error
     * HTTP/1.1 500 Internal Server Error
     */
    @Get('/ads-register-by-vendor/:vendor')
    // @Authorized()
    public async adsRegisterByVendor(@Param('vendor') vendor: NumberConstructor, @Res() response: any): Promise<any> {
        /// product
        const adsRegister: any = await this.adsRegisterService.findOne({
            vendorId: vendor,
        });
        // product image
        const adsRegisterDetails: any = classToPlain(adsRegister);

        const successResponse: any = {
            status: 1,
            message: 'Successfully get ads Register Details',
            data: adsRegisterDetails,
        };
        return response.status(200).send(successResponse);
    }


    // add ads register Detail API
    /**
     * @api {get} /api/ads/add-ads-register ads register by ads id API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get ads  register",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/ads/add-ads-register
     * @apiErrorExample {json} adsRegiseterByAdsId error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/add-ads-register')
    @Authorized()
    public async addAdsRegister(@Body({ validate: true }) adsRegister: UpdateAdsRegisterRequest, @Res() response: any): Promise<any> {


        console.log(adsRegister);
        const updateAds: Ads = await this.adsService.findOne({
            where: {
                id: adsRegister.adsId,
            },
        });
        const vendor: Vendor = await this.vendorService.findOne({
            where: {
                vendor_id: adsRegister.vendor
            }
        });
        if (!vendor) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid vendor',
            };
            return response.status(400).send(errorResponse);
        }
        if (!updateAds) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid adsId',
            };
            return response.status(400).send(errorResponse);
        }
        const updateAdsRegister: AdsRegister = new AdsRegister();
        updateAdsRegister.adsId = adsRegister.adsId;
        updateAdsRegister.codeName = adsRegister.codeName;
        updateAdsRegister.proName = adsRegister.proName;
        updateAdsRegister.vendorId = adsRegister.vendor;

        const saveAds = await this.adsRegisterService.create(updateAdsRegister);

        // TODO: delete and update image 

        if (saveAds) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully updated Product',
                data:saveAds
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


    // update ads register Detail API
    /**
     * @api {get} /api/ads/update-ads-register  update ads register API
     * @apiGroup Product
     * @apiHeader {String} Authorization
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *      "status": "1"
     *      "message": "Successfully get ads  register",
     *      "data":"{}"
     * }
     * @apiSampleRequest /api/ads/update-ads-register
     * @apiErrorExample {json} adsRegiseterByAdsId error
     * HTTP/1.1 500 Internal Server Error
     */
    @Post('/update-ads-register')
    @Authorized()
    public async updateAdsRegister(@Body({ validate: true }) adsRegister: UpdateAdsRegisterRequest, @Res() response: any): Promise<any> {


        console.log(adsRegister);
        const updateAds: Ads = await this.adsService.findOne({
            where: {
                id: adsRegister.adsId,
            },
        });
        const vendor: Vendor = await this.vendorService.findOne({
            where: {
                vendor_id: adsRegister.vendor
            }
        });
        const updateAdsRegister: AdsRegister = await this.adsRegisterService.findOne({
            where: {
                id: adsRegister.adsId,
            },
        });
        if (!vendor) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid vendor',
            };
            return response.status(400).send(errorResponse);
        }
        if (!updateAds) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid adsId',
            };
            return response.status(400).send(errorResponse);
        }
        if (!updateAdsRegister) {
            const errorResponse: any = {
                status: 0,
                message: 'ads register not found',
            };
            return response.status(400).send(errorResponse);
        }
  

        updateAdsRegister.adsId = adsRegister.adsId;
        updateAdsRegister.codeName = adsRegister.codeName;
        updateAdsRegister.proName = adsRegister.proName;
        updateAdsRegister.vendorId = adsRegister.vendor;

        const saveAds = await this.adsRegisterService.update(updateAdsRegister);

        // TODO: delete and update image 

        if (saveAds) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully updated adsregister',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to updated adsregister',
            };
            return response.status(400).send(errorResponse);
        }
    }






    // Delete Product API
    /**
     * @api {delete} /api/ads/delete-ads-register/:id Delete Single ads register API
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
     * @apiSampleRequest /api/ads/delete-ads-register/:id
     * @apiErrorExample {json} adsRegisterDelete error
     * HTTP/1.1 500 Internal Server Error
     */
    @Delete('/delete-ads-register/:id')
    @Authorized()
    public async deleteAdsRegister(@Param('id') registerId: number, @Res() response: any, @Req() request: any): Promise<Ads> {
        const adsRegister = await this.adsRegisterService.findOne({ id: registerId });
        if (adsRegister === undefined) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid adsRegister',
            };
            return response.status(400).send(errorResponse);
        }
        const deleteAdsRegister = await this.adsRegisterService.delete(registerId);

        if (deleteAdsRegister) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted adsregister',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to delete adsregister',
            };
            return response.status(400).send(errorResponse);
        }
    }
    @Delete('/delete-ads/:id')
    @Authorized()
    public async deleteAds(@Param('id') id: number, @Res() response: any, @Req() request: any): Promise<Ads> {
        const adsRegister = await this.adsService.findOne({ id: id });
        if (adsRegister === undefined) {
            const errorResponse: any = {
                status: 0,
                message: 'Invalid ads',
            };
            return response.status(400).send(errorResponse);
        }
        const deleteAds = await this.adsService.delete(id);

        if (deleteAds) {
            const successResponse: any = {
                status: 1,
                message: 'Successfully deleted ads',
            };
            return response.status(200).send(successResponse);
        } else {
            const errorResponse: any = {
                status: 0,
                message: 'unable to delete ads',
            };
            return response.status(400).send(errorResponse);
        }
    }


}
