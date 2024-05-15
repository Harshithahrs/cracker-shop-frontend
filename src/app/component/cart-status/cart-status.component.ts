import { Component, Input, OnDestroy, OnInit, input } from '@angular/core';
import { CartDataService } from '../../service/cartdata.service';
import { Subscription } from 'rxjs';
import { CartService } from '../../service/cartServiceFirebase.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements  OnInit{
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService,private cartDataService: CartDataService) {}

  ngOnInit(): void {
    this.fetchCartItems();
    this.totalPrice;
    this.totalQuantity
  }

  fetchCartItems() {
    this.cartService.fetchCartItemsWithMetadata().subscribe(data => {
      this.totalPrice = data.totalPrice;
      this.totalQuantity = data.totalQuantity;
    })
  }
   
  
}
