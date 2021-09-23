import { useDisclosure } from '@chakra-ui/react';
import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import { IProduct } from '../core/product';
import { IShoppingCart } from '../core/shopping-cart';

interface ContextProps extends IShoppingCart {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

interface Props {
  children: ReactNode;
}

const ShoppingCartContext = createContext({} as ContextProps);

export function ShoppingCartContextProvider({ children }: Props) {
  const url = 'shopping_cart';
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [products, setProducts] = useState<IProduct[]>([]);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const isProducts = localStorage.getItem(url);
    if (isProducts) {
      const products: IProduct[] = JSON.parse(isProducts);
      setProducts(products);
    }
  }, []);

  useEffect(() => {
    let subtotal = 0;
    for (const product of products) {
      subtotal += product.amount * product.price;
    }
    setSubtotal(subtotal);
  }, [products]);

  useEffect(() => {
    if (isEmpty()) return;
    localStorage.setItem(url, JSON.stringify(products));
  }, [products]);

  function isEmpty() {
    return products.length === 0;
  }

  function removeProductByRef(ref: string) {
    const filteredProducts = products.filter((product) => {
      return product.ref !== ref;
    });
    setProducts(filteredProducts);
  }

  function addProduct(product: IProduct) {
    const productExists = products.find(({ ref }) => {
      return product.ref === ref;
    });
    if (productExists) {
      productExists.amount += product.amount;
      updateProduct(productExists);
      return;
    }
    if (product.amount < 1) product.amount = 1;
    setProducts([...products, product]);
  }

  function updateProduct(updatedProduct: IProduct) {
    const updatedProducts = products.map((product) => {
      if (product.ref === updatedProduct.ref) {
        product = updatedProduct;
      }
      return product;
    });
    setProducts(updatedProducts);
  }

  function clear() {
    setProducts([]);
    localStorage.removeItem(url);
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        clear,
        isOpen,
        onOpen,
        onClose,
        isEmpty,
        addProduct,
        updateProduct,
        products,
        subtotal,
        removeProductByRef,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}

export function useShoppingCartContext() {
  const context = useContext(ShoppingCartContext);
  return context;
}
