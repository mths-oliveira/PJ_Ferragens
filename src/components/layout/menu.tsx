import { pages } from '../../data/pages';
import { MouseEvent } from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
} from '@chakra-ui/react';
import { Divider } from '../../components/divider';
import { useMenuContext } from '../../contexts/menu';
import { isLink } from '../../utils/isLink';
import { InternalLinkWithText } from '../internal-link-with-text';

export function Menu() {
  const { isOpen, onClose } = useMenuContext();
  function handleClick(event: MouseEvent<HTMLDivElement>) {
    if (isLink(event.target)) {
      onClose();
    }
  }
  return (
    <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerBody padding="0.75rem 0" onClick={handleClick}>
          <InternalLinkWithText href="/">Início</InternalLinkWithText>
          <Divider />
          {pages.map(({ href, title }) => (
            <InternalLinkWithText key={href} href={href}>
              {title}
            </InternalLinkWithText>
          ))}
          <Divider />
          <InternalLinkWithText href="/sobre">Sobre nós</InternalLinkWithText>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
