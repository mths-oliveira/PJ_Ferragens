const weekDay = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
];
const month = [
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

export function getDate({
  getMinutes,
  getHours,
  getDate,
  getDay,
  getMonth,
  getFullYear,
}: Date) {
  const dateFormated = `${weekDay[getDay()]}, ${zeroFill(getDate())} de ${
    month[getMonth()]
  } de ${getFullYear()} as ${zeroFill(getHours())}:${zeroFill(getMinutes())}`;
  return dateFormated;
}

function zeroFill(num: number) {
  return String(num).padStart(2, '0');
}
