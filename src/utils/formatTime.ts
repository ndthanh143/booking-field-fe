export const convertDecimalToTime = (decimalTime: number) => {
  const hours = Math.floor(decimalTime);
  const minutes = Math.round((decimalTime - hours) * 60);

  return minutes === 0 ? `${hours}h` : `${hours}h${minutes}`;
};
