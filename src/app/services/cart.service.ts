import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { Product } from './../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  private products: Product[] = [];
  private total = 0;
  private cart = new BehaviorSubject<Product[]>([]);
  private totalObs = new BehaviorSubject<number>(0);

  cart$ = this.cart.asObservable();
  total$ = this.totalObs.asObservable();

  constructor() { }

  addCart(product: Product) {
    this.products = [...this.products, product];
    this.total += product.price;
    this.totalObs.next(this.total);
    this.cart.next(this.products);
  }

  removeCart(product: Product){
    const index = this.products.findIndex(p => p.id === product.id);
    if (index >= 0) {
      this.products.splice(index, 1);
      this.total -= product.price;
      this.totalObs.next(this.total);
      this.cart.next(this.products);
    }
  }

  getTotal(){
    return this.total;
  }

  cleanCart(){
    this.products = [];
    this.total = 0;
    this.totalObs.next(this.total);
    this.cart.next(this.products);
  }

}
