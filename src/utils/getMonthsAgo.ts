export const getMonthsAgo = (currentDate: Date, monthsAgo: number) => {
  const targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - monthsAgo, currentDate.getDate());

  // Adjust for months with fewer days
  if (currentDate.getDate() < targetDate.getDate()) {
    targetDate.setMonth(targetDate.getMonth() - 1);
  }

  return targetDate;
};
