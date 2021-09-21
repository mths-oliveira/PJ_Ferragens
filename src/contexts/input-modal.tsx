import { useDisclosure } from '@chakra-ui/react';
import { createContext, useContext, ReactNode } from 'react';
import { IProduct } from '../core/product';
import { useProductsContext } from './products';

interface ContextProps {
  content: IProduct[];
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

interface Props {
  children: ReactNode;
}

const InputModalContext = createContext({} as ContextProps);

export function InputModalContextProvider({ children }: Props) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { products } = useProductsContext();

  return (
    <InputModalContext.Provider
      value={{ isOpen, onOpen, onClose, content: products }}
    >
      {children}
    </InputModalContext.Provider>
  );
}

export function useInputModalContext() {
  const context = useContext(InputModalContext);
  return context;
}
