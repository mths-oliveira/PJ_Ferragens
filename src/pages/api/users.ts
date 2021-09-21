import { IUser } from './../../core/user';
import { NextApiRequest, NextApiResponse } from 'next';
import { GoogleClient } from '../../api/google-client';
import { auth, getSpreadsheets } from '../../config/google-sheets';

interface IUserResponse {
  email: string;
  nome: string;
  senha: string;
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const sheet = 'Representantes';
  const spreadsheets = await getSpreadsheets();
  const client = new GoogleClient(
    auth,
    spreadsheets,
    process.env.SPREADSHEETID
  );

  if (req.method === 'POST') {
    try {
      const response = await registerUser(sheet, client, req.body);
      return res.status(201).json(response.data);
    } catch (error) {
      return res.status(404).json(error.message);
    }
  }

  if (req.method === 'GET') {
    try {
      const response = await getUsers(sheet, client);
      return res.status(200).json(response.data);
    } catch (error) {
      return res.status(404).json(error.message);
    }
  }
}

async function getUsers(sheet: string, client: GoogleClient) {
  try {
    const response = await client.findAll<IUserResponse>(sheet);
    const users: IUser[] = response.map((user) => {
      return {
        email: user.email,
        name: user.nome,
        password: user.senha,
      };
    });
    return {
      data: users,
    };
  } catch (error) {
    throw new Error('Users not found');
  }
}

async function registerUser(sheet: string, client: GoogleClient, user: IUser) {
  try {
    await client.add(sheet, [user.name, user.email, user.password]);
    return {
      data: 'Registered user successfully',
    };
  } catch (error) {
    throw new Error('Users not found');
  }
}
