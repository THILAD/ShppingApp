import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

// import * as firebase from 'firebase';
@Injectable()
export class Api {
  constructor(public http: HttpClient) {


  }

  protected getBaseUrl(): string {
    // return 'http://food.laoapps.com:9001/api';
    // return 'http://192.168.1.134:8001/api';
    return 'http://localhost:8001/api';
  }

  protected headerBase(): any {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', authorization: 'Bearer ' + token });
    return headers;
  }


}
// export class PhoneNumber {
//   country: string;
//   area: string;
//   prefix: string;
//   line: string;

//   // format phone numbers as E.164
//   get e164() {
//     const num = this.country + this.area + this.prefix + this.line
//     return `+${num}`
//   }

// }
// export const firebaseConfig = {
//   apiKey: 'AIzaSyC_L3skgOrp2nDWOnXI75D0Q6g8Ouklnu4',
//   authDomain: 'laoappssell.firebaseapp.com',
//   databaseURL: 'https://laoappssell.firebaseio.com',
//   projectId: 'laoappssell',
//   storageBucket: 'laoappssell.appspot.com',
//   messagingSenderId: '927837958110',
//   appId: '1:927837958110:web:b4fcb12c6103e1db58b74f',
//   measurementId: 'G-MK9RTM2RPT'
// };
// export interface IFireBaseObject{
//   recaptchaVerifier:firebase.auth.RecaptchaVerifier;
//   confirmationResult:firebase.auth.ConfirmationResult;
// }