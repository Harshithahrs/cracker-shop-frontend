import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Product } from '../../model/Prdouct';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrl: './single-category.component.css'
})
export class SingleCategoryComponent {
  categoryId!: string;
  products$!: Observable<Product[]>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      console.log(params);
      const categoryId = params.get("id");
      console.log(categoryId);
      if (categoryId !== null) {
        this.categoryId = categoryId; // Assign categoryId only if it's not null
        this.products$ = this.productService.getProductsByCategory(this.categoryId);
      } else {
        console.log('Invalid categoryId');
      }
      this.products$ = this.productService.getProductsByCategory(this.categoryId);
    });
  }
}
