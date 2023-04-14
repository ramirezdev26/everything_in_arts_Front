import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { CartService } from 'src/app/services/cart.service';
import { CreateInvoice } from 'src/app/models/invoice.model';
import { InvoiceService } from 'src/app/services/invoice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent {

  products$: Observable<Product[]>;
  totals$: Observable<number>;
  form: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    address: ['', Validators.required]
  });;
  invoiceData: CreateInvoice = {
    name: '',
    email: '',
    address: '',
    total: 0,
    itemList: []
  }

  constructor(
    private cartService: CartService,
    private productsService: ProductsService,
    private formBuilder: FormBuilder,
    private invoiceService: InvoiceService,
    private router: Router,
  ) {
    this.products$ = this.cartService.cart$;
    this.totals$ = this.cartService.total$;
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required]
    });
  }



  save() {
    this.invoiceData.name = this.form.get('name')!.value
    this.invoiceData.email = this.form.get('email')!.value
    this.invoiceData.address = this.form.get('address')!.value
    this.products$.subscribe(products => {
      this.invoiceData.itemList = products;
    });
    this.totals$.subscribe(total => {
      this.invoiceData.total = total;
    });
    console.log(this.invoiceData);
  }

  removeCart(product: Product){
    this.cartService.removeCart(product);
  }

  sendInvoice() {
      this.invoiceService.createInvoice(this.invoiceData)
      .subscribe((newProduct) => {
        this.reduceStock();
        this.cartService.cleanCart();
        this.router.navigate(['./products']);
      });
  }

  reduceStock() {
    const ids = this.invoiceData.itemList.map(product => product.id);
    this.productsService.reduceStock(ids)
      .subscribe(() => {
        console.log('Stock reduced successfully');
      });
  }



}
