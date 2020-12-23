

import { Injectable } from '@angular/core';
import { Api } from './api';
import {  Observable } from 'rxjs';
import { vendorProduct_list ,vendorProfile_list} from "../model/product.vendor.model";
@Injectable()
export class ProductVendorService extends Api {

    public params: any = {};
    private url: string = this.getBaseUrl();

   productVendor(param: vendorProduct_list) {
        // console.log('vendor product list', param);
    
        // if(!param.limit) param.limit = 5;
        //   if(!param.offset) param.offset = 1;
        if (!param.keyword) param.keyword = '';
        if (!param.sku) param.sku = '';
        // console.log('param',param);
        // const headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
        return this.http.get<{}>(this.url + `/vendor-product/productlist-vendor?limit=${param.limit}&offset=${param.offset}&keyword=${param.keyword}&sku=${param.sku}&status=&vendorid=${param.vendorid}`);
      }
    
    
    
     loadVendorProfile(param: vendorProfile_list) {
        // const headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
        return this.http.get<{}>(this.url + `/auth/get-vendor-profile?id=${param.id}`);
      }
    
}