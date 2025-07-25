import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableDataPipe',
  standalone: false
})
export class TableDataPipePipe implements PipeTransform {

  transform(value: unknown, columnName?: string): unknown {
    if (!columnName) return value;
    switch (columnName.toLowerCase()) {
      case 'personstatus':
        switch (value) {
          case 0:
            return 'New';
          case 1:
            return 'Active';
          case 2:
            return 'Inactive';
          default:
            return value;
        }
      case 'privateperson':
        switch (value) {
          case true:
            return 'Private';
          default:
            return 'Public';
        }
      case 'persondocumentprimary':
        switch (value) {
          case true:
            return 'Primary';
          case false:
            return '';
          default:
            return value;
        }
      case 'date-time':
        if (value instanceof Date) {
          return value;
        }

        if (typeof value === 'string' || typeof value === 'number') {
          const date = new Date(value);
          return isNaN(date.getTime()) ?
            null : formatDateTime(date);
        }
        return value;
      case 'date':
        if (value instanceof Date) {
          return value;
        }

        if (typeof value === 'string' || typeof value === 'number') {
          const date = new Date(value);
          return isNaN(date.getTime()) ?
            null : formatDate(date);
        }
        return value;

      default:
        return value;
    }
  }


}
function formatDateTime(date: Date): string {
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${pad(date.getMonth() + 1)}-${pad(date.getDate())}-${date.getFullYear()} ` +
    `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}
function formatDate(date: Date): string {
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} `
}
