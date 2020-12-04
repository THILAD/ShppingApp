import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.page.html',
  styleUrls: ['./product-info.page.scss'],
})
export class ProductInfoPage implements OnInit {


  slideOpts = {
    initialSlide: 0,
    speed: 400,
    startAutoplay:true
  };
  constructor() { }
  slidesDidLoad(slides) {
    slides.startAutoplay();
  }
  ngOnInit() {
  }

}
