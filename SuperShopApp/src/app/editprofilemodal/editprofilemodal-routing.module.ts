import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditprofilemodalPage } from './editprofilemodal.page';

const routes: Routes = [
  {
    path: '',
    component: EditprofilemodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditprofilemodalPageRoutingModule {}
