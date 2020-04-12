import { AppProducts } from './models/app-products';
import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  PRODUCTS: AppProducts[] = [];

  private dbPath = '/products';

  productsRef: AngularFireList<AppProducts> = null;

  constructor(private db: AngularFireDatabase) {
    this.productsRef = db.list(this.dbPath);
  }

  create(product) {
    return this.db.list(this.dbPath).push(product);
  }

  getAll() {
    return this.productsRef;
  }

  get(productID) {
    return this.db.object(this.dbPath + `/${productID}`);
  }

  update(productID, product) {
    return this.db.object(this.dbPath + `/${productID}`).update(product);
  }

  delete(productID) {
    return this.db.object(this.dbPath + `/${productID}`).remove();
  }
}
