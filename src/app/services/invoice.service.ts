import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Invoice, CreateInvoice } from '../models/invoice.model';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  constructor(
    private http: HttpClient
  ) { }

  getAllInvoices() {
    return this.http.get<Invoice[]>(`${environment.url_api}/invoices`)
  }

  getInvoice(id: string) {
    return this.http.get<Invoice>(`${environment.url_api}/invoices/${id}`);
  }

  createInvoice(invoice: CreateInvoice) {
    return this.http.post(`${environment.url_api}/invoices`, invoice);
  }

  updateInvoice(id: string, changes: Partial<Invoice>) {
    return this.http.put(`${environment.url_api}/invoices/${id}`, changes);
  }

  deleteInvoice(id: string) {
    return this.http.delete(`${environment.url_api}/invoices/${id}`);
  }

}
