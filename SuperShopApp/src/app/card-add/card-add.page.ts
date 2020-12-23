
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Card, Product_model } from "../../model/card.model";
import { MediaService } from "../../services/media.services";

@Component({
  selector: 'app-card-add',
  templateUrl: './card-add.page.html',
  styleUrls: ['./card-add.page.scss'],
})
export class CardAddPage implements OnInit {
  public card = new Card();
  constructor(
    private router: Router,
    public mediaService: MediaService


  ) { }

  ngOnInit() {

    this.card = JSON.parse(localStorage.getItem('card'));
    console.log(this.card);
    

  }
  load_image(path, image_name) {
    if (!path) {
      return 'http://via.placeholder.com/350x350 ';
    }
    const image = this.mediaService.Image_service(path, image_name, 250, 250);
    return image;
  }
  setPrice(data: Array<Product_model>) {
    let total = 0
    for (let index = 0; index < data.length; index++) {
      const element =  data[index]
        total += Math.floor(element.price);
    }

    return total;


  }
  goTocheckouk( index:number){

  
  this.router.navigate(['/checkout'], { queryParams: { cardindex: index} })

  }

}
