import { Product } from "./Prdouct";

export class CartItem {
    "userId":string;
"productId":string;
"name":string;
"imageUrl":string;
"unitPrice":number;
"quantity":number;
"visible":boolean;
"status":Status
constructor(product:Product){
    this.productId=product.id;
    this.name=product.title;
    this.imageUrl=product.postImgPath;
    this.unitPrice=product.productPrice;
    this.quantity=1;
    this.visible=true;
}
}
export interface CartItemWithMetadata {
    cartItems: CartItem[];
    totalQuantity: number;
    totalPrice: number;
}
export enum Status{
    PENDING,RECIVED,COMPLETED
}