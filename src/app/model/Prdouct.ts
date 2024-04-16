// product.interface.ts

export interface Product {
    id:string;
    category: {
      category: string;
      categoryId: string;
    };
    content: string;
    // createdAt: {
    //   toDate(): { seconds: number; nanoseconds: number; }; seconds: number; nanoseconds: number 
// }; // Firebase timestamp format
    excerpt: string;
    isFeatured: boolean;
    likes: number;
    permalink: string;
    postImgPath: string;
    productPrice: number;
    productStock: number;
    savedBy: any[]; // Assuming it's an array of any type
    shares: number;
    status: string;
    stock: {
      inStock: string;
      outOfStock: string;
    };
    title: string;
    views: number;
  }
  