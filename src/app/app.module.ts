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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    ProductCategoryMenuComponent,
    ProductComponent,
    ProductDescriptionComponent
    
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
