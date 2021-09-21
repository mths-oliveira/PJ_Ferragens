import { Box, Flex, Icon, Image, Text, Grid } from '@chakra-ui/react';
import { MdUnfoldMore } from 'react-icons/md';
import { Card } from '../../components/card';
import { useRouter } from 'next/dist/client/router';
import { useProductsContext } from '../../contexts/products';
import { InternalLink } from '../../components/internal-link';
import { ProductModal } from '../../components/product-modal';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { IPages } from '../api/pages';
import { IProduct } from '../../core/product';

export default function Products() {
  const { query } = useRouter();
  const { products } = useProductsContext();
  const [listProducts, setListProducts] = useState<IProduct[]>([]);
  useEffect(() => {
    (async () => {
      const response = await axios.get<IPages>('/api/pages');
      if (!response.data || !query.page) return;
      const refs: string[] = response.data[query.page as string];
      const listProducts = products.filter((product) => {
        return refs.includes(product.ref);
      });
      setListProducts(listProducts);
    })();
  }, [query.page, products]);
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
        {listProducts.map(({ ref, image, description }) => (
          <InternalLink
            key={ref}
            scrollTop={false}
            href={`/produtos/${query.page}?ref=${ref}`}
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
