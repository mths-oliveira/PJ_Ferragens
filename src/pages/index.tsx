import { pages } from '../data/pages';
import { Grid, Stack, Text, Image, Box } from '@chakra-ui/react';
import { Heading } from '../components/heading';
import { InternalLink } from '../components/internal-link';

export default function Home() {
  return (
    <Stack className="paddingY" spacing={['1.5rem', '1.5rem', '2.25rem']}>
      <Heading as="h1" textAlign={['left', 'left', 'center']}>
        Ferragens, confira as categorias em destaque.
      </Heading>
      <Grid
        className="paddingX"
        gap=".5rem"
        paddingBottom=".5rem"
        gridTemplateColumns={[
          'repeat(1, 1fr)',
          'repeat(2, 1fr)',
          'repeat(2, 1fr)',
          'repeat(2, 1fr)',
          'repeat(2, 1fr)',
          'repeat(3, 1fr)',
        ]}
      >
        {pages.map(({ href, src, title }) => (
          <InternalLink key={href} href={href}>
            <Box
              width="100%"
              cursor="pointer"
              position="relative"
              borderRadius="md"
              overflow="hidden"
              _hover={{
                '&> :last-child': {
                  textDecoration: 'underline',
                },
              }}
            >
              <Image src={src} objectFit="cover" title={title} />
              <Text
                width="100%"
                padding="1rem 1.25rem"
                bg="linear-gradient(to top, rgba(0,0,0,0.5), transparent)"
                color="white"
                fontSize="md"
                fontWeight="bold"
                position="absolute"
                bottom="0"
                left="0"
              >
                {title}
              </Text>
            </Box>
          </InternalLink>
        ))}
      </Grid>
    </Stack>
  );
}
