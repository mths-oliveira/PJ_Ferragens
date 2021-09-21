import { MouseEvent } from 'react';
import { Text } from '@chakra-ui/layout';
import { InternalLink } from './internal-link';

interface Props {
  children: string | string[];
  href: string;
  isDisabled?: boolean;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}

export function InternalLinkWithText({
  children,
  href,
  isDisabled,
  onClick,
}: Props) {
  function handleClick(event: MouseEvent<HTMLParagraphElement>) {
    event.preventDefault();
    event.target = event.currentTarget.parentElement;
  }
  return (
    <InternalLink href={href} isDisabled={isDisabled} onClick={onClick}>
      <Text
        fontSize="md"
        padding="0.75rem 1.5rem"
        whiteSpace="nowrap"
        textOverflow="ellipsis"
        overflow="hidden"
        _hover={{
          bg: 'gray.100',
        }}
        textDecoration={isDisabled && 'line-through'}
        opacity={isDisabled && 0.75}
        onClick={handleClick}
      >
        {children}
      </Text>
    </InternalLink>
  );
}
