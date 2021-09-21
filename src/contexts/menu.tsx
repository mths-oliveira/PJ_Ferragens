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

const MenuContext = createContext({} as ContextProps);

export function MenuContextProvider({ children }: Props) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <MenuContext.Provider value={{ isOpen, onOpen, onClose }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenuContext() {
  const context = useContext(MenuContext);
  return context;
}
