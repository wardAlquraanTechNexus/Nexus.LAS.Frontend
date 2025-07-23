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
        return value;

      default:
        return value;
    }
  }

}
