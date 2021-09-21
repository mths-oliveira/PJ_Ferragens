import { NextApiResponse } from 'next';
import { IProduct } from '../../core/product';
import { GoogleClient } from '../../api/google-client';
import { auth, getSpreadsheets } from '../../config/google-sheets';

interface IPagesResponse {
  'Fechaduras e acessórios': IProduct[];
  'Ferragens em geral': IProduct[];
  'Ferragens para janelas': IProduct[];
  'Ferragens para portas': IProduct[];
  'Peças para móveis': IProduct[];
  'Utilidades domésticas': IProduct[];
}

export interface IPages {
  fechaduras_e_acessorios: IProduct[];
  ferragens_em_geral: IProduct[];
  ferragens_para_janelas: IProduct[];
  ferragens_para_portas: IProduct[];
  pecas_para_moveis: IProduct[];
  utilidades_domesticas: IProduct[];
}

export default async function (_, res: NextApiResponse) {
  const spreadsheets = await getSpreadsheets();
  const client = new GoogleClient(
    auth,
    spreadsheets,
    process.env.SPREADSHEETID
  );
  const response = await client.findColumns<IPagesResponse>('Páginas');
  const pages: IPages = {
    fechaduras_e_acessorios: response['Fechaduras e acessórios'],
    ferragens_em_geral: response['Ferragens em geral'],
    ferragens_para_janelas: response['Ferragens para janelas'],
    ferragens_para_portas: response['Ferragens para portas'],
    pecas_para_moveis: response['Peças para móveis'],
    utilidades_domesticas: response['Utilidades domésticas'],
  };
  return res.json(pages);
}
