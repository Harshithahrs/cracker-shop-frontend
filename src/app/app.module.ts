import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { HomeComponent } from './component/home/home.component';
import { AngularFireModule } from '@angular/fire/compat'; // Use compat for Angular 16
import { AngularFireAuthModule } from '@angular/fire/compat/auth'; // Optional for Authentication
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'; // Optional for Firestore
import { environment } from '../environments/environment.prod';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { ProductCategoryMenuComponent } from './component/product-category-menu/product-category-menu.component';
import { ProductComponent } from './component/product/product.component';
import { ProductDescriptionComponent } from './component/product-description/product-description.component';
import { SingleCategoryComponent } from './component/single-category/single-category.component';
import { CartDetailsComponent } from './component/cart-details/cart-details.component';
import { CartStatusComponent } from './component/cart-status/cart-status.component';
import { DropDownMenuComponent } from './drop-down-menu/drop-down-menu.component';
import { CartService } from './service/cartServiceFirebase.service';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { OrderSuccessComponent } from './component/order-success/order-success.component';
import { OrderHistoryComponent } from './component/order-history/order-history.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    ProductCategoryMenuComponent,
    ProductComponent,
    ProductDescriptionComponent,
    SingleCategoryComponent,
    CartDetailsComponent,
    CartStatusComponent,
    DropDownMenuComponent,
    CheckoutComponent,
    OrderSuccessComponent,
    OrderHistoryComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireAuthModule, // Import if using Authentication
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    AngularFireStorageModule,
    CommonModule
  ],
  providers: [CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
