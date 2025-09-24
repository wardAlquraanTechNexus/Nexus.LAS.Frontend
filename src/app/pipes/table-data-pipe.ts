import { Pipe, PipeTransform } from '@angular/core';
import { DynamicListService } from '../services/dynamic-list-service';
import { map, Observable, of } from 'rxjs';
import { EntityIDc } from '../enums/entity-idc';
import { environment } from '../../environment/environment';
import { DisplayColumn } from '../models/columns/display-column';
import { PersonStatus } from '../enums/person-status';
import { CompanyStatus } from '../enums/company-status';
import { CompanyContractStatus } from '../enums/company-contract-status';
import { PersonService } from '../services/person-services/person-service';
import { LanguageService } from '../services/language-service';
import { CompanyLicenseStatus } from '../enums/company-license-status';
import { NumberFormatConfigService } from '../services/number-format-config.service';
import { CommonStatus } from '../enums/common-status';
import { CompanyService } from '../services/company-services/company-service';

@Pipe({
  name: 'tableDataPipe',
  standalone: false
})
export class TableDataPipe implements PipeTransform {

  constructor(
    private dlService: DynamicListService,
    private personService: PersonService,
    private companyService: CompanyService,
    private languageService: LanguageService, // Inject LanguageService
    private numberFormatConfig: NumberFormatConfigService // Inject NumberFormatConfigService
  ) { }

