import { Center, Text } from '@chakra-ui/react';

export function Header() {
  return (
    <Center
      className="paddingY paddingX"
      as="header"
      bg="primary"
      color="white"
      fontFamily="Merriweather"
      fontSize={['lg', 'lg', '2xl']}
      fontWeight="bold"
      textTransform="uppercase"
    >
      <Text
        as="span"
        border={['5px solid white', '5px solid white', '8px solid white']}
        padding={['1rem', '1rem', '1.5rem']}
      >
        Pj
      </Text>
      <Text as="span" marginLeft={['1rem', '1rem', '1.5rem']}>
        ferragens
      </Text>
    </Center>
  );
}
