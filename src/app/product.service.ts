import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Product } from './models/product';
import { Observable } from 'rxjs';

//to get the products from firebase
@Injectable({
  providedIn: 'root'
})
export class ProductService 
{
  constructor(private db :AngularFireDatabase) { }

      create(product)
      {
        return this.db.list('/products').push(product); 
      }

      getAll() : Observable<Product[]>{
        return this.db.list('/products').snapshotChanges()
        .pipe(map( action => action
          .map(a => {
            const key = a.payload.key;
            const data  = a.payload.val();
              return  {key, ...data as Product};
          })));
      }
      
     
      get(productId) {
        return this.db.object('/products/' + productId).snapshotChanges();
      }



      update(productId,product){
        return this.db.object('/products/'+ productId).update(product);

      }

      delete(productId){
        return this.db.object('/products/'+ productId).remove();

      }
}
