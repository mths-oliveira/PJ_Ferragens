import { Box, Stack, Text } from '@chakra-ui/react';
import { Heading } from '../components/heading';

interface Props {
  children: string;
}

function Paragraph({ children }: Props) {
  return (
    <Text className="paddingX" marginTop="1rem" color="gray.500">
      {children}
    </Text>
  );
}

export default function Sobre() {
  return (
    <Stack className="paddingY" spacing={['2.25rem', '2.25rem', '3.5rem']}>
      <Box>
        <Heading>Quem somos</Heading>
        <Paragraph>
          Há mais de dez anos no mercado, nos destacamos por fornecer ferragens
          para portas e janelas, além de acessórios para o lar em kits
          personalizados que facilitam a instalação e execução de serviços.
        </Paragraph>
      </Box>
      <Box>
        <Heading>Missão</Heading>
        <Paragraph>
          Comercializar produtos práticos e de qualidade aos nosso clientes que
          proporcionem agilidade em serviços e instalações garantindo a
          satisfação do consumidor final.
        </Paragraph>
      </Box>
      <Box>
        <Heading>Visão</Heading>
        <Paragraph>
          Expandir nossa oferta de produtos em variedade e qualidade.
        </Paragraph>
      </Box>
      <Box>
        <Heading>Valores</Heading>
        <Paragraph>
          Garantir a satisfação de nosso clientes com atendimento diferenciado
          com preço competitivo.
        </Paragraph>
      </Box>
    </Stack>
  );
}
