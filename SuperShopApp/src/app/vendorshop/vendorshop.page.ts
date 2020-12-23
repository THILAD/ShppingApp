import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { topselling_data } from "../../model/product.topselling.model"
import { vendorProduct_data, vendorProduct_list, vendorProfile_data, vendorProfile_list } from "../../model/product.vendor.model";
import { objectlocalStorage_data } from "../../model/product.model"

import { TopsellingService } from "../../services/product.topselling.services"
import { MediaService } from "../../services/media.services"
import { ProductVendorService } from "../../services/product.vendor.services";
import { ProductService } from "../../services/product.services";


import { } from "module";
@Component({
  selector: 'app-vendorshop',
  templateUrl: './vendorshop.page.html',
  styleUrls: ['./vendorshop.page.scss'],
})
export class VendorshopPage implements OnInit {
  public topselling: topselling_data;
  public vendorProduct_data: vendorProduct_data;
  public vendorProfile_data: vendorProfile_data;
  public vendor: any = [];
  public loadvendorN: objectlocalStorage_data;

  constructor(
    public topsellingService: TopsellingService,
    public mediaService: MediaService,
    public productVendorService: ProductVendorService,
    public productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,


  ) { }

  ngOnInit() {
    // this.lovendorname()
    //   this.loadData();
    //  this.loadProductVendor();
    //  this.lovendorname()
    // console.log("okookok");

    this.load();
  }

  load() {

    let id = this.route.snapshot.paramMap.get('vendorshopId');

    console.log(id);
    this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.lovendorname(params['vendorshopId']);
        this.loadData(params['vendorshopId']);
        this.loadProductVendor(params['vendorshopId']);
      });
  }
  //load image//
  load_image(path, image_name) {
    if (!path) {
      return 'http://via.placeholder.com/350x350 ';
    }
    const image = this.mediaService.Image_service(path, image_name, 250, 250);
    return image;
  }
  //end load image//
  //result vendor lsit//
  res_vender_list(res) {

    const product_get = JSON.parse(localStorage.getItem("productId")) as objectlocalStorage_data;
    product_get.countvendor = res;
    localStorage.setItem("productId", JSON.stringify(product_get));
    console.log(product_get);
  }
  //end result vendor list//
  //result vendor name//
  res_vender_name(res: any) {
    this.vendor = res;
    console.log('vendor_name 77777777777777', this.vendor[0].vendor_name);

  }
  //result vendor name//

  //load vendor name//
  async lovendorname(vendorid: number) {
    this.loadvendorN = new objectlocalStorage_data();
    // const vendor_lis = [];
    const vendor = await this.productService.loadvendor_id({ "id": vendorid });
    vendor.subscribe(
      (res) => this.res_vender_name(res)
      ,
      (err) => console.log(err)

    );

  }
  //end load vendor name//
  // load all data and refresh //
  async loadData(vendorid: number) {
    const param = {
      vendorid: vendorid
    }
    const loadTopSelling = await this.topsellingService.loadTopSellingVendor(param);
    loadTopSelling.subscribe(
      (res) => this.res_top_selling(res)
      ,
      (err) => console.log(err)
    );
  } catch(error) {
    alert('1 ' + JSON.stringify(error));
  }

  // this.refresher = event.target;
  // this.onRefreshComplete();
  // this.showContentView();

  //result top selling//
  res_top_selling(res: any) {
    this.topselling = res.body.data;
    console.log('top selling', this.topselling);
  }
  //end result top selling/



  // load ding vendor product

  //result vendor lsit//
  //result vendor product //
  res_productVendor_list(ven: any) {
    try {
      if (this.vendorProduct_data.data) {
        if (this.vendorProduct_data.data.length > 0) {
          this.vendorProduct_data.data = this.vendorProduct_data.data.concat(ven.data);
        }
      } else {
        this.vendorProduct_data = ven;
      }
      console.log('Vendor product', this.vendorProduct_data);

      console.log('length', this.vendorProduct_data.data.length)
    } catch (error) {
      console.log(error);
    }
  }
  //end result vendor product//
  //end result vendor list//

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
productNext(productId: number){
  console.log('okokoko');

  console.log('next ok',productId);
  this.router.navigate(['/product-info'], { queryParams: { productId: productId } })
    
}

  // end load product vendor//
}
  //end load all data and refresh //

