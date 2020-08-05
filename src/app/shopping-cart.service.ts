import { Injectable } from '@angular/core';
import { AngularFireDatabase} from '@angular/fire/database';
import { Product } from './models/product';
import {take, map} from 'rxjs/operators';
import { ShoppingCart } from './models/shopping-cart';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
 
  constructor(private db :AngularFireDatabase) { }


async getCart(): Promise<Observable<ShoppingCart>> {
  let cartId = await this.getOrCreateCartId();
  return this.db.object('/shopping-carts/' + cartId)
    .snapshotChanges()
    .pipe(
      map((x: any) => {
        const items = x.payload.val().items;
        return new ShoppingCart(items);
      })
    )
}
 
public async addToCart(product: Product) {
  this.updateItemQuantity(product,1);
}

async removeFromCart(product : Product){
this.updateItemQuantity(product,-1);
}



async clearCart(){

let cartId= await this.getOrCreateCartId();
this.db.object('/shopping-carts/'+cartId + '/items').remove();
}


private create(){
  return this.db.list('/shopping-carts').push({
    dateCreated:new Date().getTime()
  });
}


private async getOrCreateCartId():Promise<string> {         //to create a cartid or acceess the cartid 
    let cartId=localStorage.getItem('cartId');
    if(cartId) return cartId;
    let result = await this.create();      //here we call create method to create a cartid and store it in local storage
    localStorage.setItem('cartId',result.key)
    return result.key;
      }


  private getItem(cartId: string, productId: string)
  {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }
 


private async updateItemQuantity(product : Product,change : number){
  const cartId = await this.getOrCreateCartId();
  let item$ = this.getItem(cartId, product.key);
   item$.snapshotChanges()
    .pipe(take(1))
    .subscribe(i => {
     let quantity= ((i.payload.hasChild('quantity')) ? i.payload.val()['quantity'] + change : 1)
     if(quantity === 0) item$.remove();
     else
       item$.update({
        product: product,
        quantity: quantity
      });
    });


}





}