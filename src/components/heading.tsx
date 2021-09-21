import { Heading as ChakraHeading, HeadingProps } from '@chakra-ui/react';

interface Props extends HeadingProps {
  children: string;
}

export function Heading({ children, ...rest }: Props) {
  return (
    <ChakraHeading
      className="paddingX"
      fontSize={['lg', 'lg', 'xl']}
      color="gray.700"
      {...rest}
    >
      {children}
    </ChakraHeading>
  );
}
