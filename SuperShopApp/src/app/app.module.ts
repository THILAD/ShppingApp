import { category_model } from './../model/product.model';
 // modules import
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Camera } from '@ionic-native/camera/ngx';
//api import
import { Api } from "../services/api";
import { AuthService } from "../services/auth.services";
import { AppService } from "../services/shared.service";
import { ProductService } from "../services/product.services";
import { MediaService } from "../services/media.services";
import { CategoryService } from "../services/category.service";
import { ProductVendorService } from "../services/product.vendor.services";
import {TopsellingService } from "../services/product.topselling.services";
import {LoadcardService } from "../services/loadcard.service";







@NgModule({
  declarations: [AppComponent,],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
    // HttpClient
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Api,
    AuthService,
    AppService,
    ProductService,
    MediaService,
    CategoryService,
    ProductVendorService,
    TopsellingService,
    LoadcardService,
    Camera,
   
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
