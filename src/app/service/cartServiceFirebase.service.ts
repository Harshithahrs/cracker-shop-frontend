import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { CartItem, CartItemWithMetadata } from '../model/CartItem';
import { CartDataService } from './cartdata.service';
import { CustomSnackbarService } from './snackBar.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
   cartItemsCollection!: AngularFirestoreCollection<CartItem>;
  private userId!: string;
  private initialized$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private totalPriceSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private totalQuantitySubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  totalPrice$ = this.totalPriceSubject.asObservable();
  totalQuantity$ = this.totalQuantitySubject.asObservable();


  constructor(private firestore: AngularFirestore, private authService: AuthService,
    private cartData:CartDataService,private snackService:CustomSnackbarService) {
    this.userId=authService.getUserCookies();
    // const store=localStorage.getItem('user');
    // this.authService.getUserId().subscribe(userId => {
console.log('hey id',this.userId)
      if(this.userId)
       { 

      this.cartItemsCollection = this.firestore.collection<CartItem>(`cart-item/${this.userId}/products`);
      this.initialized$.next(true);   
    }
    };
  

  addToCart(product: CartItem): void {
    if (!this.userId) {
      console.error('User ID not available.');
      return;
    }

    const cartItemData: CartItem = { ...product, userId: this.userId }; // Ensure cart item has user ID
    const productId = product.productId;

    this.cartItemsCollection.doc(productId).get().subscribe(doc => {
      if (doc.exists) {
        const existingItem = doc.data() as CartItem;
        this.snackService.open("Item quantity increaded by one to cart-Item","close",3000)

        this.cartItemsCollection.doc(productId).update({ quantity: existingItem.quantity + product.quantity });
      } else {
        this.snackService.open("Item added to cart","close",3000)

        this.cartItemsCollection.doc(productId).set(cartItemData, { merge: true });
      }
    });
  }
  
  fetchCartItemsWithMetadata(): Observable<CartItemWithMetadata> {
   
    if (!this.userId) {
      console.error('User ID not available.');
      return new Observable<CartItemWithMetadata>(observer => {
        observer.next({ cartItems: [], totalQuantity: 0, totalPrice: 0 });
      });
    }

    return this.cartItemsCollection.valueChanges({ idField: 'id' }).pipe(
      map(cartItems => {
        console.log('this',cartItems);
        const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
        const totalPrice = cartItems.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0);
        this.totalQuantitySubject.next(totalQuantity);
        this.totalPriceSubject.next(totalPrice);
        this.cartData.updateTotalPrice(totalPrice);
        this.cartData.updateTotalQuantity(totalQuantity)
        return {
          cartItems: cartItems,
          totalQuantity: totalQuantity,
          totalPrice: totalPrice
        };
      })
    );
  }
  // ngOnDestroy() {
  //   this.unsubscribe$.next();
  //   this.unsubscribe$.complete();
  // }


  increaseQuantity(productId: string): void {
    this.cartItemsCollection.doc(productId).get().subscribe(doc => {
      if (doc.exists) {
        const existingItem = doc.data() as CartItem;
        this.snackService.open("Item Increase by one  to cart","close",3000)

        this.cartItemsCollection.doc(productId).update({ quantity: existingItem.quantity + 1 });
      }
    });
  }

  decreaseQuantity(productId: string): void {
    this.cartItemsCollection.doc(productId).get().subscribe(doc => {
      if (doc.exists) {
        const existingItem = doc.data() as CartItem;
        if (existingItem.quantity > 1) {
        this.snackService.open("Item quantity decreased in cart","close",3000)

          this.cartItemsCollection.doc(productId).update({ quantity: existingItem.quantity - 1 });
        } else {
          this.cartItemsCollection.doc(productId).delete();
        }
      }
    });
  }

  clearCart(): void {
    this.snackService.open("Item removed your cart is empty","close",3000)

    this.cartItemsCollection.get().subscribe(querySnapshot => {
      querySnapshot.forEach(doc => doc.ref.delete());
    });
  }
}
