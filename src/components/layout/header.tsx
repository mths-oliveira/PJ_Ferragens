import { Center, Image } from '@chakra-ui/react';

export function Header() {
  return (
    <Center
      as="header"
      bg="primary"
      padding={[
        '1rem 0',
        '1rem 0',
        '2rem 1rem',
        '3.5rem 7.5rem',
        '3.5rem 10rem',
        '3.5rem 15rem',
      ]}
    >
      <Image src="/assets/logo.jpg" objectFit="cover" />
    </Center>
  );
}
