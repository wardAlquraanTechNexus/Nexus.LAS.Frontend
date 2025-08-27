import { Pipe, PipeTransform } from '@angular/core';
import { DynamicListService } from '../services/dynamic-list-service';
import { map, Observable, of } from 'rxjs';
import { EntityIDc } from '../enums/entity-idc';
import { environment } from '../../environment/environment';
import { DisplayColumn } from '../models/columns/display-column';

@Pipe({
  name: 'tableDataPipe',
  standalone: false
})
export class TableDataPipePipe implements PipeTransform {

  constructor(private dlService: DynamicListService) {}

  transform(value: any, element: any, column: DisplayColumn, pipes?: string[]): Observable<string> {
    if (!pipes || pipes.length === 0) {
      return of(value?.toString() ?? '');
    }

    for (const pipe of pipes) {
      switch (pipe.toLowerCase()) {
        case 'personstatus':
        case 'companystatus':
          switch (value) {
            case 0: return of('New');
            case 1: return of('Active');
            case 2: return of('Inactive');
            default: return of(value?.toString() ?? '');
          }

        case 'company-license-status':
          switch (value) {
            case 0: return of('Expired');
            case 1: return of('Active');
            default: return of(value?.toString() ?? '');
          }

        case 'privateperson':
        case 'privatecompany':
          return of(value === true ? 'Private' : 'Public');

        case 'persondocumentprimary':
          return of(value === true ? 'Primary' : '');

        case 'date-time':
          const dateTime = value instanceof Date ? value : new Date(value);
          return of(isNaN(dateTime.getTime()) ? '' : this.formatDateTime(dateTime));

        case 'date':
          const date = value instanceof Date ? value : new Date(value);
          return of(isNaN(date.getTime()) ? '' : this.formatDate(date));

        case 'company-activity':
          return this.dlService
            .GetAllByParentId(environment.rootDynamicLists.companyActivity)
            .pipe(map(list => list.find(x => x.id === value)?.name || 'N/A'));

        case 'document-nationality':
           return this.dlService.GetAllByParentId(environment.rootDynamicLists.nationality).pipe(
            map(list => list.find(x => x.id === value)?.name || 'N/A'))

        case 'capital-currency':
          if (column.compareKey) {
            return this.dlService
              .GetAllByParentId(environment.rootDynamicLists.currencies)
              .pipe(map(list => value + " " + (list.find(x => x.id === element[column.compareKey!])?.name || 'N/A')));
          }
          return of(value?.toString() ?? '');

        case 'company-shareholder-status':
          return of(value === true ? 'Active' : 'Inactive');

        case 'register-type':
          if (value === EntityIDc.Person) return of('Person');
          if (value === EntityIDc.Company) return of('Company');
          return of(value?.toString() ?? '');

        default:
          return of(value?.toString() ?? '');
      }
    }

    return of(value?.toString() ?? '');
  }

  private formatDateTime(date: Date): string {
    return date.toLocaleString(); // adjust as needed
  }

  private formatDate(date: Date): string {
    return date.toLocaleDateString(); // adjust as needed
  }
}

