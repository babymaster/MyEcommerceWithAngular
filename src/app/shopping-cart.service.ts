import { AppProducts } from './models/app-products';
import { AppShoppingCart } from './models/shoppingcart';
import { AngularFireList, AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { AppItems } from './models/app-items';
import { take, map } from 'rxjs/operators';

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

  async getCartFor() {
    let cartID = this.getOrCreateCartId();
    return this.itemsRef = this.db.list(this.pathItem + `${cartID}`);
  }

  async getAllItem() {
    let cartID = await this.getOrCreateCartId();
    return this.db.list(this.pathItem + `/${cartID}/items/`);
  }

  getItem(cartID: string, productID: string): AngularFireObject<AppItems> {
    return this.db.object(this.pathItem + `/${cartID}/items/${productID}`);
  }

  getItemForUpdate(cartID: string, productID: string) {
    return this.db.object(this.pathItem + `/${cartID}/items/${productID}`);
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

  updateCartItem(product: AppProducts, change: number) {
    let cartID = this.getOrCreateCartId();
    let items$ = this.getItem(cartID, product.key);

    items$.snapshotChanges().pipe(
      take(1),
      map(action => {
        const $key = action.payload.key;
        const data = { $key, ...action.payload.val() };
        return data;
      })
    ).subscribe(items => {
      this.items = items;
      this.quantity = (this.items.quantity || 0) + change;
      if (this.quantity === 0) {
        items$.remove();
      } else {
        items$.update({
          title: product.title,
          price: product.price,
          quantity: this.quantity,
          imageUrl: product.imageUrl
        });
      }
    })
  }
}
