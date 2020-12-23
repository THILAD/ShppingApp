import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Card, Product_model, Vendorlist } from './../../model/card.model';

import { AppService } from "../../services/shared.service";
import { Subscription } from "rxjs";
@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  login:boolean;
  user:any;
  public card = new Card();
  public cartNumber:number

  private messageCartSubscription: Subscription
  constructor(
    private messengerService:AppService,
    public router:Router,
  ) { 
    this.login=false;

  }

  ngOnInit() {
    // this.card = JSON.parse(localStorage.getItem('card'));
    this.showcard()
    // console.log(this.card);
    this.messageCartSubscription = this.messengerService.messageAccountload.subscribe(m => {
     
      this.loader();
    });

    this.loader();

  }

  loader(){
    if(localStorage.getItem('token')){
      this.user= JSON.parse(localStorage.getItem('user'));
      console.log(this.user,"okokookokok");
      
      this.login=true;
    }else{
      this.login=false;
    }
  }

  showcard(){
    try {

      let card = new Card();
      card = JSON.parse(localStorage.getItem('card'));
      for (let index = 0; index < card.vendorlist.length; index++) {
        // const element = card.vendorlist[index];
        this.cartNumber = card.vendorlist.length;
        console.log('oooooooooooooooooooooooooooooo',card.vendorlist.length
        );
        console.log();
        
        

      }

    } catch (error) {

    }
  }

  cartNext(){
this.router.navigate(['/card-add'])
  }
  onLogout(){
    console.log('logout');
  //   localStorage.removeItem('token');
    
  //   localStorage.removeItem('user');

  
  //  this.loader();
  this.router.navigate(['/setting'])

  }
}

