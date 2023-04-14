import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { MyValidators } from 'src/app/utils/validators';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.scss']
})
export class ProductsEditComponent implements OnInit{

  form: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required]],
    category: ['', [Validators.required]],
    price: ['', [Validators.required, MyValidators.isPriceValid]],
    stock: ['', [Validators.required, MyValidators.isPriceValid]],
    description: ['', [Validators.required]],
    images: []
  });;
  id = '';

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.productsService.getProduct(this.id)
      .subscribe(product => {
        this.form.patchValue({
          ...product,
        });
      });
    });
  }

  saveProduct(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const product = this.form.value;
      console.log(this.id);
       this.productsService.updateProduct(this.id, product)
       .subscribe((newProduct) => {
         console.log(newProduct);
         this.router.navigate(['./admin/products']);
       });
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      price: ['', [Validators.required, MyValidators.isPriceValid]],
      stock: ['', [Validators.required, MyValidators.isPriceValid]],
      description: ['', [Validators.required]],
      images: ['']
    });
  }

  get priceField() {
    return this.form.get('price');
  }

}
