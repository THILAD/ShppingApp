import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then( m => m.AccountPageModule)
  },
 
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'verification',
    loadChildren: () => import('./verification/verification.module').then( m => m.VerificationPageModule)
  },
  {
    path: 'product-info',
    loadChildren: () => import('./product-info/product-info.module').then( m => m.ProductInfoPageModule)
  },

  {
    path: 'forgotpassword',
    loadChildren: () => import('./forgotpassword/forgotpassword.module').then( m => m.ForgotpasswordPageModule)
  },  {
    path: 'vendorshop',
    loadChildren: () => import('./vendorshop/vendorshop.module').then( m => m.VendorshopPageModule)
  },
  {
    path: 'card-add',
    loadChildren: () => import('./card-add/card-add.module').then( m => m.CardAddPageModule)
  },
  {
    path: 'checkout',
    loadChildren: () => import('./checkout/checkout.module').then( m => m.CheckoutPageModule)
  },
  {
    path: 'setting',
    loadChildren: () => import('./setting/setting.module').then( m => m.SettingPageModule)
  },
  {
    path: 'editprofile',
    loadChildren: () => import('./editprofile/editprofile.module').then( m => m.EditprofilePageModule)
  },
  {
    path: 'location',
    loadChildren: () => import('./location/location.module').then( m => m.LocationPageModule)
  },
  {
    path: 'addlocation',
    loadChildren: () => import('./addlocation/addlocation.module').then( m => m.AddlocationPageModule)
  },
  {
    path: 'locationmap',
    loadChildren: () => import('./locationmap/locationmap.module').then( m => m.LocationmapPageModule)
  },
  {
    path: 'editprofilemodal',
    loadChildren: () => import('./editprofilemodal/editprofilemodal.module').then( m => m.EditprofilemodalPageModule)
  }



];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
