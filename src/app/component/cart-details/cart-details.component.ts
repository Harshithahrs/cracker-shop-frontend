import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../model/CartItem';
import { CartService } from '../../service/cartServiceFirebase.service';
import { CartDataService } from '../../service/cartdata.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {
  cartItems: CartItem[] = [];
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
      this.cartItems = data.cartItems;
      this.totalPrice = data.totalPrice;
      this.totalQuantity = data.totalQuantity;
      // this.cartDataService.setCartData(data.totalPrice, data.totalQuantity)
      console.log(this.totalPrice)
      console.log(this.totalQuantity)
    });
  }
  incrementQuantity(productId: string){
    this.cartService.increaseQuantity(productId)
  }
  decrementQuantity(productId: string){

    this.cartService.decreaseQuantity(productId);
  }
  removeAllCartItem(){
    this.cartService.clearCart();
  }

  // listCartDetails() {
  //   //get a handle to the art items
  //   this.cartItems=this.cartService.cartItems;

  //   //subscribe to the cart total price
  //   this.cartService.totalPrice.subscribe(
  //     data => this.totalPrice=data
  //   );

  //   //subscribe to the cart totalQuantity
  // this.cartService.totalQuantity.subscribe(
  //   data => this.totalQuantity=data
  // );

  // //compute cart total price and quantity
  //  this.cartService.computeCartTotals();

  // }
  // incrementQuantity(theCartItem:CartItem){
  //   this.cartService.addToCart(theCartItem);
  // }
  // decrementQuantity(theCartItem:CartItem){
  //   this.cartService.decrementQuantity(theCartItem)
  // }
  // remove(theCartItem:CartItem){
  //   this.cartService.remove(theCartItem);
  // }

}
