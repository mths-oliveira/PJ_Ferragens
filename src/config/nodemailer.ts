import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USERMAIL,
    pass: process.env.PASSMAIL,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export async function sendMail(content: string, email?: string) {
  const to = [process.env.EMAIL];
  if (email) to.push(email);
  await transporter.sendMail({
    from: process.env.USERMAIL,
    to,
    subject: 'Contato através do site: www.pjferragens.com.br',
    replyTo: email,
    html: content,
  });
}
