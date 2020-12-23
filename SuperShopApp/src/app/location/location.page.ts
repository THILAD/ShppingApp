import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {

  constructor( public router:Router) { }

  ngOnInit() {
  }

  nextToaddlocation(){
this.router.navigate(['addlocation'])
  }

}
