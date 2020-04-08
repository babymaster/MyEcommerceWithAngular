import { AppShoppingCart } from './../models/shoppingcart';
import { AppProducts } from './../models/app-products';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  subscription: Subscription;
  subscription1: Subscription;
  subscription2: Subscription;
  products: AppProducts[] = [];
  category: string;
  cart: AppShoppingCart;
  filteredProducts: AppProducts[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  }

}
