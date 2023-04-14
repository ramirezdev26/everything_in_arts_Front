import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

import { Category } from 'src/app/models/category.model';

import { MyValidators } from 'src/app/utils/validators';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products-create',
  templateUrl: './products-create.component.html',
  styleUrls: ['./products-create.component.scss']
})
export class ProductsCreateComponent implements OnInit {

  form: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    price: ['', [Validators.required]],
    images: [[''], Validators.required],
    category: this.formBuilder.array([]),
    description: ['', [Validators.required, Validators.minLength(10)]],
    stock: [100, [Validators.required]]});

  categories: Category[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
  ) {
    this.buildForm();
  }

  ngOnInit() {
    this.getCategories();
  }

  saveProduct(event: Event) {
    event.preventDefault();
     if (this.form.valid) {
       const product = this.form.value;
       const images = this.form.value.images.map((image: { image: string }) => image.image);
       product.images = images;
       this.productsService.createProduct(product)
       .subscribe((newProduct) => {
         console.log(newProduct);
         this.router.navigate(['./admin/products']);
       });
     }
  }



  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      price: ['', [Validators.required, MyValidators.isPriceValid]],
      images: this.formBuilder.array([]),
      category: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      stock: [100, [Validators.required]],
    });
  }

  addimageField() {
    this.imageField.push(this.createimageField());
  }

  private createimageField() {
    return this.formBuilder.group({
      image: ['', Validators.required]
    });
  }

  get imageField() {
    return this.form.get('images') as FormArray;
  }

  get priceField() {
    return this.form.get('price');
  }

  get nameField() {
    return this.form.get('name');
  }

  private getCategories() {
    this.productsService.getAllCategories()
    .subscribe((data) => {
      this.categories = data;
    });
  }


}
