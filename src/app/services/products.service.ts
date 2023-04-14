import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Product, CreateInvoice } from '../models/product.model';
import { Category } from '../models/category.model';
import { environment } from 'src/environment';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts() {
    return this.http.get<Product[]>(`${environment.url_api}/items`)
  }

  getAllCategories() {
    return this.http.get<Category[]>(`${environment.url_api}/items/categories`)
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${environment.url_api}/items/${id}`);
  }

  getByCategory(category: string) {
    return this.http.get<Product[]>(`${environment.url_api}/items/category/${category}`);
  }

  createProduct(product: CreateInvoice) {
    return this.http.post(`${environment.url_api}/items`, product);
  }

  updateProduct(id: string, changes: Partial<Product>) {
    return this.http.put(`${environment.url_api}/items/${id}`, changes);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${environment.url_api}/items/${id}`);
  }

  reduceStock(ids: string[]) {
    const requests = ids.map(id => this.http.patch(`${environment.url_api}/items/stock/${id}`, {}));
    return forkJoin(requests);
  }

}
