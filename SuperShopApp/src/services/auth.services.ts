

import { Injectable } from '@angular/core';

import { login } from "../model/login.model";
import { register } from "../model/resgister.model";

import { Api } from './api';

@Injectable()
export class AuthService extends Api {

    public params: any = {};
    private url: string = this.getBaseUrl();
    public token = '';

    login(param: login) {
        return this.http.post(this.url + '/customer/login', param);
    }
    
    register(param: register) {
        if (param) {
            return this.http.post(this.url + '/customer/register', param);
        }
    }
    forgotpassword(param: register) {
        if (param) {
            return this.http.post(this.url + '/customer/forgot-password', param);
        }
    }
}