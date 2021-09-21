import { Icon as ChakraIcon, Stack, Text } from '@chakra-ui/react';
import { FaWhatsapp } from 'react-icons/fa';
import { FiAtSign, FiMapPin } from 'react-icons/fi';
import { Heading } from '../heading';
import { ExternalLink } from '../external-link';
import { IconType } from 'react-icons/lib';

interface Props {
  as: IconType;
}

function Icon({ as }: Props) {
  return (
    <ChakraIcon as={as} marginRight="1rem" transform="translateY(0.25rem)" />
  );
}

export function Footer() {
  return (
    <Stack
      className="paddingY"
      bg="gray.100"
      color="gray.700"
      fontWeight="500"
      spacing="2rem"
    >
      <Heading>Contato</Heading>
      <Stack className="paddingX" fontSize="md" spacing=".75rem">
        <ExternalLink href="https://api.whatsapp.com/send?phone=55313453-6384">
          <Icon as={FaWhatsapp} />
          <Text>(31) 3453-6384</Text>
        </ExternalLink>
        <ExternalLink href="mailto:pjferragens@gmail.com">
          <Icon as={FiAtSign} />
          <Text>pjferragens@gmail.com</Text>
        </ExternalLink>
        <ExternalLink href="https://www.google.com/maps/place/R.+Rosa+Zandona,+128+-+Venda+Nova,+Belo+Horizonte+-+MG,+31510-050/@-19.8165118,-43.9612814,17z/data=!4m13!1m7!3m6!1s0xa68fe9b214955f:0xc5f783f0dc1c1e9d!2sR.+Rosa+Zandona,+128+-+Venda+Nova,+Belo+Horizonte+-+MG,+31510-050!3b1!8m2!3d-19.8164447!4d-43.9613243!3m4!1s0xa68fe9b214955f:0xc5f783f0dc1c1e9d!8m2!3d-19.8164447!4d-43.9613243">
          <Icon as={FiMapPin} />
          <Text>
            R. Rosa Zandona, 128 - Venda Nova, Belo Horizonte - MG, 31510-050
          </Text>
        </ExternalLink>
      </Stack>
      <Text
        as="span"
        paddingTop=".25rem"
        className="paddingX"
        display="inline-block"
      >
        Copyright © 2021 | PJ ferragens | Todos os direitos reservados.
      </Text>
    </Stack>
  );
}
