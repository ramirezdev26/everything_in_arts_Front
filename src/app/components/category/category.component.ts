import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit{

  products: Product[] = [];
  category = '';

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService
  ){}

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.category = params.get('category')!;
          if (this.category) {
            return this.productsService.getByCategory(this.category);
          }
          return [];
        })
      )
      .subscribe((data) => {
        this.products = data;
      });
  }



}
