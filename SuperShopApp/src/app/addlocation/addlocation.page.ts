import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-addlocation',
  templateUrl: './addlocation.page.html',
  styleUrls: ['./addlocation.page.scss'],
})
export class AddlocationPage implements OnInit {


  customActionSheetOptions: any = {
    header: 'ແຂວງ',
    subHeader: 'ເລືອກແຂວງຂອງທ່ານ'
  };
  customDistrictOptions: any = {
    header: 'ເມືອງ',
    subHeader: 'ເລືອກເມືອງຂອງທ່ານ'
  };
  provincesArray = [
   'ແຂວງ ຜົ້ງສາລີ', 
   'ແຂວງ ບໍ່ແກ້ວ', 
   'ແຂວງຫລວງນໍ້າທາ', 
   'ແຂວງ ອຸດົມໄຊ',
   'ແຂວງ ຫຼວງພະບາງ',
   'ແຂວງ ໄຊຍະບູລີ',
   'ແຂວງ ວຽງຈັນ',
   'ນະຄອນຫຼວງວຽງຈັນ',
   'ແຂວງ ໄຊສົມບູນ', 
   'ແຂວງ ບໍລິຄໍາໄຊ', 
   'ແຂວງ ຄໍາມ່ວນ', 
   'ແຂວງ ສະຫວັນນະເຂດ',
   'ແຂວງ ສາລະວັນ',
   'ແຂວງ ເຊກອງ',
   'ແຂວງ ປາກເຊ',
   'ແຂວງ ອັດຕະປີ', ]

  constructor(
    public router:Router,
    public alertController: AlertController
    ) { }

  ngOnInit() {
  }


  nextTomap(){this.router.navigate(['locationmap'])
  }

  async presentAlertMultipleButtons() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: ['Cancel', 'Open Modal', 'Delete']
    });

    await alert.present();
  }

  confrimSave(){
this.presentAlertMultipleButtons()
  }
}
