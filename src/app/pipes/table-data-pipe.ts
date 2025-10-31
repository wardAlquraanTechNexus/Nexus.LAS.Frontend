import { Pipe, PipeTransform } from '@angular/core';
import { DynamicListService } from '../services/dynamic-list-service';
import { map, Observable, of } from 'rxjs';
import { EntityIDc } from '../enums/entity-idc';
import { environment } from '../../environment/environment';
import { DisplayColumn } from '../models/columns/display-column';
import { CompanyContractStatus } from '../enums/company-contract-status';
import { PersonService } from '../services/person-services/person-service';
import { LanguageService } from '../services/language-service';
import { CompanyLicenseStatus } from '../enums/company-license-status';
import { NumberFormatConfigService } from '../services/number-format-config.service';
import { CommonStatus } from '../enums/common-status';
import { CompanyService } from '../services/company-services/company-service';
import { LawFirmService } from '../services/law-firm-services/law-firm-service';

@Pipe({
  name: 'tableDataPipe',
  standalone: false
})
export class TableDataPipe implements PipeTransform {

  constructor(
    private dlService: DynamicListService,
    private personService: PersonService,
    private companyService: CompanyService,
    private lawFirmService: LawFirmService,
    private languageService: LanguageService,
    private numberFormatConfig: NumberFormatConfigService
  ) { }

  transform(value: any, element: any, column: DisplayColumn, pipes?: string[]): Observable<string> {
    
    // Handle case when no pipes are provided
    if (!pipes || pipes.length === 0) {
      return this.handleDefaultTransform(value, column);
    }

    // Process each pipe
    for (const pipe of pipes) {
      const result = this.processPipe(pipe.toLowerCase(), value, element, column);
      if (result) {
        return result;
      }
    }

    return of(value?.toString() ?? '');
  }

  private handleDefaultTransform(value: any, column: DisplayColumn): Observable<string> {
    // if (typeof value === 'number' && !isNaN(value)) {
    //   const decimals = column.decimals ?? this.numberFormatConfig.getConfig().defaultDecimals;
    //   return of(this.formatNumberWithSeparator(value, decimals));
    // }
    return of(value?.toString() ?? '');
  }

  private processPipe(pipe: string, value: any, element: any, column: DisplayColumn): Observable<string> | null {
    const pipeHandlers: { [key: string]: () => Observable<string> } = {
      // Status pipes
      'common-status': () => this.handleCommonStatus(value),
      'company-contract-status': () => this.handleCompanyContractStatus(value),
      'company-license-status': () => this.handleCompanyLicenseStatus(value),

      // Boolean pipes
      'private-person': () => this.handlePrivateStatus(value),
      'private-company': () => this.handlePrivateStatus(value),
      'private': () => this.handlePrivateStatus(value),
      'signatory-active': () => this.handleActiveStatus(value),
      'capital-active': () => this.handleActiveStatus(value),
      'active': () => this.handleActiveStatus(value),
      'company-shareholder-status': () => this.handleActiveStatus(value),
      'person-document-primary': () => this.handlePrimaryStatus(value),
      'person-in-charge-primary': () => this.handlePrimaryStatus(value),
      'primary': () => this.handlePrimaryStatus(value),

      // Date pipes
      'date-time': () => this.handleDateTime(value),
      'date': () => this.handleDate(value),

      // Number pipes
      'number': () => this.handleNumber(value, column),
      'percentage': () => this.handlePercentage(value, column),
      'currency': () => this.handleCurrency(value, element, column),
      'number-separator': () => this.handleNumberSeparator(value),

      // Dynamic list pipes
      'company-activity': () => this.handleDynamicList(value, environment.rootDynamicLists.companyActivity),
      'document-nationality': () => this.handleDynamicList(value, environment.rootDynamicLists.country),
      'country': () => this.handleDynamicList(value, environment.rootDynamicLists.country),
      'countries': () => this.handleListDynamicList(value, environment.rootDynamicLists.country),
      'company-classification': () => this.handleDynamicList(value, environment.rootDynamicLists.companyClass),
      'original-document-type': () => this.handleDynamicList(value, environment.rootDynamicLists.originalDocumentTypes),
      'original-document-action-type': () => this.handleDynamicList(value, environment.rootDynamicLists.originalDocumentActionTypes),
      'property-type': () => this.handleDynamicList(value, environment.rootDynamicLists.propertyType),
      'property-type-of-title': () => this.handleDynamicList(value, environment.rootDynamicLists.propertyTypeOfTitle),
      'property-owner-relation': () => this.handleDynamicList(value, environment.rootDynamicLists.propertyOwnerRelation),
      'staff-level': () => this.handleDynamicList(value, environment.rootDynamicLists.lawFirmsCounselLevels),
      'property-document-type': () => this.handleDynamicList(value, environment.rootDynamicLists.propertyDocumentType),
      'other-document-type': () => this.handleDynamicList(value, environment.rootDynamicLists.otherDocumentType),
      'designation': () => this.handleDynamicList(value, environment.rootDynamicLists.designation),
      'company-contract-type': () => this.handleDynamicList(value, environment.rootDynamicLists.companyContractType),
      'transaction-type': () => this.handleDynamicList(value, environment.rootDynamicLists.transactionTypes),
      'board-position': () => this.handleDynamicList(value, environment.rootDynamicLists.boardPosition),
      'rule': () => this.handleDynamicList(value, environment.rootDynamicLists.rule),

      // Special pipes
      'designations': () => this.handleDesignations(value),
      'dl-by-comparekey': () => this.handleDynamicListByCompareKey(value, element, column),
      'person': () => this.handlePerson(value),
      'register': () => this.handleRegister(value, element, column),
      'law-firm': () => this.handleLawFirm(value),
      'register-type': () => this.handleRegisterType(value),
      'expired-before': () => this.handleExpiredBefore(value),
      'yes-no': () => this.handleYesNo(value),

    };

    const handler = pipeHandlers[pipe];
    return handler ? handler() : null;
  }




