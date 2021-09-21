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

const FormModalContext = createContext({} as ContextProps);

export function FormModalContextProvider({ children }: Props) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <FormModalContext.Provider value={{ isOpen, onOpen, onClose }}>
      {children}
    </FormModalContext.Provider>
  );
}

export function useFormModalContext() {
  const context = useContext(FormModalContext);
  return context;
}
