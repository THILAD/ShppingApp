import { product_list } from './../../model/product.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import { ProductService } from "../../services/product.services";
import { MediaService } from "../../services/media.services";
import { CategoryService } from "../../services/category.service";
import { ProductVendorService } from "../../services/product.vendor.services";

import { Card, Vendorlist, Product_model } from "../../model/card.model";
import { SpecificCategory_List } from "../../model/category.model"
import { objectlocalStorage_data } from "../../model/product.model"
import { vendorProduct_data, vendorProduct_list, vendorProfile_data, vendorProfile_list } from "../../model/product.vendor.model";

import { from } from 'rxjs';
import { element } from 'protractor';
@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.page.html',
  styleUrls: ['./product-info.page.scss'],
})
export class ProductInfoPage implements OnInit {
  public product_item: any;
  public product: number;
  public loadvendorN: objectlocalStorage_data;
  public vendor = [];
  public productCategory: SpecificCategory_List;
  public objcategory;
  public vendorProduct_data: vendorProduct_data;
  public vendorProfile_data: vendorProfile_data;

  public loadingCategory: boolean = false;
  public loadProduct: boolean = false;
  public loadvendorlist: boolean = false;
  public loadProduct_detail: boolean = false;
  public loadVendorshop: boolean = false;
  public productCategorie: boolean = false;

  public countCard: number;

  public loading = this.loadingContrl.create({
    cssClass: 'my-custom-class',
    message: 'ກຳລັງໂຫລດ...'

  });

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    startAutoplay: true
  };
  constructor(
    public productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    public loadingContrl: LoadingController,

    public mediaService: MediaService,
    public categoryService: CategoryService,
    public productVendorService: ProductVendorService
  ) { }
  slidesDidLoad(slides) {
    // slides.startAutoplay();
    slidesPerView: 1.5
  }
  ngOnInit() {

    this.loading.then(v => {
      v.present();
    });

    this.load()
   
    this.countcart();
  }

