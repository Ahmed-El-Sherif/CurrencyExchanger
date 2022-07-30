export class DateHelper {
  public static getLastDaysOfMonths(start: Date, end: Date) {
    const days: Date[] = [];
    while (start < end) {
      const year = start.getFullYear();
      const month = start.getMonth();
      start = this.addMonths(start, 1);
      const dateToAdd = new Date(year, month + 1, 0);
      if (dateToAdd < end) {
        days.push(dateToAdd);
      }
    }
    return days;
  }

  public static addMonths(date: Date, months: number) {
    const d = date.getDate();
    date.setMonth(date.getMonth() + +months);
    if (date.getDate() != d) {
      date.setDate(0);
    }
    return date;
  }
}
