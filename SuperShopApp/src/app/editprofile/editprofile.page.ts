import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { EditprofilemodalPage } from "../editprofilemodal/editprofilemodal.page";
@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {

  constructor(public modalContrl: ModalController) { }

  ngOnInit() {
  }
  async modalphoto() {
    
    const modal = await this.modalContrl.create({  
      component: EditprofilemodalPage  
    });  
    return await modal.present();  
  } 
  }


