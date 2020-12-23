

import { Injectable } from '@angular/core';

import {  } from "../model/product.topselling.model";


import { Api } from './api';

@Injectable()
export class TopsellingService extends Api {

    public params: any = {};
    private url: string = this.getBaseUrl();
    public token = '';
    
    loadTopSelling() {
        // const headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
        return this.http.get<{}>(this.url + '/product-store/top-selling-productlist-noAuthorized', { observe: 'response' });
    }

     loadTopSellingVendor(param: any) {
        console.log('param', param);
        // const headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
        return this.http.get<{}>(this.url + `/product-store/top-selling-productlist-noAuthorized-forvendor?vendorid=${param.vendorid}`, { observe: 'response' });
    }
}