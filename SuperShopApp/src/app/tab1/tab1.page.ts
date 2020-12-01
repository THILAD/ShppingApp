import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  show_Seacrh: boolean;

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    startAutoplay:true
  };

 
  constructor() { 


  }
  slidesDidLoad(slides) {
    slides.startAutoplay();
  }


  show_Serach_Input() {
    if (this.show_Seacrh == true) {
      this.show_Seacrh = false;
    } else {
      this.show_Seacrh = true;
    }

  }
}