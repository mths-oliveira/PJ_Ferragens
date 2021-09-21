import { Center, CenterProps } from '@chakra-ui/react';

interface Props extends CenterProps {
  type?: 'submit';
  isDisabled?: boolean;
}

export function Button({
  children,
  onClick,
  type,
  isDisabled,
  ...rest
}: Props) {
  return (
    <Center
      type={type}
      as="button"
      bg="primary"
      color="white"
      padding="0.5rem 1rem"
      fontWeight="bold"
      borderRadius="md"
      disabled={isDisabled}
      _disabled={{
        opacity: '0.5',
        cursor: 'not-allowed',
      }}
      _hover={{
        filter: 'brightness(112.5%)',
      }}
      {...rest}
      onClick={(event) => {
        if (isDisabled || !onClick) return;
        onClick(event);
      }}
    >
      {children}
    </Center>
  );
}
