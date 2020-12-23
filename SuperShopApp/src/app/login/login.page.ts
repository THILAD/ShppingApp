import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AuthService } from "../../services/auth.services";
import { AppService } from "../../services/shared.service";
import { Subscription } from "rxjs";
import { login } from "../../model/login.model";
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit,OnDestroy {
  public mobilenumber: string;
  public password: any;
  private messageSubscription: Subscription;
  constructor(
    private authService: AuthService,
    private messgeservice:AppService,
    public route: Router,
    public loadingContrl: LoadingController,
    public alertController: AlertController,
  

  ) { }

  ngOnInit() {
  
  }
  ngOnDestroy(): void {
    try {
      this.messageSubscription.unsubscribe();
    } catch (error) {
      
    }
    
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
  

  res_login(res: any) {
    // this.showToast(res.message);
    console.log(res);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    // this.onDismiss();
    // this.events.publish('user:login', res.data.user);
    //  this.updatelogin('login');
  }
  error_data(res: any) {

    console.log(res.error);
    // this.showToast(res.error.message);
  }

  async Login() {
    const loading = await this.loadingContrl.create({
      cssClass: 'my-custom-class',
      message: 'ກຳລັງໂຫລດ...'

    });
     loading.present();

    const param = new login()
    param.emailId = this.mobilenumber + '@laoapp.com'
    param.password = this.password
    if (this.mobilenumber && this.password) {
      this.authService.login(param).subscribe(res => {
        this.res_login(res)
        this.messgeservice.UpdateAccountload('value');
        loading.dismiss();
        this.route.navigateByUrl('/tabs')
      }, e => {
        this.error_data(e)
        this.alert_error();
        loading.dismiss();

      })
    }else{
      this.alert_error();
      loading.dismiss();
    }
  }

  keymobilenumber(event: KeyboardEvent) {
    this.mobilenumber = (event.target as HTMLInputElement).value
  }
  keypassword(event: KeyboardEvent) {
    this.password = (event.target as HTMLInputElement).value

    console.log();

  }
}
