import { useDisclosure } from '@chakra-ui/react';
import { createContext, useContext, ReactNode } from 'react';

interface ContextProps {
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

  return (
    <InputModalContext.Provider value={{ isOpen, onOpen, onClose }}>
      {children}
    </InputModalContext.Provider>
  );
}

export function useInputModalContext() {
  const context = useContext(InputModalContext);
  return context;
}
