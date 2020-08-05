import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from '../shopping-cart.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent{
  [x: string]: any;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart;
  subscription: Subscription;
  
  
  constructor(route: ActivatedRoute,productService: ProductService, private cartService: ShoppingCartService)
   { 



    /*
      productService.getAll().subscribe(products => this.products = products.map(
        product => {
          {
            return {
              title: product['title'],
              category: product['category'],
              imageUrl: product['imageUrl'],
              price: product['price'],
              key: product.key
            } as Product;
          }}))

      this.categories$ = categoryService.getCategories();
      route.queryParamMap.subscribe(params => {
      this.category = params.get('category');

    //setting filtered products 
    this.filteredProducts =(this.category) ?
    this.products.filter(p => p.category === this.category):
    this.products;
    

    })



  }



}
*/

productService
      .getAll()
      .switchMap(products => {
      this.products =  products;
      return route.queryParamMap;
      })

      .subscribe(params => {
        this.category = params.get('category');
        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.category === this.category) :
          this.products;
      });
   }
/*
  async ngOnInit() {
    this.subscription = (await this.cartService.getCart()).snapshotChanges()
      .subscribe(cart => this.cart = cart.payload.val());
  }
 */
  async ngOnInit() {
    this.subscription = (await this.cartService.getCart())
    .subscribe(cart => this.cart = cart)
}
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
 
   }
  

   