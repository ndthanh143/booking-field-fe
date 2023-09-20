export const convertToDate = (dateString: string, time: number) => {
  const date = new Date(dateString);
  const hours = Math.floor(time);
  const minutes = (time - hours) * 60;

  date.setHours(hours, minutes, 0, 0);

  return date;
};
