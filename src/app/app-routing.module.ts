import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { HomeComponent } from './component/home/home.component';
import { ProductCategoryMenuComponent } from './component/product-category-menu/product-category-menu.component';
import { ProductComponent } from './component/product/product.component';
import { ProductDescriptionComponent } from './component/product-description/product-description.component';
import { SingleCategoryComponent } from './component/single-category/single-category.component';
import { CartDetailsComponent } from './component/cart-details/cart-details.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { AuthGuard } from './service/authGuard.service';
import { CartStatusComponent } from './component/cart-status/cart-status.component';
import { OrderSuccessComponent } from './component/order-success/order-success.component';
import { OrderHistoryComponent } from './component/order-history/order-history.component';
import { UserDashboardComponent } from './component/user-dashboard/user-dashboard.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'home',component:HomeComponent},
  {path:'category',component:ProductCategoryMenuComponent},
  { path: 'category/:id', component: ProductCategoryMenuComponent },
  { path: 'products/:categoryId', component: ProductDescriptionComponent, canActivate: [AuthGuard] },
  { path: 'products', component:ProductComponent },
  {path:'',component:ProductComponent},
  {path:'category/:category/:id',component:SingleCategoryComponent},
  { path: 'products/:id', component: ProductDescriptionComponent, canActivate: [AuthGuard] },
  {path:'cart-details',component:CartDetailsComponent, canActivate: [AuthGuard]},
  {path:'checkout',component:CheckoutComponent, canActivate: [AuthGuard]},
  {path:'cart-status',component:CartStatusComponent,canActivate:[AuthGuard]},
  {path:'order-status',component:OrderSuccessComponent,canActivate:[AuthGuard]},
  {path:'order-history',component:OrderHistoryComponent,canActivate:[AuthGuard]},
  {path:'userDashboard',component:UserDashboardComponent,canActivate:[AuthGuard]},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
