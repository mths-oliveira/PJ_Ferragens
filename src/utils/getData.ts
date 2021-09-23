const weekDays = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
];
const months = [
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
  const date = new Date();
  const GMT = -3;
  const UTCHours = date.getUTCHours();
  date.setHours(UTCHours + GMT);
  return date;
}

export function formatToBrazilianString(date: Date) {
  const weekDay = weekDays[date.getDay()];
  const day = zeroFill(date.getDate());
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const hours = zeroFill(date.getHours());
  const minuts = zeroFill(date.getMinutes());
  return `${weekDay}, ${day} de ${month} de ${year} as ${hours}:${minuts}`;
}

function zeroFill(num: number) {
  return String(num).padStart(2, '0');
}
