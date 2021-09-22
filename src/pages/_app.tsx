import Head from 'next/head';
import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../styles/theme';
import { Footer } from '../components/layout/footer';
import { Header } from '../components/layout/header';
import { Menu } from '../components/layout/menu';
import { Navbar } from '../components/layout/navbar';
import { InputModal } from '../components/layout/input-modal';
import { ShoppingCart } from '../components/layout/shopping-cart';
import { MenuContextProvider } from '../contexts/menu';
import { AuthContextProvider } from '../contexts/user';
import { ClientsContextProvider } from '../contexts/client';
import { ProductsContextProvider } from '../contexts/products';
import { ShoppingCartContextProvider } from '../contexts/shopping-cart';
import { InputModalContextProvider } from '../contexts/input-modal';
import { FormModalContextProvider } from '../contexts/form-modal';
import { FormModal } from '../components/layout/form-modal';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Loja de Ferragens | PJ Ferragens</title>
        <meta name="title" content="Loja de Ferragens | PJ Ferragens" />
        <meta
          name="description"
          content="Na PJ ferragens você encontra itens como: Fechadura, Maçaneta, Trinco, Dobradiça, Parafuso, Puxadores e todas as demais ferragens para sua casa."
        />
        <link rel="icon" href="/assets/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          crossOrigin="true"
          href="https://fonts.gstatic.com"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Merriweather:wght@700&display=swap"
        />
      </Head>
      <ChakraProvider resetCSS theme={theme}>
        <ClientsContextProvider>
          <AuthContextProvider>
            <MenuContextProvider>
              <Menu />
              <ProductsContextProvider>
                <ShoppingCartContextProvider>
                  <ShoppingCart />
                  <FormModalContextProvider>
                    <FormModal />
                    <InputModalContextProvider>
                      <InputModal />
                      <Navbar />
                      <Header />
                      <Component {...pageProps} />
                      <Footer />
                    </InputModalContextProvider>
                  </FormModalContextProvider>
                </ShoppingCartContextProvider>
              </ProductsContextProvider>
            </MenuContextProvider>
          </AuthContextProvider>
        </ClientsContextProvider>
      </ChakraProvider>
    </>
  );
}
