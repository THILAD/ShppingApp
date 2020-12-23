import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-verification',
  templateUrl: './verification.page.html',
  styleUrls: ['./verification.page.scss'],
})
export class VerificationPage implements OnInit {

  constructor(
    public modalCtr: ModalController,
    public router:Router
  ) { }

  ngOnInit() {
  }
  close() {  
    this.modalCtr.dismiss();  
    this.router.navigateByUrl('')
  }  
}
