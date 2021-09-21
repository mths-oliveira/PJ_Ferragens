import { Box } from '@chakra-ui/react';

interface Props {
  margin?: string;
}

export function Divider({ margin }: Props) {
  return (
    <Box
      height="3px"
      width="100%"
      bg="gray.100"
      margin={margin || '0.75rem 0'}
    />
  );
}
