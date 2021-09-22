import { MouseEvent, ReactNode } from 'react';
import { useRouter } from 'next/dist/client/router';
import { Link } from '@chakra-ui/react';

interface Props {
  href: string;
  children: ReactNode;
  scrollTop?: boolean;
  isDisabled?: boolean;
  shallow?: boolean;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}

export function InternalLink({
  href,
  children,
  isDisabled,
  onClick,
  shallow = true,
  scrollTop = true,
}: Props) {
  const { push } = useRouter();
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (isDisabled && !!onClick) {
      return onClick(event);
    }
    event.preventDefault();
    push(href, null, {
      shallow,
      scroll: scrollTop,
    });
  }
  return (
    <Link
      onClick={handleClick}
      cursor={isDisabled ? 'not-allowed' : 'pointer'}
      _hover={{
        textDecoration: 'initial',
      }}
    >
      {children}
    </Link>
  );
}
