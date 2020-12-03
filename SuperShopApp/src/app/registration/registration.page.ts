import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { VerificationPage } from "../verification/verification.page";
@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  constructor( 
    public modalCtr: ModalController

  ) { }

  ngOnInit() {
  }
  async showModalVerification() {
    const modal = await this.modalCtr.create({
      component: VerificationPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }
}