  private handleCommonStatus(value: any): Observable<string> {
    const getLabel = this.languageService.getLabel.bind(this.languageService);
    const statusMap: { [key: number]: string } = {
      [CommonStatus.New]: getLabel('COMMON.NEW') ?? 'New',
      [CommonStatus.Active]: getLabel('COMMON.ACTIVE') ?? 'Active',
      [CommonStatus.Inactive]: getLabel('COMMON.INACTIVE') ?? 'Inactive'
    };
    return of(statusMap[value] ?? value?.toString() ?? '');
  }

  private handleCompanyContractStatus(value: any): Observable<string> {
    const getLabel = this.languageService.getLabel.bind(this.languageService);
    const statusMap: { [key: number]: string } = {
      [CompanyContractStatus.Expired]: getLabel('COMMON.EXPIRED') ?? 'Expired',
      [CompanyContractStatus.Active]: getLabel('COMMON.ACTIVE') ?? 'Active',
      [CompanyContractStatus.Amended]: getLabel('COMMON.AMENDED') ?? 'Amended'
    };
    return of(statusMap[value] ?? value?.toString() ?? '');
  }

  private handleCompanyLicenseStatus(value: any): Observable<string> {
    const getLabel = this.languageService.getLabel.bind(this.languageService);
    const statusMap: { [key: number]: string } = {
      [CompanyLicenseStatus.Expired]: getLabel('COMMON.EXPIRED') ?? 'Expired',
      [CompanyLicenseStatus.Active]: getLabel('COMMON.ACTIVE') ?? 'Active'
    };
    return of(statusMap[value] ?? value?.toString() ?? '');
  }

  // Boolean handlers
  private handlePrivateStatus(value: any): Observable<string> {
    const getLabel = this.languageService.getLabel.bind(this.languageService);
    return of(value === true ? getLabel('COMPANY.PRIVATE') : getLabel('COMPANY.PUBLIC'));
  }

  private handleYesNo(value: any): Observable<string> {
    const getLabel = this.languageService.getLabel.bind(this.languageService);
    return of(value === true ? getLabel('COMMON.YES') : getLabel('COMMON.NO'));
  }

