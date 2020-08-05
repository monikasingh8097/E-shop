import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCartService } from '../shopping-cart.service';


@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})

export class BsNavbarComponent implements OnInit{
  appUser: AppUser;
  shoppingCartItemCount: number;
cart$;

  constructor(
    private auth : AuthService,
    private shoppingCart : ShoppingCartService
    ) {}
  

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.cart$ = await this.shoppingCart.getCart();}
 
    /*
    const cart$ = await this.shoppingCart.getCart();
    cart$.snapshotChanges().subscribe(cart => {
      this.shoppingCartItemCount = 0;
      const items = cart.payload.val().items;
      console.log(items);
      for (const productId in items) {
        this.shoppingCartItemCount += items[productId].quantity
      }
    })
  }
*/



logout1(){
this.auth.logout();
}

}
