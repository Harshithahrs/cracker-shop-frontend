import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../model/CartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItem: CartItem) {
    // Check if we already have the item in our cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem | null = null;

    // Find the item in the cart based on item id
    for (let tempCartItem of this.cartItems) {
      if (tempCartItem.id === theCartItem.id) {
        existingCartItem = tempCartItem;
        break;
      }
    }

    // Check if we found it
    alreadyExistsInCart = (existingCartItem !== null);

    if (alreadyExistsInCart) {
      if (existingCartItem) {
        existingCartItem.quantity++;
      }
    } else {
      this.cartItems.push(theCartItem);
    }

    // Compute cart total price and total quantity
    this.computeCartTotals();
  }

 public computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('Contents of the cart:');
    for (let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`Name: ${tempCartItem.name}, Quantity: ${tempCartItem.quantity}, Unit Price: ${tempCartItem.unitPrice}, Subtotal Price: ${subTotalPrice}`);
    }
    console.log(`Total Price: ${totalPriceValue.toFixed(2)}, Total Quantity: ${totalQuantityValue}`);
    console.log('-----------------------');
  }

  decrementQuantity(theCartItem: CartItem) {
    theCartItem.quantity--;
    if (theCartItem.quantity === 0) {
      this.remove(theCartItem);
    } else {
      this.computeCartTotals();
    }
  }

  remove(theCartItem: CartItem) {
    // Get index of item in the array
    const itemIndex = this.cartItems.findIndex(tempCartItem => tempCartItem.id === theCartItem.id);

    // If found, remove the item from the array
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
      this.computeCartTotals();
    }
  }
}
