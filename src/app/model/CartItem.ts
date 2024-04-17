import { Product } from "./Prdouct";

export class CartItem {
"id":string;
"name":string;
"imageUrl":string;
"unitPrice":number;
"quantity":number;
constructor(product:Product){
    this.id=product.id;
    this.name=product.title;
    this.imageUrl=product.postImgPath;
    this.unitPrice=product.productPrice;
    this.quantity=1;
}
}
