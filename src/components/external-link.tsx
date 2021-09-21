import { ReactNode } from 'react';
import { Link } from '@chakra-ui/react';

interface Props {
  href: string;
  children: ReactNode;
}

export function ExternalLink({ href, children }: Props) {
  return (
    <Link
      href={href}
      target="_blank"
      display="inline-flex"
      width="fit-content"
      fontSize="md"
      _hover={{
        color: 'primary',
        textDecoration: 'underline',
      }}
    >
      {children}
    </Link>
  );
}
