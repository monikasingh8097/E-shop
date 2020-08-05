import { BrowserModule } from '@angular/platform-browser';

import { AngularFireModule } from '@angular/fire';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularFireDatabaseModule} from '@angular/fire/database'; 
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import {Routes,RouterModule} from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './auth.service';
import {AuthGuardService} from './auth-guard.service';
import { UserService } from './user.service';
import { AdminAuthGuardService } from './admin-auth-guard.service';
import {CategoryService} from './category.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ngx-custom-validators';
import { ProductService } from './product.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';

import { MatPaginatorModule} from '@angular/material/paginator';
import { MatSortModule} from '@angular/material/sort';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule} from '@angular/material/input';
import { NgModule } from '@angular/core';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCartComponent } from './product-cart/product-cart.component';
import { ShoppingCartService } from './shopping-cart.service';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { OrderService } from './order.service';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';




const appRoutes : Routes= [
{path:'',component:ProductsComponent},
{path:'products',component:ProductsComponent},
{path:'check-out',component:CheckOutComponent, canActivate :[AuthGuardService]},
{path:'shopping-cart',component:ShoppingCartComponent},
{path:'login',component:LoginComponent},

{path:'order-sucess/:id',component:OrderSuccessComponent , canActivate :[AuthGuardService]},
{path:'my/orders',component:MyOrdersComponent,canActivate :[AuthGuardService]},


{path:'admin/orders',component:AdminOrdersComponent,canActivate :[AuthGuardService,AdminAuthGuardService]},
{path:'admin/products/new',component:ProductFormComponent,canActivate :[AuthGuardService,AdminAuthGuardService]},
{path:'admin/products/:id',component:ProductFormComponent,canActivate :[AuthGuardService,AdminAuthGuardService]},
{path:'admin/products',component:AdminProductsComponent,canActivate :[AuthGuardService,AdminAuthGuardService]},
];

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCartComponent,
    ProductQuantityComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot(appRoutes),
    NgbModule,
    FormsModule,
    CustomFormsModule,
    BrowserAnimationsModule,
    MatTableModule,
   
    MatSortModule, 
    MatPaginatorModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule



    
  ],
  providers: [AuthService,
    AuthGuardService,
    UserService,
    AdminAuthGuardService,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
