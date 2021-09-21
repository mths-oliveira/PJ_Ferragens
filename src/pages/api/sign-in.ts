import { NextApiRequest, NextApiResponse } from 'next';
import { GoogleClient } from '../../api/google-client';
import { auth, getSpreadsheets } from '../../config/google-sheets';
import { compare } from 'bcryptjs';

interface IUserResponse {
  nome: string;
  email: string;
  senha: string;
}

interface IUserLogin {
  email: string;
  password: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const sheet = 'Representantes';
  const spreadsheets = await getSpreadsheets();
  const client = new GoogleClient(
    auth,
    spreadsheets,
    process.env.SPREADSHEETID
  );
  const { email, password }: IUserLogin = req.body;
  const response = await client.findAll<IUserResponse>(sheet);
  const userExists = response.find((user) => {
    return user.email === email;
  });
  if (!userExists) {
    return res.status(404).json('User not found');
  }
  const passwordMatch = await compare(password, userExists.senha);
  if (!passwordMatch) {
    return res.status(404).json('E-mail or password is incorrect');
  }
  return res.status(200).json({ email, name: userExists.nome });
};
