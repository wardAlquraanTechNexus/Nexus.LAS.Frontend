import { MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { DateFnsAdapter } from './date-fns-adapter';

export const NEXUS_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export const DATE_FORMAT_PROVIDERS = [
  { provide: DateAdapter, useClass: DateFnsAdapter },
  { provide: MAT_DATE_FORMATS, useValue: NEXUS_DATE_FORMATS }
];