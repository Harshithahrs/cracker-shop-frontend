import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CheckoutService } from '../../service/checkout.service';
import { AuthService } from '../../service/auth.service';
import { CartItem } from '../../model/CartItem';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent {
  orderHistory$!: Observable<any>;
  cartItems$:CartItem[]=[];
  constructor(private checkoutService: CheckoutService) {}

  ngOnInit(): void {
    // Example: Fetch order history for a specific user (replace 'userId' with actual user ID)
    this.orderHistory$ = this.checkoutService.getOrderHistory();
    this.orderHistory$.forEach(cartItems=>{
      this.cartItems$=cartItems
    })
    console.log(this.orderHistory$);
  }
}
