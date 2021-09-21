import { Flex, Center, Icon, Avatar } from '@chakra-ui/react';
import { MdMenu, MdPerson, MdSearch, MdShoppingCart } from 'react-icons/md';
import { useInputModalContext } from '../../contexts/input-modal';
import { useFormModalContext } from '../../contexts/form-modal';
import { useMenuContext } from '../../contexts/menu';
import { useShoppingCartContext } from '../../contexts/shopping-cart';
import { Button } from '../button';
import { FakeInput } from '../fake-input';

export function Navbar() {
  const menu = useMenuContext();
  const inputModal = useInputModalContext();
  const formModal = useFormModalContext();
  const shoppingCart = useShoppingCartContext();
  return (
    <Flex
      as="nav"
      height="3.5rem"
      width="100%"
      justifyContent="space-between"
      position="sticky"
      top="0"
      zIndex="100"
      bg="white"
      boxShadow="lg"
      paddingX="0.25rem"
      color="gray.700"
    >
      <Flex>
        <Button onClick={menu.onOpen} bg="white" color="gray.500">
          <Icon as={MdMenu} fontSize="1.5rem" transform="translateY(0)" />
        </Button>
        <Button
          display={['flex', 'flex', 'none']}
          onClick={inputModal.onOpen}
          bg="white"
          color="gray.500"
        >
          <Icon as={MdSearch} fontSize="1.5rem" transform="translateY(0)" />
        </Button>
      </Flex>
      <FakeInput
        onClick={inputModal.onOpen}
        display={['none', 'none', 'flex']}
      />
      <Flex>
        <Button onClick={formModal.onOpen} bg="white" color="gray.500">
          <Icon as={MdPerson} fontSize="1.5rem" transform="translateY(0)" />
        </Button>
        <Button onClick={shoppingCart.onOpen} bg="white" color="gray.500">
          <Icon as={MdShoppingCart} transform="translateY(0)" />
          <Center
            as="span"
            color="white"
            fontWeight="bold"
            bg="primary"
            height="2.25rem"
            width="2.25rem"
            borderRadius="md"
            marginLeft=".5rem"
          >
            {String(shoppingCart.products.length).padStart(2, '0')}
          </Center>
        </Button>
      </Flex>
    </Flex>
  );
}
