import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberSeperator',
  standalone: false
})
export class NumberSeperatorPipe implements PipeTransform {

  transform(value: any, fractionDigits: number = 3): unknown {
    if (!value && value !== 0) return null;
    const num = Number(value.toString().replace(/,/g, ''));
    if (isNaN(num)) return '0';
    return num.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 3 });

  }

}
