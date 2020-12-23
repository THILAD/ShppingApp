

import { Injectable } from '@angular/core';

import { login } from "../model/login.model";
import { register } from "../model/resgister.model";

import { Api } from './api';

@Injectable()
export class MediaService extends Api {

    public params: any = {};
    private url: string = this.getBaseUrl();
    public token = '';

    Image_service(path: string, image_name: string, width: number, height: number) {

        const image = this.url + '/media/image-resize?path=' + path + '&name=' + image_name + '&width=' + width + '&height=' + height
        // let Image_url = 'http://localhost:9000/api/media/image-resize?path='+path+'&name='+image_name+'&width=50&height=50';
        return image;
      }
}