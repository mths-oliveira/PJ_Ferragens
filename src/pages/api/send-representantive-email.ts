import { NextApiRequest, NextApiResponse } from 'next';
import { List, Table } from '../../components/email';
import { sendMail } from '../../config/nodemailer';
import { IProduct } from '../../core/product';
import { format } from '../../utils/format';
import { formatToBrazilianString, getDate } from '../../utils/getData';
import { RepresentativeData } from '../pedidos/representantes';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const {
    client,
    products,
    conditions,
    payment,
    term,
    total,
    representantive,
    observation,
  }: RepresentativeData = req.body;
  const from = `Enviado por: ${representantive.name}, ${representantive.email}`;
  const date = `Enviado em: ${formatToBrazilianString(getDate())}`;
  const list = [total, payment, conditions, term];
  if (observation) {
    list.push(observation);
  }
  const html = `
    <div style="font-family: Arial, Helvetica, sans-serif; color: #565857; font-weight: 600">
      ${List([from, date])}  
      ${Table([
        ['Referência', 'Quantidade', 'Subtotal'],
        ...getRecords(products),
      ])}
      ${List(list)}  
    </div>`.replace(/>\s+\</g, '><');

  function getRecords(products: IProduct[]) {
    const list = products.map((product) => {
      const subtotal = format(product.price * product.amount);
      return [product.ref, String(product.amount), subtotal];
    });
    return list;
  }

  try {
    await sendMail(html, client.email);
    return res.json(
      'Em instantes, você receberá o seu orçamento por e-mail, por favor verifique sua caixa de spam e outros filtros.'
    );
  } catch (_) {
    return res
      .status(404)
      .json(
        'Estamos enfrentando problemas para enviar seu pedido de orçamento, tente reenviar novamente.'
      );
  }
}
