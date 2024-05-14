import { Component } from '@angular/core';
import { CartService } from './service/cartServiceFirebase.service';
import { CartDataService } from './service/cartdata.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.componentupdated.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {
  title = 'cracker-frontend-app1';
  constructor(private toastr:ToastrService, private cartService:CartService,private cartData:CartDataService){
    
  }
  sidebarActive:boolean=false;
  toggleSidebar() {
    this.toastr.success('yest')
    console.log(this.toastr.success("hi"))
    this.sidebarActive = !this.sidebarActive;
    this.isSidebarOpen = !this.isSidebarOpen;

  }
  isSidebarOpen = false;
  ngOnInit() {
   this.cartService.cartItemsCollection;
  }
}
