export const getDaysInMonth = (month: number, year: number): Date[] => {
  const date = new Date(year, month, 1);
  const days = [];
  //Add all days from last month of first week
  const lastMonth = new Date(year, month, 1);
  lastMonth.setDate(date.getDate() - 1);
  if (date.getDay() !== 1) {
    date.setDate(
      date.getDate() - (date.getDay() === 0 ? 6 : date.getDay() - 1)
    );

    while (date.getMonth() === lastMonth.getMonth()) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
  }

  //Add all days of the current month
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  //Add remaning days of next month
  while (date.getDay() !== 1) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};
