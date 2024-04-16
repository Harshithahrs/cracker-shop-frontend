import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '../../service/product.service';
import { Product } from '../../model/Prdouct';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  products$!: Observable<Product[]>;
  categoryId!: string;
  constructor(private productService: ProductService,private router:Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.products$ = this.productService.getAllProducts();
    console.log(this.productService.getAllProducts());
    this.route.paramMap.subscribe(params => {
      const categoryId = params.get('categoryId');
      if (categoryId !== null) {
        this.categoryId = categoryId; // Assign categoryId only if it's not null
        this.products$ = this.productService.getProductsByCategory(this.categoryId);
      } else {
        console.log('Invalid categoryId');
      }
    });
  }
  goToProductDetail(productId: string): void {
    if (productId) {
      this.router.navigate(['/products', productId]);
    } else {
      console.error('Invalid productId:', productId);
      // Handle invalid productId scenario (e.g., show error message)
    }
  }
}
