import { Card, Product_model, Vendorlist } from './../../model/card.model';
import { Component, OnInit } from '@angular/core';
import { register } from "../../model/resgister.model";
import { Router, ActivatedRoute } from '@angular/router';
import { MediaService } from "../../services/media.services";
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  public user: any = new register();
  public card = new Card();
  public index: number
  cout: number = 0;
  public showselect: boolean = false;
  public selected: boolean = false
  element: any;
  data: any;

  constructor(
    private route: ActivatedRoute,
    public router:Router,
    public mediaService: MediaService
  ) { }


  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user);
    this.load()



  }
  load_image(path, image_name) {
    if (!path) {
      return 'http://via.placeholder.com/350x350 ';
    }
    const image = this.mediaService.Image_service(path, image_name, 250, 250);
    return image;
  }
  load() {
    this.route
      .queryParams
      .subscribe(params => {
        this.loadcardindex(params['cardindex']);
        // this.setPrice(params['cardindex']);

      });
  }
  // user(){
  //   localStorage.setItem("card", JSON.stringify('user'));

  loadcardindex(index: number): void {
    this.index = index;
    this.card = JSON.parse(localStorage.getItem('card'));
    console.log(this.card);

  }
  onselect(number: number) {
    if (number == 1) {
      this.showselect = true;
      console.log(this.showselect);

    } else {
      this.showselect = false;
      console.log(this.showselect);

    }
      
    

  }
  plusCount(i) {

    this.card.vendorlist[this.index].product_list[i].quantity = this.card.vendorlist[this.index].product_list[i].quantity + 1;
  }
  deleteCount(i) {

    this.card.vendorlist[this.index].product_list[i].quantity = this.card.vendorlist[this.index].product_list[i].quantity - 1;


  }
  reMoveItem(i: any) {
    if (this.card.vendorlist[this.index].product_list.length == 1) {
      this.card.vendorlist.splice(this.index, 1);
      if(this.card.vendorlist.length==0){
        localStorage.removeItem('card');
        this.router.navigate(['/'])
      }else{
        localStorage.setItem("card", JSON.stringify(this.card));
        this.router.navigate(['/card-add'])
      }
     
     

      return
    }
    this.card.vendorlist[this.index].product_list.splice(i, 1);
    localStorage.setItem("card", JSON.stringify(this.card));
    let card = new Card();
    card = JSON.parse(localStorage.getItem('card'));
  }
  countotal() {
    let total = 0
    for (let index = 0; index < this.card.vendorlist[this.index].product_list.length; index++) {
      const element = this.card.vendorlist[this.index].product_list[index];
      total += (element.price * element.quantity);
    }
    return total
  }


  gotoCheckbin() {
    console.log('checkbin');

  }
}
