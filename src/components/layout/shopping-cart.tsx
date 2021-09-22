import {
  Image,
  Text,
  SimpleGrid,
  Stack,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
  DrawerOverlay,
} from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import { useAuthContext } from '../../contexts/user';
import { useShoppingCartContext } from '../../contexts/shopping-cart';
import { format } from '../../utils/format';
import { Button } from '../button';
import { Divider } from '../divider';
import { NumberInput } from '../number-input';
import { Wrapper } from '../wrapper';

export function ShoppingCart() {
  const shoppingCart = useShoppingCartContext();
  const { auth } = useAuthContext();
  const router = useRouter();
  return (
    <Drawer
      placement="right"
      size="xs"
      onClose={shoppingCart.onClose}
      isOpen={shoppingCart.isOpen}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader paddingY="2.25rem">
          <Stack alignItems="center" spacing="0.75rem" fontSize="md">
            {auth.isAuthenticated && (
              <Text fontWeight="semibold">
                Subtotal: {format(shoppingCart.subtotal)}
              </Text>
            )}
            <Button
              isDisabled={shoppingCart.isEmpty()}
              onClick={() => {
                const url = auth.isAuthenticated
                  ? '/pedidos/representantes'
                  : '/pedidos/clientes';
                router.push(url);
                shoppingCart.onClose();
              }}
            >
              Fechar pedido
            </Button>
          </Stack>
        </DrawerHeader>
        <Divider margin="0" />
        <DrawerBody padding="0">
          <Stack padding="2.25rem 0.75rem" spacing="2.25rem">
            {shoppingCart.isEmpty() ? (
              <Text textAlign="center" fontSize="md" fontWeight="500">
                Carrinho vazio
              </Text>
            ) : (
              shoppingCart.products.map((product) => (
                <Stack spacing="1rem" key={product.ref}>
                  <Stack spacing="0.75rem" height="4.5rem" direction="row">
                    <Image
                      src={product.image}
                      width="3.5rem"
                      objectFit="contain"
                    />
                    <Text overflowY="auto">{product.description}</Text>
                  </Stack>
                  <SimpleGrid columns={2} spacing="0.75rem">
                    {auth.isAuthenticated && (
                      <>
                        <Wrapper title="Refêrencia">{product.ref}</Wrapper>
                        <Wrapper title="Valor">{format(product.price)}</Wrapper>
                      </>
                    )}
                    <Wrapper title="Quantidade">
                      <NumberInput
                        min={1}
                        initialValue={product.amount}
                        onChange={(value: number) => {
                          shoppingCart.updateProduct({
                            ...product,
                            amount: value,
                          });
                        }}
                      />
                    </Wrapper>
                    <Wrapper title="Ações">
                      <Button
                        onClick={() => {
                          shoppingCart.removeProductByRef(product.ref);
                        }}
                      >
                        <Text padding="0.25rem">Remover</Text>
                      </Button>
                    </Wrapper>
                  </SimpleGrid>
                </Stack>
              ))
            )}
          </Stack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
