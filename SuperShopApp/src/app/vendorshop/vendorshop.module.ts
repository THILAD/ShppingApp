import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VendorshopPageRoutingModule } from './vendorshop-routing.module';

import { VendorshopPage } from './vendorshop.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VendorshopPageRoutingModule
  ],
  declarations: [VendorshopPage]
})
export class VendorshopPageModule {}
