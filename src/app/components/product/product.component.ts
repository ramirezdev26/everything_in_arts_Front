import { Component, Input } from '@angular/core';

import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  @Input() product: Product = {
    id: '',
    name: '',
    price: 0,
    description: '',
    images: []
  };

  today = new Date();

  constructor(
    private cartService: CartService
  ){}

  addCart() {
    this.cartService.addCart(this.product);
  }

}
