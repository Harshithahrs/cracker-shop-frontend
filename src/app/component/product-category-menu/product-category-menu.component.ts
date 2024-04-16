import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../service/category.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {
 
  categoryArrays:any[] = [];
  
  constructor(private categoryService:CategoriesService) { }

  ngOnInit() {
    // this.listProductCategories();
    this.getAllCategory();
    
  }
 
   getAllCategory(){
    this.categoryService.loadDatas().subscribe(
      data=>{
        console.log("product categorie="+JSON.stringify(data))
        this.categoryArrays=data;
      }
    )
   }

}
