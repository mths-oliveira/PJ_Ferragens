const diasDaSemana = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
];

const mesesDoAno = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

export function getDate() {
  const now = new Date();
  const weekDay = now.getDay();
  const day = now.getDate();
  const month = now.getMonth();
  const year = now.getFullYear();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  function zeroFill(num: number) {
    return String(num).padStart(2, '0');
  }
  `${diasDaSemana[weekDay]} `;
  const dateFormated = `${diasDaSemana[weekDay]}, ${zeroFill(day)} de ${
    mesesDoAno[month]
  } de ${year} as ${zeroFill(hours)}:${zeroFill(minutes)}`;
  return dateFormated;
}
