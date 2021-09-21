import { Box, Text, Stack, StackProps } from '@chakra-ui/react';

interface Props extends StackProps {
  title: string;
}

export function Wrapper({ children, title, ...rest }: Props) {
  const isText = typeof children === 'string';
  return (
    <Stack fontWeight="bold" {...rest}>
      <Text display="block" fontSize="md">
        {title}
      </Text>
      <Box
        boxShadow="md"
        borderRadius="md"
        _focusWithin={{
          boxShadow: '0 0 0 2px rgba(0, 0, 255, 0.5)',
        }}
      >
        <Box
          as={isText ? 'p' : 'div'}
          padding={isText ? '0.75rem 1rem' : '0'}
          whiteSpace="nowrap"
          fontWeight="bold"
        >
          {children}
        </Box>
      </Box>
    </Stack>
  );
}
