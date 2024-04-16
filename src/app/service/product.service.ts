import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentSnapshot } from '@angular/fire/compat/firestore';
import { catchError, map } from 'rxjs/operators';
import { Product } from '../model/Prdouct';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private firestore: AngularFirestore) { }

  getAllProducts(): Observable<Product[]> {
    return this.firestore.collection<Product>('products').snapshotChanges().pipe(
      map((actions: DocumentChangeAction<Product>[]) => {
        return actions.map((action: DocumentChangeAction<Product>) => {
          const id = action.payload.doc.id;
          const data = action.payload.doc.data();
          return {  ...data ,id} as Product; // Use object spread to merge id and data
        });
      })
    );
  }
  getProductsByCategory(categoryId: string): Observable<Product[]> {
    return this.firestore.collection<Product>('products', ref => ref.where('categoryId', '==', categoryId)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(action => {
          const data = action.payload.doc.data() as Product;
          const id = action.payload.doc.id;
          return {  ...data,id };
        });
      })
    );
  }
  getProductById(productId: string): Observable<Product | undefined> {
    return this.firestore.collection('products').doc<Product>(productId).get().pipe(
      map(snapshot => {
        const data = snapshot.data() as Product;
        console.log(data);
        if (snapshot.exists && data) {
          const product: Product = {
            id: snapshot.id,
            category: {
              categoryId: data.category.categoryId, // Access nested 'categoryId'
              category: data.category.category // Access nested 'categoryName'
              // Add other properties if available within 'category'
            },
            content: data.content,
            //  createdAt: data.createdAt.toDate(), // Convert Firestore Timestamp to Date
            excerpt: data.excerpt,
            isFeatured: data.isFeatured,
            likes: data.likes,
            permalink: data.permalink,
            postImgPath: data.postImgPath,
            productPrice: data.productPrice,
            productStock: data.productStock,
            savedBy: data.savedBy,
            shares: data.shares,
            status: data.status,
            stock: {
              inStock: data.stock.inStock,
              outOfStock: data.stock.outOfStock
            },
            title: data.title,
            views: data.views
          };
          return product;
        } else {
          return undefined;
        }
      }),
      catchError(error => {
        console.error(`Error fetching product with ID ${productId}:`, error);
        return of(undefined);
      })
    );
  }
}