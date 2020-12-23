

import { Injectable } from '@angular/core';

import { product_list, ads_list, product_adsName_list,  } from "../model/product.model";
import { Api } from './api';

@Injectable()
export class ProductService extends Api {

    public params: any = {};
    private url: string = this.getBaseUrl();
    public token = '';

    product_list_All(param: product_list) {

        if (!param.limit) param.limit = 5;
        if (!param.offset) param.offset = 1;
        return this.http.get(this.url + '/list/custom-product-list?limit=' + param.limit + '&offset=' + param.offset + '&manufacturerId=&categoryId=&keyword=' + param.keyword + '&price=ASC&priceFrom=0&priceTo=', { observe: 'response' });
    }

   
    async banner_list(param: product_list) {
        // const headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
        // return this.http.post(this.url+'/list/custom-product-list',param);
        return this.http.get<{}>(this.url + '/manufacturers/manufacturerlist?limit=10&offset=0&keyword=', { observe: 'response' });

    }


    async ads_list() {
        // const headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
        // return this.http.post(this.url+'/list/custom-product-list',param);
        return this.http.get<{}>(this.url + '/ads/ads-list', { observe: 'response' });

    }

    async ads1_list(param: ads_list) {
        console.log('param1', param);
        return this.http.get<{}>(this.url + `/ads/ads-by-name?limit=${param.limit}&offset=${param.offset}&adsname=${param.adsname}`);
    }

    async ads2_list(param: ads_list) {
        console.log('param2', param);
        return this.http.get<{}>(this.url + `/ads/ads-by-name?limit=${param.limit}&offset=${param.offset}&adsname=${param.adsname}`);
    }

    async ads3_list(param: ads_list) {
        console.log('param3', param);
        return this.http.get<{}>(this.url + `/ads/ads-by-name?limit=${param.limit}&offset=${param.offset}&adsname=${param.adsname}`);
    }


    async product_AdsName(param: product_adsName_list) {
        return this.http.get<{}>(this.url + `/ads/product-by-ads-name?limit=0&offset=0&name=${param.name}`);
    }


 

    category_list(param: product_list) {


        // const headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
        // return this.http.post(this.url+'/list/custom-product-list',param);
        return this.http.get<{}>(this.url + '/list/category-list?limit=&offset=0&keyword=&sortOrder=', { observe: 'response' });

    }

   product_item(id: number) {


        // const headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
        // return this.http.post(this.url+'/list/custom-product-list',param);
        return this.http.get<{}>(this.url + '/product-store/productdetail/' + id);


    }

     loadvendor_id(param: any) {
        // const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'authorization': 'Bearer ' + this.token });
        return this.http.get(this.url + '/auth/vendor-name', { params: param });
      }
    
}