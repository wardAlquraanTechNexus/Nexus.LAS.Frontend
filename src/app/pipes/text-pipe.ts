import { Pipe, PipeTransform } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { PersonStatus } from '../enums/person-status';
import { CompanyStatus } from '../enums/company-status';
import { DynamicListService } from '../services/dynamic-list-service';
import { environment } from '../../environment/environment';

@Pipe({
  name: 'textPipe',
  standalone: false
})
export class TextPipe implements PipeTransform {
  constructor(private dlService: DynamicListService) { }

  transform(value: any, pipe: string): Observable<string> {
    switch (pipe.toLowerCase()) {
      case 'person-status':
        switch (value) {
          case PersonStatus.New: return of('New');
          case PersonStatus.Active: return of('Active');
          case PersonStatus.Inactive: return of('Inactive');
          default: return of(value?.toString() ?? '');
        }
      case 'company-status':
        switch (value) {
          case CompanyStatus.New: return of('New');
          case CompanyStatus.Active: return of('Active');
          case CompanyStatus.Inactive: return of('Inactive');
          default: return of(value?.toString() ?? '');
        }

      case 'private-person':
      case 'private-company':
        return of(value === true ? 'Private' : 'Public');

      case 'company-contract-type':
        return this.dlService.GetAllByParentId(environment.rootDynamicLists.companyContractType).pipe(
          map(list => {
            const found = list.find(x => x.id == value);
            return found ? found.name : '';
          })
        );

      case 'other-document-type':
        return this.dlService.GetAllByParentId(environment.rootDynamicLists.otherDocumentType).pipe(
          map(list => {
            const found = list.find(x => x.id == value);
            return found ? found.name : '';
          })
        );

      case 'date-time':
        const dateTime = value instanceof Date ? value : new Date(value);
        return of(isNaN(dateTime.getTime()) ? '' : this.formatDateTime(dateTime));

      case 'date':
        const date = value instanceof Date ? value : new Date(value);
        return of(isNaN(date.getTime()) ? '' : this.formatDate(date));

    }
    return value;
  }

  private formatDateTime(date: Date): string {
    return date.toLocaleString(); // adjust as needed
  }

  private formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

}
