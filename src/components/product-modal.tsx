import {
  Image,
  Text,
  SimpleGrid,
  Modal,
  ModalBody,
  ModalFooter,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import { FormEvent, useEffect, useState } from 'react';
import { useAuthContext } from '../contexts/user';
import { useProductsContext } from '../contexts/products';
import { useShoppingCartContext } from '../contexts/shopping-cart';
import { IProduct } from '../core/product';
import { format } from '../utils/format';
import { Button } from './button';
import { NumberInput } from './number-input';
import { Wrapper } from './wrapper';

export function ProductModal() {
  const router = useRouter();
  const { auth } = useAuthContext();
  const { products } = useProductsContext();
  const shoppingCart = useShoppingCartContext();
  const productModal = useDisclosure();
  const [currentProduct, setCurrentProduct] = useState<IProduct | undefined>();

  useEffect(() => {
    const product = products.find((product) => {
      return product.ref === router.query.ref;
    });
    setCurrentProduct(product);
    product ? productModal.onOpen() : productModal.onClose();
  }, [router.query.ref]);

  function onClose() {
    router.replace(`/produtos/${router.query.page}/`, null, {
      scroll: false,
      shallow: true,
    });
  }

  function handleSubmit(event: FormEvent<HTMLDivElement>) {
    event.preventDefault();
    shoppingCart.addProduct(currentProduct);
    onClose();
    shoppingCart.onOpen();
  }

  return (
    <Modal
      isOpen={productModal.isOpen}
      onClose={onClose}
      size="sm"
      motionPreset="scale"
      scrollBehavior="outside"
      isCentered
    >
      <ModalOverlay />
      {currentProduct && (
        <ModalContent
          padding="0"
          overflow="hidden"
          as="form"
          onSubmit={handleSubmit}
        >
          <ModalBody
            bg="white"
            color="gray.500"
            padding="2.25rem"
            marginBottom="-2rem"
            borderRadius="md"
          >
            <Image
              src={currentProduct.image}
              height={['10rem', '12.5rem']}
              margin="auto"
              objectFit="contain"
              display={[auth.isAuthenticated ? 'none' : 'block', 'block']}
            />
            <Text
              fontSize="md"
              marginY="1.5rem"
              overflowY="auto"
              maxHeight="6.5rem"
            >
              {currentProduct.description}
            </Text>
            <SimpleGrid spacing="1rem" columns={2}>
              {auth.isAuthenticated && (
                <>
                  <Wrapper title="Refêrencia" spacing="auto">
                    {currentProduct.ref}
                  </Wrapper>
                  <Wrapper title="Valor" spacing="auto">
                    {format(currentProduct.price)}
                  </Wrapper>{' '}
                </>
              )}
              <Wrapper title="Quantidade">
                <NumberInput
                  min={1}
                  onChange={(value) => {
                    setCurrentProduct({
                      ...currentProduct,
                      amount: value,
                    });
                  }}
                />
              </Wrapper>
              {auth.isAuthenticated && (
                <Wrapper title="Subtotal">
                  {format(currentProduct.amount * currentProduct.price)}
                </Wrapper>
              )}
            </SimpleGrid>
          </ModalBody>
          <ModalFooter
            bg="white"
            padding="2.25rem"
            zIndex="10"
            justifyContent="flex-start"
          >
            <Button
              width="100%"
              fontSize="1.25rem"
              padding="0.75rem 1rem"
              type="submit"
            >
              Adicionar ao carrinho
            </Button>
          </ModalFooter>
        </ModalContent>
      )}
    </Modal>
  );
}
