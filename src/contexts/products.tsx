import axios from 'axios';
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import { IProduct } from '../core/product';

interface ContextProps {
  products: IProduct[];
}

interface Props {
  children: ReactNode;
}

const ProductsContext = createContext({} as ContextProps);

export function ProductsContextProvider({ children }: Props) {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    getProducts().then((products) => {
      setProducts(products);
    });
  }, []);

  async function getProducts() {
    const response = await axios.get<IProduct[]>('/api/products');
    let products = response.data;
    if (!Array.isArray(products) || isEmpty(products)) {
      products = await getProducts();
    }
    return products;
  }

  function isEmpty(list: any[]) {
    return list.length === 0;
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
