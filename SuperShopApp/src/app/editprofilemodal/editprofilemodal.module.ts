import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditprofilemodalPageRoutingModule } from './editprofilemodal-routing.module';

import { EditprofilemodalPage } from './editprofilemodal.page';
import { Camera } from '@ionic-native/camera/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditprofilemodalPageRoutingModule
  ],
  
  declarations: [EditprofilemodalPage],
  providers: [
  
    Camera,
   
  ],

})
export class EditprofilemodalPageModule {}
