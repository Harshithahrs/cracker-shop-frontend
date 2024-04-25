import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CartDataService } from './cartdata.service';
import { CartService } from './cartServiceFirebase.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, catchError, from, map, of, switchMap, take } from 'rxjs';
import { ProductService } from './product.service';
import { CheckoutData } from '../model/CheckoutData';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  userId: string;

  constructor(private authService:AuthService,
      private firestore: AngularFirestore,
      private cartDataService:CartDataService,private cartService:CartService,
      private productService:ProductService,
    private router:Router) {
         this.userId = this.authService.getUserCookies();

       }
 saveInformation(checkoutData:CheckoutData){
  if (!this.userId) {
    console.error('User ID not available.');
    return;
  }
  //  const { customer, shippingAddress } = checkoutData;

   return from(this.firestore.collection(`users/${this.userId}/address`).add(checkoutData));
     
 }
 public placeOrder(): void {
  // if (!checkoutForm || !checkoutForm.value || !checkoutForm.value.customer || !checkoutForm.value.shippingAddress) {
  //   console.error('Invalid checkout form or form value.');
  //   return;
  // }
    if (!this.userId) {
      console.error('User ID not available.');
      this.router.navigate(['/login']);
      return;
    }
    // const { customer, shippingAddress } = checkoutData;
    // console.log('sservice',checkoutData)
    // console.log(customer,shippingAddress)
    this.cartService.fetchCartItemsWithMetadata().pipe(
      take(1),
      switchMap(cartData => {
        if (cartData.totalQuantity === 0) {
          // No items in the cart, handle the scenario (e.g., throw error or redirect)
          console.error('No items in the cart.');
          // You can redirect the user to the cart page
           this.router.navigate(['/cart-details']); // Import Router and inject it
          return of(null); // Returning empty observable or handle accordingly
        }
        const orderData = {
          userId:this.userId,
          // customerInfo: customer,
          // shippingAddress: shippingAddress,
          cartItems: cartData.cartItems,
          totalQuantity: cartData.totalQuantity,
          totalPrice: cartData.totalPrice,
          createdAt: new Date()
        };

        // Save order details to Firestore
        return from(this.firestore.collection(`orders/${this.userId}/products`).add(orderData)).pipe(
          switchMap(() => this.productService.updateProductStock(cartData.cartItems))
        );
        
      }),
      catchError(error => {
        console.error('Error placing order:', error);
        return of(null);
      })
    ).subscribe(() => {
      // Clear cart after placing the order
      this.cartService.clearCart();
    });
  }

  public getOrderHistory(): Observable<any> {
    return this.firestore
    .collection(`orders/${this.userId}/products`)
    .valueChanges()
    .pipe(
      map(products => {
console.log(products)        // Optionally map or transform the products if needed
        return products;
      })
    );
}
  }

