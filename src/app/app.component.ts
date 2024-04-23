import { Component } from '@angular/core';
import { CartService } from './service/cartServiceFirebase.service';
import { CartDataService } from './service/cartdata.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.componentupdated.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'cracker-frontend-app1';
  constructor(private cartService:CartService,private cartData:CartDataService){}
  sidebarActive:boolean=true;
  toggleSidebar() {
    this.sidebarActive = !this.sidebarActive;
  }
}
