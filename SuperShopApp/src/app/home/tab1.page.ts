import { TopsellingService } from './../../services/product.topselling.services';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';

//model
import { category_data } from "../../model/product.model";
import { category_model } from "../../model/product.model";
import { product_data } from "../../model/product.model";
import { product_adsName } from "../../model/product.model";
import { product_list } from "../../model/product.model";
import { ads_data } from "../../model/product.model";

import { ads_list } from "../../model/product.model";
import { Banner_data } from "../../model/product.model";
import { topselling_data } from "../../model/product.topselling.model";



//service
import { ProductService } from "../../services/product.services";
import { MediaService } from "../../services/media.services";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  show_Seacrh: boolean;
  public product_data: any;
  public categories_data: category_data;
  public topselling: topselling_data;
  public brands_data: Banner_data;
  public ads1_ads: ads_data;
  public ads1_data: ads_data;
  public ads2_data: ads_data;
  public ads3_data: ads_data;
  public ads2_ads: ads_data;
  public ads3_ads: ads_data;

  public loadCategory: boolean = false;
  public loadProduct: boolean = false;

  public loading = this.loadingContrl.create({
    cssClass: 'my-custom-class',
    message: 'ກຳລັງໂຫລດ...'

  });


  slideOpts = {
    initialSlide: 0,
    speed: 400,
    startAutoplay: true
  };
  limit: number;
  offset: any;


  constructor(
    public route: Router,
    public productService: ProductService,
    public mediaService: MediaService,
    public topsellingService: TopsellingService,
    public loadingContrl: LoadingController,


  ) {


  }
  ngOnInit() {
    this.loading.then(v => {
      v.present();
    });
    this.loadproduct();
    this.loadData();

  }
  slidesDidLoad(slides) {
    slides.startAutoplay();
  }

  // search input
  show_Serach_Input() {
    if (this.show_Seacrh == true) {
      this.show_Seacrh = false;
    } else {
      this.show_Seacrh = true;
    }

  }

  productIdnextpage(productId: number) {
    console.log('id', productId);


    this.route.navigate(['/product-info'], { queryParams: { productId: productId } })
    // this.route.navigateByUrl(['/product-info'], {queryParams:{productId:productId}})
  }


  //load image//
  load_image(path, image_name) {


    if (!path) {
      return 'http://via.placeholder.com/350x350 ';
    }
    // console.log(path, '---', image_name);

    //  const image ='http://localhost:9000/api/media/image-resize?path='+path+'&name='+image_name+'&width=150&height=150'

    const image = this.mediaService.Image_service(path, image_name, 150, 150);
    // console.log(image);
    return image;
  }
  //end load image//
  //result top selling//
  res_top_selling(res: any) {
    this.topselling = res.body.data;
    console.log('top selling', this.topselling);
  }
  //end result top selling//
  //result catgory lsit//
  res_category_list(res: any) {
    console.log('res');
    this.loadCategory = true;
    this.closeLoading();
    this.categories_data = res.body;
    console.log(this.categories_data);


  }
  //end result catgory lsit//
  //result banner list//
  // res_banner_list(res: any) {
  //   console.log('res');

  //   this.brands_data = res.body
  //   console.log(this.brands_data);

  //   //
  // }
  //end result banner list//
  //result product list//
  res_product_list(res: any) {
    this.loadProduct = true;
    this.closeLoading();
    try {
      if (this.product_data) {
        if (this.product_data.data.length > 0) {
          this.product_data.data = this.product_data.data.concat(res.body.data);
        }
      } else {
        this.product_data = res.body;
      }
      console.log('product', this.product_data);

    } catch (error) {
      console.log(error);
    }
  }
  //end result product list//

  // load all data and refresh //
  async loadData(event: any = {}) {

    this.categories_data = new category_data();
    let categories = new product_list();
    categories.limit = 6;
    let banner = new product_list();
    banner.limit = 6;
    const category_list_data = await this.productService.category_list(categories);
    category_list_data.subscribe(
      (res) => this.res_category_list(res)
      ,
      (err) => console.log(err)
    );


  } catch(error) {
    alert('1 ' + JSON.stringify(error));
  }


  async loadproduct(event: any = {}) {

    let product = new product_list();
    product.limit = this.limit;
    product.offset = this.limit * this.offset++;

    const product_list_data = await this.productService.product_list_All(product);
    product_list_data.subscribe(
      (res) => {
        this.res_product_list(res)

      }
      ,
      (err) => console.log(err)
    );
    // event.target.complete();
  }

  closeLoading() {
    if (this.loadProduct && this.loadCategory) {
      try {
        this.loading.then(v => {
          v.dismiss();
        });
      } catch (error) {

      }

    }

  }


}