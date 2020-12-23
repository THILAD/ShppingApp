/*
 * spurtcommerce API
 * version 3.0
 * Copyright (c) 2019 piccosoft ltd
 * Author piccosoft ltd <support@piccosoft.com>
 * Licensed under the MIT license.
 */

import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { AccessTokenRepository } from '../repositories/AccessTokenRepository';
import { AccessToken } from '../models/AccessTokenModel';
import * as admin from 'firebase-admin';

@Service()
export class AccessTokenService {
    public static sell_googlekey = {
        type: 'service_account',
        project_id: 'laoappssell',
        private_key_id: '3c0a64d4b94bbe28c2c2a0cfbc69d43ab5d98310',
        private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQD487YYLQ+XBpxX\n6BoGl4kfjVK8FMi5eXKosO5myFzFDGoU6+xMZm4UM9gDu9z4TGnZFOFJsEER+QKw\n8S7HI/KfbVMo+tRuSqwGDIRV03IPoxQHj3AaZO9CpeXwaRdlwIt0on9mwjrUTqkr\nJbmEdZDz7bZwCFix5QeiGwV5kr+/7gHoJZ76yW0C+oJStkasU9BsVg8vFgT6XgCh\nEf21zZUNWi9PRYIqO2uGMwpR3Orl/9NoIjVLQ9TuWnMyTqosA3Suhif4/fw0FL4G\nflEWpr+ewsW5RCm+SpdV1BTDfUmPAQm2DJCgz9KdWY5YXt4wj5CNB1PzmiYbuESi\n0Bv7+LfDAgMBAAECggEACPXbTynJXrILYjNFmIjPaSt7glnXKFcsNCZ7djHuUN3+\nWswWYGDsGQhiqoO8/ieLRG0hd2GuKI5HYASrnoRMi8Ycu6QHja6yBrJgTacuJaJE\n1XQpYJx9wMQwL1krppW/Dzl4D26cknQAV8APBNWnHCMpXAVDjVJFK5BVv/HzD96C\n1nP9LoV1ka2NVqBKwB9c3vmjd8CkqEGfUTZi6/fyJJmDXIVubDPRdIY46isxhx4f\nkkViGG061dFjFEUXUO1JSLRaxT699KcjkNEy/Iwpm2xvxfYfIxFnJRRw52MiWzPe\nH6SwbtdQrNZOn3d6NBLehSYx6yWtiIxwFBnlStZQlQKBgQD8k7Ly6fmu3fP0dsCT\nLyu7yJqVieorn7SJPAOMh4z6YsS2uXAMuzzLb9QIDOn4aahPRcBmt5+ip4np3cjl\nJ6XqdO5Q8WY0AluRay4hThIbAoB2VPuFwLdyMySgnN1aFOGillTyF0NMPiSuTYUm\nrgyheUvtIiMQ/BpXzaT7o690VQKBgQD8U2+L3irzb2iW64maMWjfZ+6nBZYph/8W\nUOugTDPSaKLTAO///dPro99nhRh1ZCjrP2HSSY29IiBC+AB4MfjpUJYIq6ZpWhqJ\nWUygZBXdgYnKcAjHdWv6vS8e8E1fkXfWBT0VJ8Y0tLqM02ZVNsA5XNawauCf7LPC\n/ab8mIFTtwKBgQCm8x3qsLtoWa9iHIiIATsAIcYEKCgP872KpI+X+RU3f8eVHBez\nYqP5uI5HT/nrSDOHSoy1mJQ9GE7xtbaPudhSlD3eZOHwaMqL4XOZchhHoCy3is7C\nhzL6mlGQlH8/huPp60J0zumd4MmwKO9lNNCGfz2vncvd8zWaagSujHByDQKBgQDH\nJtttm4Zu6Mm2BGVwy/qoCZH1RZWFZg9Rf8DZngtw0KFixOSoOaDf5VFYlVX+oXUi\nZ74/iUpTsvGfqbpFI7v/+ljQsxn/INy89zxhg102nR0yKEbllqoJFvRwCN4oxdm9\nlBjn76KiytpKeDfWngYNwFa6m0B7OQmQpz77Mysv9QKBgHf9xRkW1DLgYgcE+pr9\nj4y3a/kFu+nTxoQX8zdBJt23/oRslyqmn+GQNGNfsAwvPbKCAkr5ykC9+AbTwOqr\nrndnOS7lhoL0ZVhq17qm1weNeVpQNsndLwQjqo/khOlPZGRZiTxrRwZdysc1P8lA\nBIMF8xZKz1MiB23rpVzlitz1\n-----END PRIVATE KEY-----\n',
        client_email: 'firebase-adminsdk-4facw@laoappssell.iam.gserviceaccount.com',
        client_id: '104131076639698009978',
        auth_uri: 'https://accounts.google.com/o/oauth2/auth',
        token_uri: 'https://oauth2.googleapis.com/token',
        auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
        client_x509_cert_url: 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-4facw%40laoappssell.iam.gserviceaccount.com',
    };
    public static buy_googlekey = {
        type: 'service_account',
        project_id: 'laoappsbuy',
        private_key_id: '195d0c8d20743f86950ffa080711d257dc80968f',
        private_key: '-----BEGIN PRIVATE KEY-----\nMIIEuwIBADANBgkqhkiG9w0BAQEFAASCBKUwggShAgEAAoIBAQCpl3mBrP1QyUFM\nnXOqkGDvpSwYgJZkU1uwjDemv9AXvXoqDuEBd5LkeDiBJHbacOCI9IsifZsO9p4H\nHDWMZ6A6WDvFBCblCuotIEOwpxxSNhBmfZZX8goFqRnEMOL5Zpl8Jip0mfGSTzuP\nEnwAHGoy+6d0y9LbzMi6SG09PnFhfTAYsEyAt/GXwwo7+t2i4GHaJNQPe4iWDOAv\nCA/e+qsjwTWd7+5TxHy0WhA6hY3RjV3eNA68wOi+xdQMRT5hYKcnIGtGphoXqYuQ\nORxigNb1gA3YSIF9MHmM3slY23Y/Lu1GCaD513uf6SLi7YRcRpHmeo292y5LJwB3\nJIQp3CotAgMBAAECgf8HZb68aU9ODCP3s5EtX3QwVS7B4toB26D5knmFodhHMNH4\nrlgiOD+wDOO/aQJw2iZGfbmT8jv76xtO3sF3M7ie0uUd3ZB/bSUfKB52a35QwmBK\nGDBL+xgffGt4o1Pt4mEk3oVQ5hDOJlFIFwZRpZZRov3VmmPC3VaOyZn6PJRgLC49\nplfmsL6ikkgr+w3eesQEsHXBKXY767NxLxSQDBi8nBRMXgL4o+OwkIPtd0ZnRAEw\nfKof1pacaGg7oBBKonWF2IKz/Xms7R4V3uHMNM+3ZyF9b4MBP4DIA9L0KqRrAvOV\n6ArSywNqkoEOFpfORphdBJg/MVTR/F0oxQUSVEECgYEA1jiLTWqXCohqX/RANxNj\nVB+w/OlwESGp9x+Lqk+EmQ+h66Pbf3w3Y8RmQWmQM/qV+DXa8OOGWxywkJtk7MeW\nitDin3DlR0m7m8aXQdj4BY8SfXbp79QaH+/utfET14RohuPvmgHL3vxdhAD9qK+A\nYUqedDZo0Vv31CCQawgpqWECgYEAyqq4FNg4TmefWElZxMBjCfTMN/VmBzYfn8mH\nWEPwggPuA303W56UHNZDKrLSI4XLp6S4KpRjhyfm/0JIU4Ij4zwmGvRN7ZMNbZwN\nlbkub9QkpfEKeEduDIWZmdqfNaBS8Ye/NzFQTz49NMy2+NnQGlCrY7KHfwZ7MKeT\n0FqnOE0CgYA/A5cGiMoxUPtpimGxUcSwJDpdyxUqFOr4RJFC4e0xUQXiWOriT1nD\nwSwLJdBDWfzvbHggz+zftErD3tILTJKd9uAS4pSvKaNEKWCo//fFOtbHjUk3QP8G\nUf+4CVg61zogI8CBXvHnf/jKMbhr/GQZOmft62td2l3GSmXw9g+7QQKBgQCt0V2w\nAwHHvPfdMIvdQ2Ot1laQZ9fpt3HICYAbI6nS2Kv6MhqYaZl+YgWZSWURMl9ImO2b\nF0mFUaO8qYx+ks9UxPGpjH6Jk+WgbIb6MqixILGN4P2pyxmHg84JNof15ls868AE\nBjdqv2afMjR7mdPxvd5A042CVHyzbgZIXHeuwQKBgGgo/MfRydKUNh6G9fQgvD3J\na5jbtUMfII0E+/7uaaMRrQdvWb9CMofM/krgl2yKNr2wTjMW409Hv8RH0vEyz3ep\nQpneXoLgtgvP1z2WoXNyYIxJCJT156l0vnw67HrZuuj1fvObqFLk6h+ErWRrnz1g\nK3gFpOHOKRn5aPjDiGct\n-----END PRIVATE KEY-----\n',
        client_email: 'firebase-adminsdk-yc7vi@laoappsbuy.iam.gserviceaccount.com',
        client_id: '118194605336635101922',
        auth_uri: 'https://accounts.google.com/o/oauth2/auth',
        token_uri: 'https://oauth2.googleapis.com/token',
        auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
        client_x509_cert_url: 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-yc7vi%40laoappsbuy.iam.gserviceaccount.com',
    };
    public static initSellKeys(): admin.app.App {
        console.log('admin firebase app length', admin.apps);
        for (let index = 0; index < admin.apps.length; index++) {
            const element = admin.apps[index];
            if (element.name === 'laoappsbuy') {
                return admin.apps[index];
            }
        }
        return admin.initializeApp({
            credential: admin.credential.cert({
                clientEmail: AccessTokenService.sell_googlekey.client_email,
                projectId: AccessTokenService.sell_googlekey.project_id,
                privateKey: AccessTokenService.sell_googlekey.private_key,
            }),
            databaseURL: 'https://laoappssell.firebaseio.com',
        }, 'laoappssell');

    }
    public static initBuyKeys(): admin.app.App {
        console.log('admin firebase app length', admin.apps);
        for (let index = 0; index < admin.apps.length; index++) {
            const element = admin.apps[index];
            if (element.name === 'laoappsbuy') {
                return admin.apps[index];
            }
        }
        return admin.initializeApp({
            credential: admin.credential.cert({
                clientEmail: AccessTokenService.buy_googlekey.client_email,
                projectId: AccessTokenService.buy_googlekey.project_id,
                privateKey: AccessTokenService.buy_googlekey.private_key,
            }),
            databaseURL: 'https://laoappsbuy.firebaseio.com',
        }, 'laoappsbuy');
    }
    public static verifyGoogleIdToken(idToken: string, phonenumber: number, appname: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            let app: admin.app.App = undefined;
            if (appname === 'laoappsbuy') {
                app = AccessTokenService.initBuyKeys();
            } else if (appname === 'laoappssell') {
                app = AccessTokenService.initSellKeys();
            }
            if (!app) {
                return reject(false);
            }
            app.auth().verifyIdToken(idToken)
                .then((decodedToken) => {
                    console.log('decode google token', decodedToken, 'phonenumber', ('+' + phonenumber));
                    if (decodedToken.phone_number !== ('+' + phonenumber)) {
                        reject(false);
                    } else {
                        const uid = decodedToken.uid;
                        // ...
                        console.log(uid);
                        resolve(true);
                    }

                }).catch((error) => {
                    // Handle error
                    console.log(error);

                    reject(false);
                });
        });

    }
    constructor(@OrmRepository() private accessTokenRepository: AccessTokenRepository,
        @Logger(__filename) private log: LoggerInterface) {
    }

    public findOne(accessToken: any): Promise<any> {
        return this.accessTokenRepository.findOne(accessToken);
    }
    // delete token
    public async delete(id: number): Promise<any> {
        this.log.info('Delete a token');
        await this.accessTokenRepository.delete(id);
        return;
    }
    // create token
    public async create(accessToken: any): Promise<AccessToken> {
        return this.accessTokenRepository.save(accessToken);
    }
}
