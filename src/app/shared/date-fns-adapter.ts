import { Injectable } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import {
  format,
  parse,
  isValid,
  parseISO,
  addMonths,
  addYears,
  setDay,
  getDay,
  getDate,
  getMonth,
  getYear,
  getDaysInMonth,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  setMonth,
  setYear,
  setDate,
  isDate,
  toDate
} from 'date-fns';

@Injectable()
export class DateFnsAdapter extends DateAdapter<Date> {
  private _localeData: {
    months: string[];
    shortMonths: string[];
    dates: string[];
    days: string[];
    shortDays: string[];
    narrowDays: string[];
  };

  constructor() {
    super();
    this._localeData = {
      months: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ],
      shortMonths: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ],
      dates: Array.from({ length: 31 }, (_, i) => String(i + 1)),
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      narrowDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
    };
  }

  getYear(date: Date): number {
    return getYear(date);
  }

  getMonth(date: Date): number {
    return getMonth(date);
  }

  getDate(date: Date): number {
    return getDate(date);
  }

  getDayOfWeek(date: Date): number {
    return getDay(date);
  }

  getMonthNames(style: 'long' | 'short' | 'narrow'): string[] {
    if (style === 'short') {
      return this._localeData.shortMonths;
    }
    return this._localeData.months;
  }

  getDateNames(): string[] {
    return this._localeData.dates;
  }

  getDayOfWeekNames(style: 'long' | 'short' | 'narrow'): string[] {
    if (style === 'short') {
      return this._localeData.shortDays;
    }
    if (style === 'narrow') {
      return this._localeData.narrowDays;
    }
    return this._localeData.days;
  }

  getYearName(date: Date): string {
    return String(getYear(date));
  }

  getFirstDayOfWeek(): number {
    return 0; // Sunday
  }

  getNumDaysInMonth(date: Date): number {
    return getDaysInMonth(date);
  }

  clone(date: Date): Date {
    return new Date(date.getTime());
  }

  createDate(year: number, month: number, date: number): Date {
    // Create date at noon to avoid DST issues
    return new Date(year, month, date, 12, 0, 0);
  }

  today(): Date {
    const now = new Date();
    // Return today at noon to avoid DST issues
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0);
  }

  parse(value: any, parseFormat: any): Date | null {
    if (value && typeof value === 'string') {
      // Try DD/MM/YYYY format first
      let parsed = parse(value, 'dd/MM/yyyy', new Date());
      if (isValid(parsed)) {
        // Set to noon to avoid DST issues
        return new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate(), 12, 0, 0);
      }

      // Try other common formats
      const formats = ['yyyy-MM-dd', 'MM/dd/yyyy', 'dd-MM-yyyy'];
      for (const fmt of formats) {
        parsed = parse(value, fmt, new Date());
        if (isValid(parsed)) {
          return new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate(), 12, 0, 0);
        }
      }

      // Try ISO format
      if (value.includes('T')) {
        parsed = parseISO(value);
        if (isValid(parsed)) {
          return new Date(parsed.getFullYear(), parsed.getMonth(), parsed.getDate(), 12, 0, 0);
        }
      }
    }

    // Return null if we can't parse the value
    return null;
  }

  format(date: Date, displayFormat: any): string {
    if (!this.isValid(date)) {
      throw Error('DateFnsAdapter: Cannot format invalid date.');
    }

    if (displayFormat === 'DD/MM/YYYY') {
      return format(date, 'dd/MM/yyyy');
    }

    if (displayFormat === 'MMM YYYY') {
      return format(date, 'MMM yyyy');
    }

    if (displayFormat === 'MMMM YYYY') {
      return format(date, 'MMMM yyyy');
    }

    // Default format
    return format(date, 'dd/MM/yyyy');
  }

  addCalendarYears(date: Date, years: number): Date {
    const result = addYears(date, years);
    // Maintain noon time to avoid DST issues
    return new Date(result.getFullYear(), result.getMonth(), result.getDate(), 12, 0, 0);
  }

  addCalendarMonths(date: Date, months: number): Date {
    const result = addMonths(date, months);
    // Maintain noon time to avoid DST issues
    return new Date(result.getFullYear(), result.getMonth(), result.getDate(), 12, 0, 0);
  }

  addCalendarDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    // Maintain noon time to avoid DST issues
    return new Date(result.getFullYear(), result.getMonth(), result.getDate(), 12, 0, 0);
  }

  toIso8601(date: Date): string {
    return date.toISOString();
  }

  isDateInstance(obj: any): boolean {
    return isDate(obj);
  }

  isValid(date: Date): boolean {
    return isDate(date) && isValid(date);
  }

  invalid(): Date {
    return new Date(NaN);
  }

  override deserialize(value: any): Date | null {
    if (value == null || (this.isDateInstance(value) && this.isValid(value))) {
      return value;
    }

    if (typeof value === 'string') {
      return this.parse(value, null);
    }

    return super.deserialize(value);
  }
}