import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
 
import { Product } from './../../models/product';
import { Subscription } from 'rxjs';
import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})

export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  filteredProducts: Product[];
  subscription: Subscription;
 
  dataSource: MatTableDataSource<Product>;
  displayedColumns: string[] = ['title', 'price', 'edit'];
  pageSizeOptions: number[] = [3, 5, 10, 25, 100];
  length: number;
  pageSize: number = 10;
 
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
 
  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll().subscribe((products) => {
      this.filteredProducts = this.products = products.map((product) => 
      {
        return {
          title: product['title'],
          category: product['category'],
          imageUrl: product['imageUrl'],
          price: product['price'],
          key: product.key
        } as Product;
      });
 
      this.dataSource = new MatTableDataSource(this.products);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.length = this.products.length;
    });
  }
 
  filter(query: string) {
    this.dataSource.filter = query.trim().toLowerCase();
  }
 
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
 
  ngOnInit(): void {}
}




