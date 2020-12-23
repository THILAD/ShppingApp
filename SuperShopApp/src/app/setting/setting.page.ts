import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  login:boolean;
  user:any;
  constructor(public router:Router) { }

  ngOnInit() {
    this.loader()
  }
nextEditprofile(){
this.router.navigate(['/editprofile'])
}
nextTolocation(){
this.router.navigate(['/location'])

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
onLogout(){
  console.log('logout');
  localStorage.removeItem('token');
  
  localStorage.removeItem('user');


 this.loader();
this.router.navigate(['/'])

}


}