// go to cart
goTocart(){
  this.router.navigate(['/card-add'])

}
  // nexw page product 

  productVendorNext(productId: number){
    console.log('okokoko');
    
    console.log('next ok',productId);
    this.router.navigate(['/product-info'], { queryParams: { productId: productId } })
    
  }

  // product category next page
  // productCategoryNext(productId:number){
  //   console.log('next ok',productId);
  //   this.router.navigate(['/product-info'], { queryParams: { productId: productId } })
  // }
  load() {
    let id = this.route.snapshot.paramMap.get('productId');
    console.log(id);
    this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.load_product_item(params['productId']);
       
      });
  }
  nextpageGetId(): void {
    // console.log(this.product_item.data.vendor,"ID vendoror");
    this.router.navigate(['/vendorshop'], { queryParams: { vendorshopId: this.product_item.data.vendor } })
  }
  //result vendor name//
  res_vender_name(res: any) {
    this.loadVendorshop = true;
    console.log('set loadVendorshop', this.loadVendorshop);
    this.closeLoading();

    this.vendor = res;
    console.log('vendor User name', this.vendor[0]);

  }
  //result product item  detail//  ok
  res_product_item(res: any) {
    this.loadProduct_detail = true;
    console.log('set productdetaill', this.loadProduct_detail);
    this.closeLoading();
    this.product_item = res;
    console.log('product_item', res);
    // console.log('venderid',res.data.vendor);
    this.lovendorname(res.data.vendor);
    this.loadProductVendor(res.data.vendor);
    this.loadproductbycategory(this.product_item?.data?.Category[0]?.categoryId)
  }
  //end result product item//
  //result vendor product //
  res_productVendor_list(ven: any) {
    this.loadvendorlist = true;
    console.log('set loadvendorlist', this.loadvendorlist);
    this.closeLoading();

    this.closeLoading();


    try {
      if (this.vendorProduct_data.data) {
        if (this.vendorProduct_data.data.length > 0) {
          this.vendorProduct_data.data = this.vendorProduct_data.data.concat(ven.data);
        }
      } else {
        this.vendorProduct_data = ven;
      }
      console.log('Vendor product list product', this.vendorProduct_data);

      console.log('length', this.vendorProduct_data.data.length)
    } catch (error) {
      console.log(error);
    }
  }
  //end result vendor product//
  //end result vendor product//

  //load vendor name// line 98
  async lovendorname(vendorid: number) {
    this.loadvendorN = new objectlocalStorage_data();
    // const vendor_lis = [];
    const vendor = await this.productService.loadvendor_id({ "id": vendorid });
    vendor.subscribe(
      (res) => {
        this.res_vender_name(res)
        // console.log('okokookokk',res);

      }
      ,
      (err) => console.log(err)

    );

  }
  //end load vendor name//
  //load product item// ok
  async load_product_item(id: number) {
    const product_item_data = await this.productService.product_item(id);
    product_item_data.subscribe(
      (res) => this.res_product_item(res)
      ,
      (err) => console.log(err)
    );
  }
  //load product item//



  async loadproductbycategory(category) {

    this.productCategory = new SpecificCategory_List();
    this.productCategory.categoryId = category

    this.categoryService.CustomProduct_List(this.productCategory).subscribe(res => {
      this.productCategorie = true
      console.log('set productCategorie', this.productCategorie);
      this.closeLoading();

      this.objcategory = res;
      // (res) => this.objcategory(res)
      console.log('category Product', res);
    })
  }

  //load product vendor //
  async loadProductVendor(vendorId: number = -1) {
    this.vendorProduct_data = new vendorProduct_data();
    let vendorProduct_list2 = new vendorProduct_list();
    vendorProduct_list2.vendorid = vendorId;
    vendorProduct_list2.offset = 0;
    vendorProduct_list2.limit = 5;
    vendorProduct_list2.keyword = '';
    const vendorProduct_list_data = await this.productVendorService.productVendor(vendorProduct_list2);
    vendorProduct_list_data.subscribe(
      (ven) => this.res_productVendor_list(ven)
      ,
      (err) => console.log(err)
    );
  }
  // end load product vendor//


  //load image//
  load_image(path, image_name) {
    if (!path) {
      return 'http://via.placeholder.com/350x350 ';
    }
    const image = this.mediaService.Image_service(path, image_name, 250, 250);
    return image;
  }
  //end load image//

  addtoCard(): void {

    let card = new Card();

    let product = new Product_model();
    product.productId = this.product_item.data.productId;
    product.quantity = 1
    product.price = this.product_item.data.price
    product.model = this.product_item.data.manufacturerId
    product.name = this.product_item.data.name
    product.vendorId = this.product_item.data.vendor
    product.image = this.product_item.data.productImage[0].image
    product.imagePath = this.product_item.data.productImage[0].containerName

    let vendorlist = new Vendorlist();
    vendorlist.vendor_id = this.product_item.data.vendor;
    vendorlist.vendor_name = this.vendor[0].vendor_name;
    vendorlist.product_list = [];
    vendorlist.product_list.push(product);


    if (localStorage.getItem('card')) {


      card = JSON.parse(localStorage.getItem('card'));
      // console.log('have card', card);

      for (let index = 0; index < card.vendorlist.length; index++) {
        const element1 = card.vendorlist[index];

console.log('loop',index);


        if (element1.vendor_id == this.product_item.data.vendor) {
          console.log('have vendor'+this.product_item.data.vendor +'='+element1.vendor_id);



          for (let jndex = 0; jndex < card.vendorlist[index].product_list.length; jndex++) {
            const element2 = card.vendorlist[index].product_list[jndex];
            console.log(element2);

            if (element2.productId == this.product_item.data.productId) {
              card.vendorlist[index].product_list[jndex].quantity = element2.quantity + 1;
              console.log('+1');

              break;

            } else if (jndex + 1 >= card.vendorlist[index].product_list.length) {
              card.vendorlist[index].product_list.push(product);
              console.log('add');
              break;
            }

          }
          break;
        } else if (index+1 >= card.vendorlist.length) {
          console.log('no vendor');
          card.vendorlist.push(vendorlist);

        }




      }
      console.log('card', card);


      localStorage.setItem("card", JSON.stringify(card));
    } else {


      card.vendorlist = [];
      card.vendorlist.push(vendorlist);
      console.log('card', card);

      localStorage.setItem("card", JSON.stringify(card));
    }

    this.countcart();


  }

  countcart() {
    try {

      this.countCard = 0;
      let card = new Card();
      card = JSON.parse(localStorage.getItem('card'));



      for (let index = 0; index < card.vendorlist.length; index++) {
        const element = card.vendorlist[index];
        this.countCard += element.product_list.length;

      }

    } catch (error) {

    }
  }

  closeLoading() {
    if (this.loadProduct_detail && this.productCategorie && this.loadVendorshop && this.loadvendorlist) {
      try {
        this.loading.then(v => {
          v.dismiss();
        });
      } catch (error) {
      }
    }
  }
}
