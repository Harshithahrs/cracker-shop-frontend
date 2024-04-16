import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { HomeComponent } from './component/home/home.component';
import { ProductCategoryMenuComponent } from './component/product-category-menu/product-category-menu.component';
import { ProductComponent } from './component/product/product.component';
import { ProductDescriptionComponent } from './component/product-description/product-description.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'home',component:HomeComponent},
  {path:'category',component:ProductCategoryMenuComponent},
  { path: 'category/:id', component: ProductCategoryMenuComponent },
  { path: 'products/:categoryId', component: ProductComponent },
  { path: 'products', component:ProductComponent },
  { path: 'products/:id', component: ProductDescriptionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
