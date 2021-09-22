import { NextApiResponse } from 'next';
import { IProduct } from '../../core/product';
import { GoogleClient } from '../../api/google-client';
import { auth, getSpreadsheets } from '../../config/google-sheets';

interface IProductResponse {
  REF: string;
  NOME: string;
  IMAGEM: string;
  DESCRIÇÃO: string;
  PREÇO: string;
  TAXA: string;
  DESABILITAR: string;
}

function turnIntoNumber(numInStr: string) {
  return Number(numInStr.replace(/[^0-9,]/g, '').replace(',', '.'));
}

export default async function (_, res: NextApiResponse) {
  const products = await getProducts();
  return res.json(products);
}

export async function getProducts() {
  const spreadsheets = await getSpreadsheets();
  const client = new GoogleClient(
    auth,
    spreadsheets,
    process.env.SPREADSHEETID
  );
  const response = await client.findAll<IProductResponse>('Produtos');
  const products: IProduct[] = response.map((product) => {
    let price = turnIntoNumber(product.PREÇO);
    if (product.TAXA) {
      const rate = turnIntoNumber(product.TAXA) / 100;
      const addition = price * rate;
      price += addition;
    }
    return {
      ref: product.REF,
      name: product.NOME,
      description: product.DESCRIÇÃO,
      image: product.IMAGEM,
      price,
      amount: 0,
      disabled: Boolean(product.DESABILITAR),
    };
  });
  return products;
}
