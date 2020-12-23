import { Component, OnInit,OnDestroy  } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage implements OnInit {
  public mobilenumber: string;
  public password: any;
  constructor(
    public loadingContrl: LoadingController,
    public alertController: AlertController,

  ) { }

  ngOnInit() {
  
  }


  //alert pup up error
  async alert_error() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: 'ປ້ອນເບີໂທຫຼືລະຫັດຜ່ານໄຫ້ຖືກຕ້ອງ',
      buttons: ['ຍົກເລີກ']
    });

    await alert.present();
  }
  
  async Login() {
   
  }

  keymobilenumber(event: KeyboardEvent) {
    this.mobilenumber = (event.target as HTMLInputElement).value
  }
  keypassword(event: KeyboardEvent) {
    this.password = (event.target as HTMLInputElement).value
  }
  keyoldpassword(event: KeyboardEvent) {
    this.password = (event.target as HTMLInputElement).value
  }
}
