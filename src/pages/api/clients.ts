import { IClient } from './../../core/client';
import { NextApiResponse, NextApiRequest } from 'next';
import { GoogleClient } from '../../api/google-client';
import { auth, getSpreadsheets } from '../../config/google-sheets';

interface IClientResponse {
  email: string;
  nome: string;
  'cpf / cnpj'?: string;
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const spreadsheets = await getSpreadsheets();
  const client = new GoogleClient(
    auth,
    spreadsheets,
    process.env.SPREADSHEETID
  );
  if (req.method === 'GET') {
    const response = await client.findAll<IClientResponse>('Clientes');
    const clients: IClient[] = response.map((client) => {
      return {
        id: client['cpf / cnpj'],
        email: client.email,
        name: client.nome,
      };
    });
    return res.status(200).json(clients);
  }
  if (req.method === 'POST') {
    const { email, id, name }: IClient = req.body;
    await client.add('Clientes', [id, name, email]);
    return res.status(201).json('User successfully added');
  }
}
