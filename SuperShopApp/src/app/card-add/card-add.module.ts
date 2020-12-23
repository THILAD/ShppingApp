import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardAddPageRoutingModule } from './card-add-routing.module';

import { CardAddPage } from './card-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardAddPageRoutingModule
  ],
  declarations: [CardAddPage]
})
export class CardAddPageModule {}
