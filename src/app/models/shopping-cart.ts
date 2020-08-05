import { ShoppingCartItem } from './shopping-cart-item';
import { Product } from './product';

export class ShoppingCart {
 
items:ShoppingCartItem[]=[];

    constructor(public itemsMap:{ [productId:string]:ShoppingCartItem}){

     
        for(let productId in itemsMap){
            let item =itemsMap[productId];
           this.items.push(new ShoppingCartItem(item.product,item.quantity));
          
        }
    }


    getQuantity(product : Product) 
    {
        if (!this.itemsMap) return; 
      const item = this.itemsMap[product.key]
      return item ? item.quantity : 0;
    }
  

    get totalPrice() {   
                return this.items
            .map(shopItem => shopItem.totalPrice)
            .reduce((price1, price2) => price1 + price2);
           
    }

    get totalItemsCount()
     {
        let count = 0;
        for (let productId in this.itemsMap) {
            count = count + this.itemsMap[productId].quantity;
     }
        return count;
    }
}