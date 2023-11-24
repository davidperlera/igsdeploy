import { DateTime } from "luxon";

const defaultFormat = 'MMMM dd, yyyy';

class DateUtils {
  public static formatDate(date: Date, format?: string): string {
    const sanitized = new Date(date);

    const dt = DateTime.fromJSDate(sanitized)
    dt.setZone('America/El_Salvador')

    return dt.toFormat(format ?? defaultFormat);
  }
}

export default DateUtils