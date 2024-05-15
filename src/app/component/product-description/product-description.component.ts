import { Component } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Product } from '../../model/Prdouct';
import { CartItem } from '../../model/CartItem';
import { CartService } from '../../service/cartServiceFirebase.service';

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrl: './product-description.component.css'
})
export class ProductDescriptionComponent {
  product$!: Observable<Product | undefined>;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService:CartService

  ) { }

  ngOnInit(): void {
    this.product$ = this.route.paramMap.pipe(
      switchMap(params => {
        console.log(params)
        const productId = params.get('categoryId');
        console.log(productId)
        if (productId) {
          return this.productService.getProductById(productId);
        } else {
          // Handle case where productId is null (though unlikely with route configuration)
          console.error('Product ID is null');
          return new Observable<Product | undefined>(); // Return empty observable or handle differently
        }
      })
    );
  }
  instoke:boolean=false;
  getProductAvailability(product: Product): string {
    
    if(product.productStock <= 0){ 
      this.instoke=true;
    return 'Out of Stock';
      
    }
    return 'In Stock' 

  }
  addToCart(theProduct:Product){
    console.log(`Adding to cart: ${theProduct.title},${theProduct.productPrice}`);
    //do add in cart
    const theCartItem=new CartItem(theProduct);
    this.cartService.addToCart(theCartItem);
  }
}