  transform(value: any, element: any, column: DisplayColumn, pipes?: string[]): Observable<string> {
    if (!pipes || pipes.length === 0) {
      // Check if value is a number and format it with thousand separators
      if (typeof value === 'number' && !isNaN(value)) {
        const decimals = column.decimals ?? this.numberFormatConfig.getConfig().defaultDecimals;
        return of(this.formatNumberWithSeparator(value, decimals));
      }
      return of(value?.toString() ?? '');
    }

    const getLabel = this.languageService.getLabel.bind(this.languageService);

    for (const pipe of pipes) {
      switch (pipe.toLowerCase()) {
        case 'person-status':
          switch (value) {
            case PersonStatus.New:
              return of(getLabel('COMMON.NEW') ?? 'New');
            case PersonStatus.Active: return of(getLabel('COMMON.ACTIVE') ?? 'Active');
            case PersonStatus.Inactive: return of(getLabel('COMMON.INACTIVE') ?? 'Inactive');
            default: return of(value?.toString() ?? '');
          }
        case 'company-status':
          switch (value) {
            case CompanyStatus.New: return of(getLabel('COMMON.NEW') ?? 'New');
            case CompanyStatus.Active: return of(getLabel('COMMON.ACTIVE') ?? 'Active');
            case CompanyStatus.Inactive: return of(getLabel('COMMON.INACTIVE') ?? 'Inactive');
            default: return of(value?.toString() ?? '');
          }
        case 'common-status':
          switch (value) {
            case CommonStatus.New: return of(getLabel('COMMON.NEW') ?? 'New');
            case CommonStatus.Active: return of(getLabel('COMMON.ACTIVE') ?? 'Active');
            case CommonStatus.Inactive: return of(getLabel('COMMON.INACTIVE') ?? 'Inactive');
            default: return of(value?.toString() ?? '');
          }

        case 'company-contract-status':
          switch (value) {
            case CompanyContractStatus.Expired: return of(getLabel('COMMON.EXPIRED') ?? 'Expired');
            case CompanyContractStatus.Active: return of(getLabel('COMMON.ACTIVE') ?? 'Active');
            default: return of(value?.toString() ?? '');
          }
        case 'company-license-status':
          switch (value) {
            case CompanyLicenseStatus.Expired: return of(getLabel('COMMON.EXPIRED') ?? 'Expired');
            case CompanyLicenseStatus.Active: return of(getLabel('COMMON.ACTIVE') ?? 'Active');
            default: return of(value?.toString() ?? '');
          }

        case 'private-person':
        case 'private-company':
        case 'private':

          return of(value === true ? getLabel('COMPANY.PRIVATE') : getLabel('COMPANY.PUBLIC'));

        case 'signatory-active':
        case 'capital-active':
        case 'active':
          return of(value === true ? getLabel('COMMON.ACTIVE') ?? 'Active' : getLabel('COMMON.INACTIVE') ?? 'Inactive');

        case 'person-document-primary':
        case 'person-in-charge-primary':
          return of(value === true ? getLabel('COMMON.PRIMARY') ?? 'Primary' : '');

        case 'date-time':
          const dateTime = value instanceof Date ? value : new Date(value);
          return of(isNaN(dateTime.getTime()) ? '' : this.formatDateTime(dateTime));

        case 'date':
          if (!value) {
            return of("N/A")
          }
          const date = value instanceof Date ? value : new Date(value);
          return of(isNaN(date.getTime()) ? '' : this.formatDate(date));

        case 'company-activity':
          return this.dlService.GetAllByParentId(environment.rootDynamicLists.companyActivity).pipe(
            map(list => {
              const found = list.find(x => x.id == value);
              return found ? found.name : '';
            })
          );

        case 'number':
          if (value === null || value === undefined) {
            return of('N/A');
          }
          const numValue = typeof value === 'string' ? parseFloat(value) : value;
          if (isNaN(numValue)) {
            return of(value?.toString() ?? '');
          }
          const numberDecimals = column.decimals ?? this.numberFormatConfig.getConfig().defaultDecimals;
          return of(this.formatNumberWithSeparator(numValue, numberDecimals));

        case 'percentage':
          const percentDecimals = column.decimals ?? this.numberFormatConfig.getConfig().percentageDecimals;
          const percentValue = this.formatNumberWithSeparator(value, percentDecimals);
          return of(percentValue + "%")

        case 'document-nationality':
        case 'country':
          return this.dlService.GetAllByParentId(environment.rootDynamicLists.country).pipe(
            map(list => {
              const found = list.find(x => x.id == value);
              return found ? found.name : '';
            })
          );
        case 'dl-by-comparekey':
          if (column.compareKey) {
            return this.dlService.GetAllByParentId(element[column.compareKey]).pipe(
              map(list => {
                const found = list.find(x => x.id == value);
                return found ? found.name : '';
              })
            );
          }
          return of(value?.toString() ?? '');

        case 'original-document-type':
          return this.dlService.GetAllByParentId(environment.rootDynamicLists.originalDocumentTypes).pipe(
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
        case 'property-type-of-title':
          return this.dlService.GetAllByParentId(environment.rootDynamicLists.propertyTypeOfTitle).pipe(
            map(list => {
              const found = list.find(x => x.id == value);
              return found ? found.name : '';
            })
          );
        case 'property-owner-relation':
          return this.dlService.GetAllByParentId(environment.rootDynamicLists.propertyOwnerRelation).pipe(
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
        case 'other-document-type':
          return this.dlService.GetAllByParentId(environment.rootDynamicLists.otherDocumentType).pipe(
            map(list => {
              const found = list.find(x => x.id == value);
              return found ? found.name : '';
            })
          );
        case 'designations':
          // value can be a comma-separated string like "1,2,3" or an array [1,2,3]
          const ids = Array.isArray(value)
            ? value
            : typeof value === 'string'
              ? value.split(',').map(v => v.trim()).filter(v => v !== '')
              : [value];

          return this.dlService.GetAllByParentId(environment.rootDynamicLists.designation).pipe(
            map(list => {
              const names = ids
                .map(id => {
                  const found = list.find(x => x.id == id);
                  return found ? found.name : '';
                })
                .filter(name => name); // remove empty names
              return names.join(', ');
            })
          );

        case 'designation':
          return this.dlService.GetAllByParentId(environment.rootDynamicLists.designation).pipe(
            map(list => {
              const found = list.find(x => x.id == value);
              return found ? found.name : '';
            })
          );
        case 'company-contract-type':
          return this.dlService.GetAllByParentId(environment.rootDynamicLists.companyContractType).pipe(
            map(list => {
              const found = list.find(x => x.id == value);
              return found ? found.name : '';
            })
          );
        case 'board-position':
          return this.dlService.GetAllByParentId(environment.rootDynamicLists.boardPosition).pipe(
            map(list => {
              const found = list.find(x => x.id == value);
              return found ? found.name : '';
            })
          );
        case 'rule':
          return this.dlService.GetAllByParentId(environment.rootDynamicLists.rule).pipe(
            map(list => {
              const found = list.find(x => x.id == value);
              return found ? found.name : '';
            })
          );
        case 'person':
          return this.personService.getAllPersons({ pageSize: 100, page: 1 }).pipe(
            map(list => {
              const found = list.find(x => x.id == value);
              return found?.personEnglishName || "N/A"
            })
          );

        case 'person-or-company':
          if (element[column.compareKey!] == EntityIDc.Person) {
            return this.personService.getAllPersons({ pageSize: 100, page: 1 }).pipe(
              map(list => {
                const found = list.find(x => x.id == value);
                return found?.personEnglishName || "N/A"
              })
            );

          } else {
            return this.companyService.getAllCompanies({ pageSize: 100, page: 1 }).pipe(
              map(list => {
                const found = list.find(x => x.id == value);
                return found?.companyEnglishName || "N/A"
              })
            );
          }
        case 'capital-currency':
          const currencyDecimals = column.decimals ?? this.numberFormatConfig.getConfig().currencyDecimals;
          if (column.compareKey) {
            return this.dlService.GetAllByParentId(environment.rootDynamicLists.currencies).pipe(
              map(list => {
                const found = list.find(x => x.id == element[column.compareKey!]);
                const formattedValue = this.formatNumberWithSeparator(value, currencyDecimals);
                return found ? `${formattedValue} ${found.name}` : `${formattedValue}`;
              })
            );
          }
          else {
            return of(this.formatNumberWithSeparator(value, currencyDecimals))
          }


        case 'company-shareholder-status':
          return of(value === true ? getLabel('COMMON.ACTIVE') ?? 'Active' : getLabel('COMMON.INACTIVE') ?? 'Inactive');

        case 'register-type':
          if (value === EntityIDc.Person) return of(getLabel('COMMON.PERSON') ?? 'Person');
          if (value === EntityIDc.Company) return of(getLabel('COMMON.COMPANY') ?? 'Company');
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
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  private formatNumberWithSeparator(value: number | string, decimals: number = 2): string {
    if (value === null || value === undefined || value === '') {
      return '';
    }

    // Convert to number if it's a string
    const numericValue = typeof value === 'string' ? parseFloat(value) : value;

    if (isNaN(numericValue)) {
      return value?.toString() ?? '';
    }

    const config = this.numberFormatConfig.getConfig();

    // Check if the original value has decimals
    const stringValue = value.toString();
    const hasDecimals = stringValue.includes('.');
    const actualDecimals = hasDecimals ? (stringValue.split('.')[1] || '').length : 0;

    // Use Intl.NumberFormat for consistent formatting
    // Only show decimals if the original value has them or if decimals is explicitly set > 0 for currencies/percentages
    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: hasDecimals ? Math.min(decimals, actualDecimals) : 0,
      maximumFractionDigits: decimals,
      useGrouping: true
    });

    let formatted = formatter.format(numericValue);

    // Replace separators based on config if different from default
    if (config.thousandSeparator !== ',') {
      formatted = formatted.replace(/,/g, config.thousandSeparator);
    }
    if (config.decimalSeparator !== '.') {
      formatted = formatted.replace(/\./g, config.decimalSeparator);
    }

    return formatted;
  }
}

