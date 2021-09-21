import { IProduct } from './product';

export interface IShoppingCart {
  products: IProduct[];
  subtotal: number;
  isEmpty: () => boolean;
  addProduct: (product: IProduct) => void;
  updateProduct: (updatedProduct: IProduct) => void;
  removeProductByRef: (ref: string) => void;
}