  private handleActiveStatus(value: any): Observable<string> {
    const getLabel = this.languageService.getLabel.bind(this.languageService);
    return of(value === true ? getLabel('COMMON.ACTIVE') ?? 'Active' : getLabel('COMMON.INACTIVE') ?? 'Inactive');
  }

  private handlePrimaryStatus(value: any): Observable<string> {
    const getLabel = this.languageService.getLabel.bind(this.languageService);
    return of(value === true ? getLabel('COMMON.PRIMARY') ?? 'Primary' : '');
  }

  // Date handlers
  private handleDateTime(value: any): Observable<string> {
    const dateTime = value instanceof Date ? value : new Date(value);
    return of(isNaN(dateTime.getTime()) ? '' : this.formatDateTime(dateTime));
  }

  private handleDate(value: any): Observable<string> {
    if (!value) return of('');
    const date = value instanceof Date ? value : new Date(value);
    return of(isNaN(date.getTime()) ? '' : this.formatDate(date));
  }

  // Number handlers
  private handleNumber(value: any, column: DisplayColumn): Observable<string> {
    if (value === null || value === undefined) return of('');
    
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(numValue)) return of(value?.toString() ?? '');
    
    const decimals = column.decimals ?? this.numberFormatConfig.getConfig().defaultDecimals;
    return of(this.formatNumberWithSeparator(numValue, decimals));
  }

  private handlePercentage(value: any, column: DisplayColumn): Observable<string> {
    const decimals = column.decimals ?? this.numberFormatConfig.getConfig().percentageDecimals;
    const percentValue = this.formatNumberWithSeparator(value, decimals);
    return of(percentValue + '%');
  }

  private handleCurrency(value: any, element: any, column: DisplayColumn): Observable<string> {
    const decimals = column.decimals ?? this.numberFormatConfig.getConfig().currencyDecimals;
    
    if (column.compareKey) {
      return this.dlService.GetAllByParentId(environment.rootDynamicLists.currencies).pipe(
        map(list => {
          const found = list.find(x => x.id == element[column.compareKey!]);
          const formattedValue = this.formatNumberWithSeparator(value, decimals);
          return found ? `${formattedValue} ${found.name}` : `${formattedValue}`;
        })
      );
    }
    return of(this.formatNumberWithSeparator(value, decimals));
  }

  private handleNumberSeparator(value: any): Observable<string> {
    if (value === null || value === undefined || value === '') return of('');
    
    const strValue = value.toString();
    const separated = strValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return of(separated);
  }

  // Dynamic list handlers
  private handleDynamicList(value: any, parentId: number): Observable<string> {
    return this.dlService.GetAllByParentId(parentId).pipe(
      map(list => {
        const found = list.find(x => x.id == value);
        return found ? found.name : '';
      })
    );
  }
  private handleListDynamicList(value: any, parentId: number): Observable<string> {
    return this.dlService.GetAllByParentId(parentId).pipe(
      map(list => {
        let names: string[] = [];
        if (Array.isArray(value)) {
          names = value.map((val: any) => {
            const found = list.find(x => x.id == val);
            return found ? found.name : '';
          });
        }
        return names.join(', ');
      })
    );
  }

  private handleDynamicListByCompareKey(value: any, element: any, column: DisplayColumn): Observable<string> {
    if (!column.compareKey) return of(value?.toString() ?? '');
    
    return this.dlService.GetAllByParentId(element[column.compareKey]).pipe(
      map(list => {
        const found = list.find(x => x.id == value);
        return found ? found.name : '';
      })
    );
  }

  private handleDesignations(value: any): Observable<string> {
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
          .filter(name => name);
        return names.join(', ');
      })
    );
  }

  // Entity handlers
  private handlePerson(value: any): Observable<string> {
    return this.personService.getAllPersons({ pageSize: 100, page: 1 }).pipe(
      map(list => {
        const found = list.find(x => x.id == value);
        return found?.personEnglishName || '';
      })
    );
  }

  private handleLawFirm(value: any): Observable<string> {
    return this.lawFirmService.getAllLawFirms({ pageSize: 100, page: 1 }).pipe(
      map(list => {
        const found = list.find(x => x.id == value);
        return found?.englishName || 'N/A';
      })
    );
  }

  private handleRegister(value: any, element: any, column: DisplayColumn): Observable<string> {
    const entityType = element[column.compareKey!];
    
    switch (entityType) {
      case EntityIDc.Person:
        return this.personService.getAllPersons({ pageSize: 100, page: 1 }).pipe(
          map(list => {
            const found = list.find(x => x.id == value);
            return found?.personEnglishName || '';
          })
        );
      
      case EntityIDc.Company:
        return this.companyService.getAllCompanies({ pageSize: 100, page: 1 }).pipe(
          map(list => {
            const found = list.find(x => x.id == value);
            return found?.companyEnglishName || 'N/A';
          })
        );
      
      case EntityIDc.LawFirm:
        return this.lawFirmService.getAllLawFirms({ pageSize: 100, page: 1 }).pipe(
          map(list => {
            const found = list.find(x => x.id == value);
            return found?.englishName || 'N/A';
          })
        );
      
      default:
        return of('');
    }
  }

  private handleRegisterType(value: any): Observable<string> {
    const getLabel = this.languageService.getLabel.bind(this.languageService);
    
    const typeMap: { [key: string]: string } = {
      [EntityIDc.Person]: getLabel('COMMON.PERSON') ?? 'Person',
      [EntityIDc.Company]: getLabel('COMMON.COMPANY') ?? 'Company',
      [EntityIDc.LawFirm]: getLabel('LAW_FIRM.LAW_FIRM') ?? 'Law Firm',
      [EntityIDc.Transactions]: getLabel('TRANSACTION.TRANSACTION') ?? 'Transaction',
      [EntityIDc.FPCs]: getLabel('FPC.FPC') ?? 'FPC',
      [EntityIDc.DocumentTracking]: getLabel('DOCUMENT_TRACKING.DOCUMENT_TRACKING') ?? 'Document Tracking',
      [EntityIDc.Properties]: getLabel('PROPERTY.REAL_ESTATE') ?? 'Real Estate',
      [EntityIDc.PersonIdDetail]: getLabel('PERSON.PERSON_ID_DOCUMENTS'),
      [EntityIDc.CompaniesChamberOfCommerces]: getLabel('COMPANY.CHAMBER_OF_COMMERCE'),
      [EntityIDc.CompaniesLicenseIDC]: getLabel('COMPANY.LICENSES_AND_REGISTERS'),
      [EntityIDc.CompaniesContracts]: getLabel('COMPANY.CONTRACT'),
      [EntityIDc.PropertyDocuments]: getLabel('PROPERTY.PROPERTY_DOCUMENTS') ?? 'Real Estate'
    };
    
    return of(typeMap[value] ?? value?.toString() ?? '');
  }

  private handleExpiredBefore(value: any): Observable<string> {
    const expiredMap: { [key: number]: string } = {
      [-15]: 'Expired Before 15 days',
      [-30]: 'Expired Before 30 days',
      [-45]: 'Expired Before 45 days',
      [15]: 'Expired within 15 days',
      [30]: 'Expired within 30 days',
      [45]: 'Expired within 45 days'
    };
    
    return of(expiredMap[value] ?? value);
  }

  // Formatting utilities
  private formatDateTime(date: Date): string {
    return date.toLocaleString();
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

    const numericValue = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(numericValue)) {
      return value?.toString() ?? '';
    }

    const config = this.numberFormatConfig.getConfig();
    const stringValue = value.toString();
    const hasDecimals = stringValue.includes('.');
    const actualDecimals = hasDecimals ? (stringValue.split('.')[1] || '').length : 0;

    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: hasDecimals ? Math.min(decimals, actualDecimals) : 0,
      maximumFractionDigits: decimals,
      useGrouping: true
    });

    let formatted = formatter.format(numericValue);

    if (config.thousandSeparator !== ',') {
      formatted = formatted.replace(/,/g, config.thousandSeparator);
    }
    if (config.decimalSeparator !== '.') {
      formatted = formatted.replace(/\./g, config.decimalSeparator);
    }

    return formatted;
  }
}

