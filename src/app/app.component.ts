import { Component } from '@angular/core';
import { CartService } from './service/cartServiceFirebase.service';
import { CartDataService } from './service/cartdata.service';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from './service/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.componentupdated.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {
  title = 'cracker-frontend-app1';
  category:String[]=[];
  constructor(private toastr:ToastrService,private categorys:CategoriesService, private cartService:CartService,private router:Router){
    
  }
  sidebarActive:boolean=false;
  toggleSidebar() {
    this.toastr.success('yest')
    console.log(this.toastr.success("hi"))
    this.sidebarActive = !this.sidebarActive;
    this.isSidebarOpen = !this.isSidebarOpen;

  }
  categoryArrays:any[] = [];
  isSidebarOpen = false;
  ngOnInit() {
   this.cartService.cartItemsCollection;
   this.getAllCategory();

  }
    // this.listProductCategories();
    
 
   getAllCategory(){
    this.categorys.loadDatas().subscribe(
      data=>{
        console.log("product categorie="+JSON.stringify(data))
        this.categoryArrays=data;
      }
    )
   }
   selectedCategoryId!: string;  // Property to store selected category ID

   onCategorySelected(event:Event) {
    const selectedCategoryId = (event.target as HTMLSelectElement).value;
    const selectedCategory = this.categoryArrays.find(cat => cat.id === selectedCategoryId);
    if (selectedCategory) {
      const categoryName = selectedCategory.data.category;
      console.log(`Selected category ID: ${selectedCategoryId}, Name: ${categoryName}`);
      
      // Perform navigation or other actions with the selected category
      this.router.navigate(['/category', categoryName, selectedCategoryId]);
    }
  }
}
