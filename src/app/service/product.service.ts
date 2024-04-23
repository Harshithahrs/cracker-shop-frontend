import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, DocumentSnapshot } from '@angular/fire/compat/firestore';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Product } from '../model/Prdouct';
import { Observable, forkJoin, from, of } from 'rxjs';
import { CartItem } from '../model/CartItem';

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
    return this.firestore.collection<Product>('products', ref => ref.where('category.categoryId', '==', categoryId)).snapshotChanges().pipe(
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
    console.log(productId);
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
  updateProductStock(cartItems: CartItem[]): Observable<void> {
    const batch = this.firestore.firestore.batch();
    const updateOperations: Observable<any>[] = [];

    cartItems.forEach(cartItem => {
      const productId = cartItem.productId;
      const quantityToReduce = cartItem.quantity;

      const productDocRef = this.firestore.collection('products').doc(productId).ref;

      // Fetch product data and calculate updated stock
      const updateOperation = this.getProductById(productId).pipe(
        switchMap(product => {
          if (!product) {
            throw new Error(`Product with ID ${productId} not found.`);
          }

          const updatedStock = Math.max(0, product.productStock - quantityToReduce);

          // Update stock in the Firestore batch
          batch.update(productDocRef, { productStock: updatedStock });
          return of(null); // Return a completed observable
        })
      );
      updateOperations.push(updateOperation);
    });

    // Execute all update operations and commit the batch
    return forkJoin(updateOperations).pipe(
      switchMap(() => {
        // Commit the batch update
        return from(batch.commit());
      }),
      catchError(error => {
        console.error(`Error updating product stock:`, error);
        throw error; // Rethrow the error to be handled by the caller
      })
    );
  }
}