import { Pipe, PipeTransform } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { PersonStatus } from '../enums/person-status';
import { DynamicListService } from '../services/dynamic-list-service';
import { environment } from '../../environment/environment';
import { LanguageService } from '../services/language-service'; // <-- Import LanguageService
import { CommonStatus } from '../enums/common-status';
import { EntityIDc } from '../enums/entity-idc';

@Pipe({
  name: 'textPipe',
  standalone: false
})
export class TextPipe implements PipeTransform {
  constructor(
    private dlService: DynamicListService,
    private languageService: LanguageService // <-- Inject LanguageService
  ) { }

  transform(value: any, pipe: string, parentId: any = null): Observable<string> {
    const getLabel = this.languageService.getLabel.bind(this.languageService);


    switch (pipe.toLowerCase()) {
      case 'common-status':
        switch (value) {
          case CommonStatus[CommonStatus.New].toLowerCase(): return of(getLabel('COMMON.NEW') ?? 'New');
          case CommonStatus[CommonStatus.Active].toLowerCase(): return of(getLabel('COMMON.ACTIVE') ?? 'Active');
          case CommonStatus[CommonStatus.Inactive].toLowerCase(): return of(getLabel('COMMON.INACTIVE') ?? 'Inactive');
          default: return of(value?.toString() ?? '');
        }
      
      case 'person-status':
        switch (value) {
          case PersonStatus.New: return of(getLabel('COMMON.NEW') ?? 'New');
          case PersonStatus.Active: return of(getLabel('COMMON.ACTIVE') ?? 'Active');
          case PersonStatus.Inactive: return of(getLabel('COMMON.INACTIVE') ?? 'Inactive');
          default: return of(value?.toString() ?? '');
        }
     
      case 'private-person':
      case 'private-company':
      case 'private':
        return of(value === true ? getLabel('COMPANY.PRIVATE') ?? 'Private' : getLabel('COMPANY.PUBLIC') ?? 'Public');

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

      case 'country':
        return this.dlService.GetAllByParentId(environment.rootDynamicLists.country).pipe(
          map(list => {
            const found = list.find(x => x.id == value);
            return found ? found.name : '';
          })
        );

      case 'property-purpose':
        return this.dlService.GetAllByParentId(environment.rootDynamicLists.propertyPurpose).pipe(
          map(list => {
            const found = list.find(x => x.id == value);
            return found ? found.name : '';
          })
        );

      case 'property-type-of-title':
        return this.dlService.GetAllByParentId(environment.rootDynamicLists.propertyTypeOfTitle).pipe(
          map(list => {
            const found = list.find(x => x.id == value);
            return found ? found.name : '';
          })
        );
      case 'property-type':
        return this.dlService.GetAllByParentId(environment.rootDynamicLists.propertyType).pipe(
          map(list => {
            const found = list.find(x => x.id == value);
            return found ? found.name : '';
          })
        );
      case 'property-document-type':
        return this.dlService.GetAllByParentId(environment.rootDynamicLists.propertyDocumentType).pipe(
          map(list => {
            const found = list.find(x => x.id == value);
            return found ? found.name : '';
          })
        );

      case 'property-legal-statuses':
        if (!value) return of('');
        let ids: number[] = value.split(',').map((id: string) => parseInt(id.trim()));
        return this.dlService.GetAllByParentId(environment.rootDynamicLists.propertyStatus).pipe(
          map(list => {
            let names = list.filter(x => ids.includes(x.id)).map(x => x.name);
            return names.join(', ');
          })
        );

        case 'transaction-subject-type':
          return this.dlService.GetAllByParentId(environment.rootDynamicLists.transactionTypes).pipe(
            map(list => {
              const found = list.find(x => x.id == value);
              return found ? found.name : '';
            })
          );
      case 'dl-by-parent-id':
        if (parentId == null) {
          return of(value);
        }
        return this.dlService.GetAllByParentId(parentId).pipe(
          map(list => {
            const found = list.find(x => x.id == value);
            return found ? found.name : '';
          })
        );

        case 'register-type':
                  if (value === EntityIDc.Person) return of(getLabel('COMMON.PERSON') ?? 'Person');
                  if (value === EntityIDc.Company) return of(getLabel('COMMON.COMPANY') ?? 'Company');
                  if (value === EntityIDc.LawFirm) return of(getLabel('LAW_FIRM.LAW_FIRM') ?? 'Law Firm');
                  if (value === EntityIDc.Transactions) return of(getLabel('TRANSACTION.TRANSACTION') ?? 'Transaction');

                  return of(value?.toString() ?? '');
        
      case 'date-time':
        const dateTime = value instanceof Date ? value : new Date(value);
        return of(isNaN(dateTime.getTime()) ? '' : this.formatDateTime(dateTime));

      case 'date':
        const date = value instanceof Date ? value : new Date(value);
        return of(isNaN(date.getTime()) ? '' : this.formatDate(date));
    }
    return of(value?.toString() ?? '');
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
