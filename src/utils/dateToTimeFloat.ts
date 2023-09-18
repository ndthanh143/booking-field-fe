export const dateToTimeFloat = (date: Date) => {
  const hour = date.getHours();

  const min = date.getMinutes();

  return hour + min / 60;
};
