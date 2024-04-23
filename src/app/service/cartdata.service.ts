import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartDataService {
    // private totalPriceSubject = new BehaviorSubject<number>(0);
    // private totalQuantitySubject = new BehaviorSubject<number>(0);
  
    // totalPrice$ = this.totalPriceSubject.asObservable();
    // totalQuantity$ = this.totalQuantitySubject.asObservable();
  
  constructor() {}
  private totalPriceSource = new BehaviorSubject<number>(0);
  private totalQuantitySource = new BehaviorSubject<number>(0);

  totalPrice$ = this.totalPriceSource.asObservable();
  totalQuantity$ = this.totalQuantitySource.asObservable();

  updateTotalPrice(price: number): void {
    this.totalPriceSource.next(price);
  }

  updateTotalQuantity(quantity: number): void {
    this.totalQuantitySource.next(quantity);
  }
//   setCartData(price: number, quantity: number) {
//     this.totalPriceSubject.next(price);
//     this.totalQuantitySubject.next(quantity);
//   }

//   getCartTotalPrice(): Observable< number> {
//     return this.totalPrice$;
//   }

//   getCartTotalQuantity():Observable< number> {
//     return this.totalQuantity$;
//   }
  
}
