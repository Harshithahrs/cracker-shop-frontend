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
  }

  goToProductDetail(productId: string): void {
    if (productId) {
      this.router.navigate(['/products/', productId]);
    } else {
      console.error('Invalid productId:', productId);
      // Handle invalid productId scenario (e.g., show error message)
    }
  }
}