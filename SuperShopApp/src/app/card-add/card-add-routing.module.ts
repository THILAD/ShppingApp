import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardAddPage } from './card-add.page';

const routes: Routes = [
  {
    path: '',
    component: CardAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardAddPageRoutingModule {}
