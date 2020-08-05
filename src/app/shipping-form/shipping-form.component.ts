import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Order } from '../models/order';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit ,OnDestroy{

  @Input('cart') cart: ShoppingCart;
  shipping = <any>{};
  userId : string;
  userSubscription: Subscription;

  constructor(
    private orderService : OrderService,
    private authService : AuthService,
    private router :Router
    ){}

  ngOnInit(){
    this.userSubscription = this.authService.user$.subscribe(user => this.userId =user.uid);
  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  
  }
  
  async placeOrder() {
    let order =new Order(this.userId,this.shipping,this.cart);
    console.log(order);
    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success',result.key]);
  
}
}
