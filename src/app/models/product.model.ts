export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string [];
}

export interface CreateInvoice extends Omit <Product, 'id'> {
}

