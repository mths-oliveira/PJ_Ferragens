import { ReactNode } from 'react';
import { Stack } from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';

interface Props {
  children: ReactNode;
}

export function Card({ children }: Props) {
  const { push } = useRouter();
  return (
    <Stack
      cursor="pointer"
      width="15rem"
      padding="1.5rem"
      spacing="1.5rem"
      shadow="md"
      borderRadius="md"
      flexShrink={0}
      transition="all .1s ease"
      color="gray.500"
      _hover={{
        shadow: 'xl',
        '&> img': {
          transform: 'scale(1.125)',
        },
        '&> span': {
          color: 'primary',
          textDecoration: 'underline',
        },
      }}
    >
      {children}
    </Stack>
  );
}
