import { NextApiRequest, NextApiResponse } from 'next';
import { List, Table } from '../../components/email';
import { sendMail } from '../../config/nodemailer';
import { IProduct } from '../../core/product';
import { formatToBrazilianString, getDate } from '../../utils/getData';
import { ClientData } from '../pedidos/clientes';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { client, products }: ClientData = req.body;
  const from = `Enviado por: ${client.name}, ${client.email}`;
  const date = `Enviado em: ${formatToBrazilianString(getDate())}`;
  const html = `
    <div style="font-family: Arial, Helvetica, sans-serif; color: #565857; font-weight: 600">
      ${List([from, date])}  
      ${Table([['Referência', 'Quantidade'], ...getRecords(products)])}
    </div>`.replace(/>\s+\</g, '><');

  function getRecords(products: IProduct[]) {
    const list = products.map((product) => [
      product.ref,
      String(product.amount),
    ]);
    return list;
  }
  try {
    await sendMail(html);
    return res.json(
      'Em instantes, você receberá o seu orçamento por e-mail, por favor verifique sua caixa de spam e outros filtros.'
    );
  } catch (error) {
    console.log({ error: error.message });
    return res
      .status(404)
      .json(
        'Estamos enfrentando problemas para enviar seu pedido de orçamento, tente reenviar novamente.'
      );
  }
}
