
  

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Api } from './api';

@Injectable()
export class LoadcardService extends Api {


    private messageCartSource: BehaviorSubject<string> = new BehaviorSubject('initialValue'); 
    public messageCart = this.messageCartSource.asObservable();
    loadcart() {
        const product_get = JSON.parse(localStorage.getItem("product_card"));
        return product_get;
      }
      public updateCart(value: string) {
        this.messageCartSource.next(value);
    }

    }    