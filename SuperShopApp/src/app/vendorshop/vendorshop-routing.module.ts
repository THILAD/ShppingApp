import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VendorshopPage } from './vendorshop.page';

const routes: Routes = [
  {
    path: '',
    component: VendorshopPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendorshopPageRoutingModule {}
