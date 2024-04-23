import { Component, Input, OnInit, input } from '@angular/core';
import { CartDataService } from '../../service/cartdata.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {
  totalPrice: number = 0;
  totalQuantity: number = 0;
  private cartDataSubscription!: Subscription;
 constructor(private cartDataService: CartDataService){}
  ngOnInit(): void {

    this.cartDataSubscription = this.cartDataService.totalPrice$.subscribe(price=>{
      this.totalPrice=price;
    }); // Retrieve totalPrice from shared service
    this.cartDataSubscription = this.cartDataService.totalQuantity$.subscribe(quantiy=>{
      this.totalQuantity=quantiy
    }); // Re
    console.log('hi',this.totalPrice,this.totalPrice)
 }


  }


