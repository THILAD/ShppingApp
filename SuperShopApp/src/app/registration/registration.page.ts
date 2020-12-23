import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

import { Router } from '@angular/router';

import { register } from "../../model/resgister.model";
import { AuthService } from "../../services/auth.services";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  public username: string;
  public mobilenumber: string;
  public password: string;
  public confrimpassword;
  constructor(
    public modalCtr: ModalController,
    public authService: AuthService,
    public loadingContrl:LoadingController,
    public router:Router,
    public alertController: AlertController

  ) { }

  ngOnInit() {
  }


 //alert pup up error
 async alert_error() {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    message: 'ກາລຸນາປ້ອນຂໍ້ມູນໄຫ້ຖືກຕ້ອງ',
    buttons: ['ຍົກເລີກ']
  });

  await alert.present();
}
  



async  onregister() {
    const loading = await this.loadingContrl.create({
      cssClass: 'my-custom-class',
      message: 'ກຳລັງໂຫລດ...'
    });
    await loading.present();
    const resgisterData = new register();
    resgisterData.name = this.username;
    resgisterData.emailId = this.mobilenumber + "@laoapp.com";
    resgisterData.password = this.password;
    resgisterData.confirmPassword = this.confrimpassword
    console.log(resgisterData);

    this.authService.register(resgisterData).subscribe(res => {
      console.log('registion succesfully');
      loading.dismiss();
this.router.navigateByUrl('/login')

    }, err => {
      console.log(err);
      this.alert_error()
      loading.dismiss();
    })
  }

  keyusername(event: KeyboardEvent) {
    this.username = (event.target as HTMLInputElement).value
  }
  keymobilenumber(event: KeyboardEvent) {
    this.mobilenumber = (event.target as HTMLInputElement).value
  }
  keypassword(event: KeyboardEvent) {
    this.password = (event.target as HTMLInputElement).value
  }
  keyconfirmpassword(event: KeyboardEvent) {
    this.confrimpassword = (event.target as HTMLInputElement).value
  }
}
