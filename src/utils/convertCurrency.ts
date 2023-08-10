export const convertCurrency = (value: number) => {
  return value.toLocaleString('vi', {
    style: 'currency',
    currency: 'vnd',
  });
};
