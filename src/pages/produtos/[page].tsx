import { Box, Flex, Icon, Image, Text, Grid } from '@chakra-ui/react';
import { MdUnfoldMore } from 'react-icons/md';
import { Card } from '../../components/card';
import { useRouter } from 'next/dist/client/router';
import { useProductsContext } from '../../contexts/products';
import { InternalLink } from '../../components/internal-link';
import { ProductModal } from '../../components/product-modal';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getPages } from '../../data/get-pages';
import { IProduct } from '../../core/product';
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import { getProducts } from '../api/products';

interface Props {
  products: IProduct[];
  page: string;
}

export default function Products({ page, products }: Props) {
  return (
    <Box
      className="paddingY"
      width="100%"
      overflow={['auto', 'auto', 'hidden']}
    >
      <Grid
        className="paddingX"
        padding={{ lg: '0' }}
        margin="auto"
        width="fit-content"
        display={['flex', 'flex', 'grid']}
        gridTemplateColumns={[
          'repeat(3, 1fr)',
          'repeat(3, 1fr)',
          'repeat(3, 1fr)',
          'repeat(3, 1fr)',
          'repeat(4, 1fr)',
        ]}
        rowGap="1.5rem"
        columnGap="1rem"
        justifyContent="center"
      >
        {products.map(({ ref, image, description }) => (
          <InternalLink
            key={ref}
            scrollTop={false}
            href={`/produtos/${page}?ref=${ref}`}
          >
            <Card>
              <Image
                src={image}
                title={ref}
                height="8.5rem"
                marginX="auto"
                objectFit="contain"
                transition="all .1s ease"
              />
              <Text cursor="text" overflowY="auto" height="4.5rem">
                {description}
              </Text>
              <Flex
                as="span"
                alignItems="flex-start"
                justifyContent="space-between"
              >
                <Text fontWeight="500" fontSize="1.125rem">
                  Detalhes do produto
                </Text>
                <Icon as={MdUnfoldMore} />
              </Flex>
            </Card>
          </InternalLink>
        ))}
      </Grid>
      <ProductModal />
    </Box>
  );
}

export const getStaticProps: GetStaticProps<Props> = async (ctx) => {
  const page = ctx.params.page as string;
  const pages = await getPages();
  const products = await getProducts();
  const pageProducts: IProduct[] = [];
  for (const ref of pages[page]) {
    for (const product of products) {
      if (product.ref === ref) {
        pageProducts.push(product);
      }
    }
  }
  return {
    props: {
      page,
      products: pageProducts,
    },
    revalidate: 60 * 60 * 6,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      {
        params: {
          page: 'fechaduras_e_acessorios',
        },
      },
      {
        params: {
          page: 'ferragens_em_geral',
        },
      },
      {
        params: {
          page: 'ferragens_para_janelas',
        },
      },
      {
        params: {
          page: 'ferragens_para_portas',
        },
      },
      {
        params: {
          page: 'pecas_para_moveis',
        },
      },
      {
        params: {
          page: 'utilidades_domesticas',
        },
      },
    ],
    fallback: false,
  };
};
