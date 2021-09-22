import { GoogleClient } from '../api/google-client';
import { auth, getSpreadsheets } from '../config/google-sheets';

interface IPagesResponse {
  'Fechaduras e acessórios': string[];
  'Ferragens em geral': string[];
  'Ferragens para janelas': string[];
  'Ferragens para portas': string[];
  'Peças para móveis': string[];
  'Utilidades domésticas': string[];
}

export interface IPages {
  fechaduras_e_acessorios: string[];
  ferragens_em_geral: string[];
  ferragens_para_janelas: string[];
  ferragens_para_portas: string[];
  pecas_para_moveis: string[];
  utilidades_domesticas: string[];
}

export async function getPages() {
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
  return pages;
}
