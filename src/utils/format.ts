export function format(value: number) {
  if (!value) value = 0;
  const formatedValue = value
    .toFixed(2)
    .replace(/(\d+)(\d{3})\.(\d{2})/, '$1.$2,$3');
  return `R$ ${formatedValue}`;
}
