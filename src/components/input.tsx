import { ChangeEventHandler } from 'react';
import { Center, Icon, Input as ChakraInput, Text } from '@chakra-ui/react';
import { MdSearch } from 'react-icons/md';

interface Props {
  onChange: ChangeEventHandler<HTMLInputElement>;
  prefix?: string;
  value?: string;
}

export function Input({ onChange, prefix, value }: Props) {
  return (
    <Center
      bg="white"
      borderRadius="md"
      cursor="pointer"
      overflow="hidden"
      padding="0.75rem 1.5rem"
    >
      {prefix && (
        <Text as="span" fontSize="md" fontWeight="500" color="gray.500">
          {prefix}
        </Text>
      )}
      <ChakraInput
        width={['100%', '100%', '22.5rem']}
        border="none"
        marginRight="1rem"
        marginLeft="0.5rem"
        padding="0"
        _focus={{}}
        value={value}
        onChange={onChange}
      />
      <Icon as={MdSearch} fontSize="1.5rem" transform="translateY(0)" />
    </Center>
  );
}
