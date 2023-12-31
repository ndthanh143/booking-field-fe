export const timeStringToFloat = (time: string) => {
  const [h, m] = time.split(':');

  const hour = Number(h);
  const minutes = Number(m) / 60;

  return hour + minutes;
};
