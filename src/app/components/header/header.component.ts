import { Component } from '@angular/core';

import { map } from 'rxjs/operators';
import { CartService } from '../../services/cart.service';
import { Category } from 'src/app/models/category.model';
import { ProductsService } from 'src/app/services/products.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  total$: Observable<number>;
  categories: Category[] = [];


  constructor(
    private cartService: CartService,
    private productsService: ProductsService
  ){
    this.total$ = this.cartService.cart$
      .pipe(
        map(products => products.length)
      );
      this.getCategories();
  }

  getCategories(){
    this.productsService.getAllCategories()
      .subscribe(data => {
        this.categories = data;
      })
  }


}
