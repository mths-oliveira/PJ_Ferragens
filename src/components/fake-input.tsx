import { Center, Icon, Input, CenterProps } from '@chakra-ui/react';
import { MdSearch } from 'react-icons/md';

interface Props extends CenterProps {}

export function FakeInput({ ...rest }: Props) {
  return (
    <Center
      bg="gray.100"
      margin="0.5rem"
      borderRadius="md"
      cursor="pointer"
      overflow="hidden"
      padding="0.5rem 1rem"
      title="Pesquisar um produto pela referência."
      {...rest}
    >
      <Input
        width={['100%', '100%', '22.5rem']}
        border="none"
        marginRight="1rem"
        padding="0"
        pointerEvents="none"
        _focus={{}}
      />
      <Icon as={MdSearch} fontSize="1.5rem" transform="translateY(0)" />
    </Center>
  );
}
