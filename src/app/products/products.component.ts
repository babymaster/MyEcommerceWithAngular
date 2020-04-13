import { ShoppingCartService } from './../shopping-cart.service';
import { ProductService } from './../product.service';
import { AppShoppingCart } from './../models/shoppingcart';
import { AppProducts } from './../models/app-products';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take, map } from 'rxjs/operators';

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

  constructor(private route: ActivatedRoute, private productService: ProductService, private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    this.subscription = this.getProductsList();
    this.subscription2 = (await this.shoppingCartService.getCart()).snapshotChanges().pipe(map(action => {
      const $key = action.payload.key;
      const data = { $key, ...action.payload.val() };
      return data;
    })).subscribe(cart => this.cart = cart);
  }

  getProductsList() {
    return this.productService.getAll().snapshotChanges().pipe(
      take(1),
      map(changes => changes.map(
        c => ({
          key: c.payload.key, ...c.payload.val()
        })
      )
      )
    ).subscribe(products => {
      this.products = products;
      this.subscription1 = this.route.queryParamMap.subscribe(params => {
        this.category = params.get('category');
        console.log(this.category);
        this.filter();
      });
    });
  }

  filter() {
    this.filteredProducts = (this.category) ? this.products.filter(p => p.category === this.category) : this.products;
    console.log('filter ', this.filteredProducts);
  }
}
