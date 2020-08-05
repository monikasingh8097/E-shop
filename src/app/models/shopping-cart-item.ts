import { Product } from './product';

export class ShoppingCartItem 
{
  title: string;
  imageUrl: string;
  price: number;

    constructor(public product:Product ,public quantity:number){ 

console.log(product);
    }

    get totalPrice()
    {
        return this.product.price*this.quantity;
    }
}

