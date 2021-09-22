import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import {
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Modal,
  Text,
  useToast,
} from '@chakra-ui/react';
import { Input } from '../input';
import { InternalLinkWithText } from '../internal-link-with-text';
import { useInputModalContext } from '../../contexts/input-modal';
import { isLink } from '../../utils/isLink';
import { IProduct } from '../../core/product';
import { useProductsContext } from '../../contexts/products';

export function InputModal() {
  const inputModal = useInputModalContext();
  const { products } = useProductsContext();
  const [value, setValue] = useState('');
  const [list, setList] = useState<IProduct[]>([]);
  const toast = useToast();

  function createToast(status: 'error' | 'success', description: string) {
    const title = status === 'error' ? 'Error' : 'Sucesso';
    toast({
      title,
      status,
      description,
      position: 'top-right',
      duration: 7_500,
      isClosable: true,
    });
  }

  function handleClick(event: MouseEvent<HTMLDivElement>) {
    if (isLink(event.target)) {
      onClose();
    }
  }

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setValue(value);
  }

  useEffect(() => {
    const list = products.filter(({ ref }) => {
      return ref.includes(value);
    });
    const MAX_LENGTH = 20;
    list.length = MAX_LENGTH;
    setList(list);
  }, [value, products]);

  function onClose() {
    setValue('');
    inputModal.onClose();
  }

  return (
    <Modal
      isOpen={inputModal.isOpen}
      onClose={onClose}
      scrollBehavior="inside"
      motionPreset="scale"
    >
      <ModalOverlay />
      <ModalContent padding="0" bg="transparent">
        <ModalHeader padding="0.5rem">
          <Input prefix="REF.:" onChange={handleChange} />
        </ModalHeader>
        <ModalBody
          bg="white"
          padding="0.75rem 0"
          margin=".5rem"
          borderRadius="md"
          onClick={handleClick}
        >
          {list.length === 0 ? (
            <Text
              padding="0.75rem 1.5rem"
              fontSize="md"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              Nenhum resultado para "{value}"
            </Text>
          ) : (
            list.map(({ ref, name, disabled }) => (
              <InternalLinkWithText
                key={ref}
                href={`/produtos/ferragens_em_geral?ref=${ref}`}
                isDisabled={disabled}
                onClick={() => {
                  if (disabled) {
                    createToast(
                      'error',
                      'Produto sem estoque ou descontinuado'
                    );
                  }
                }}
              >
                {ref} - {name}
              </InternalLinkWithText>
            ))
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
