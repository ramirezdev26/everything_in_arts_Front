import { Product } from "./product.model";

export interface Invoice {
  id: string;
  name: string;
  email: string;
  address: string;
  total: number;
  itemList: Product[];
}

export interface CreateInvoice extends Omit <Invoice, 'id'> {

}
