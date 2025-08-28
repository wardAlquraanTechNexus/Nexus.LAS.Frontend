import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PersonStatus } from '../enums/person-status';
import { CompanyStatus } from '../enums/company-status';

@Pipe({
  name: 'textPipe',
  standalone: false
})
export class TextPipe implements PipeTransform {

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
    }
    return value;
  }

}
