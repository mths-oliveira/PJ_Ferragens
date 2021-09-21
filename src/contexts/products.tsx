import axios from 'axios';
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import { IProduct } from '../core/product';
import { Cache } from '../utils/cache';

interface ContextProps {
  products: IProduct[];
}

interface Props {
  children: ReactNode;
}

let cache: Cache<IProduct[]>;
const ProductsContext = createContext({} as ContextProps);

export function ProductsContextProvider({ children }: Props) {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    cache = new Cache<IProduct[]>('products');
    (async () => {
      const products = await getProducts();
      setProducts([...products]);
    })();
  }, []);

  async function getProducts() {
    let products = cache.getItem();
    if (!products || products?.length === 0) {
      const response = await axios.get<IProduct[]>('/api/products');
      products = response.data;
      cache.setItem(products);
    }
    return products;
  }

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProductsContext() {
  const context = useContext(ProductsContext);
  return context;
}
