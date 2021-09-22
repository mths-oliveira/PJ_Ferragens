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
    axios.get<IProduct[]>('/api/products').then((response) => {
      setProducts(response.data);
    });
  }, []);

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
