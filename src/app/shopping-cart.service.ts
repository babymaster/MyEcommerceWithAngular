import { AppShoppingCart } from './models/shoppingcart';
import { AngularFireList, AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { AppItems } from './models/app-items';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  itemsRef: AngularFireList<AppItems> = null;
  items: AppItems = null;
  quantity: number;
  pathItem = '/shopping-cart';

  constructor(private db: AngularFireDatabase) { }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.list(this.pathItem + `/${cartId}`).remove();
  }

  async getCart(): Promise<AngularFireObject<AppShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object(this.pathItem + `/${cartId}`);
  }

  getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) {
      return cartId;
    }

    let result = this.create();
    localStorage.setItem('cartId', result);
    return result.key;
  }

  create() {
    return this.db.list(this.pathItem).push({
      date: new Date().getTime()
    });
  }
}
