

import { Injectable } from '@angular/core';
import { SpecificCategory_List } from "../model/category.model"
import { Api } from './api';
import {  Observable } from 'rxjs';

@Injectable()
export class CategoryService extends Api {

    public params: any = {};
    private url: string = this.getBaseUrl();


    SpecificCategory_List(param: SpecificCategory_List){
        // return this.http.post(this.url+'/list/custom-product-list',param);
        return this.http.get<{}>(this.url + `/list/specific-category-list?categoryId=${param.categoryId}`);
    }
     CustomProduct_List(param: SpecificCategory_List) {
        // const headers = new HttpHeaders({ 'Content-Type': 'text/plain' });
        return this.http.get<{}>(this.url + `/list/custom-product-list?limit=6&categoryId=${param.categoryId}`);
      }
}