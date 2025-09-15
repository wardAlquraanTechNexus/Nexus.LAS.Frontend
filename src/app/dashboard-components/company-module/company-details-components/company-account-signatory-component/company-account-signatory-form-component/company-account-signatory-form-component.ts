import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { BaseFormComponent } from '../../../../base-components/base-form-component/base-form-component';
import { CompanyAccountSignatoryDto } from '../../../../../models/company-models/company-account-signatory/dtos/company-account-signatory-dto';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DynamicListService } from '../../../../../services/dynamic-list-service';
import { ErrorHandlerService } from '../../../../../services/error-handler.service';
import { GetPersonsDTO } from '../../../../../models/person-models/get-persons/get-person-dto';
import { map, Observable, tap } from 'rxjs';
import { PersonService } from '../../../../../services/person-services/person-service';
import { environment } from '../../../../../../environment/environment';
import { DynamicList } from '../../../../../models/dynamic-list/dynamic-list';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DATE_FORMAT_PROVIDERS } from '../../../../../shared/date-format.config';
import moment from 'moment';
import { LanguageService } from '../../../../../services/language-service';

@Component({
  selector: 'app-company-account-signatory-form-component',
  standalone: false,
  templateUrl: './company-account-signatory-form-component.html',
  styleUrl: './company-account-signatory-form-component.scss',
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
    ...DATE_FORMAT_PROVIDERS,
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: false } }
  ]
})
export class CompanyAccountSignatoryFormComponent extends BaseFormComponent {
  loadPersonssFn!: (search: string) => Observable<GetPersonsDTO[]>;
  loadRulesFn!: (search: string) => Observable<DynamicList[]>;

  @Input() element!: CompanyAccountSignatoryDto;

  constructor(
    protected override fb: FormBuilder,
    protected override cdr: ChangeDetectorRef,
    protected override sanitizer: DomSanitizer,
    protected override errorHandler: ErrorHandlerService,
    private dlService: DynamicListService,
    private personService: PersonService,
    override langService: LanguageService,

  ) {
    super(fb, cdr, sanitizer, errorHandler, langService);
  }

  override ngOnInit(): void {
    // Convert date strings to local dates before setup
    if (this.element) {
      console.log('Original element data:', this.element);

      // Helper function to convert date strings to local Date objects
      const convertToLocalDate = (dateValue: any, fieldName: string): Date | null => {
        if (!dateValue) return null;

        // If already a Date object, ensure it's in local time
        if (dateValue instanceof Date) {
          return dateValue;
        }

        // Parse the date string and force it to be treated as local time
        // This prevents timezone offset issues
        let momentDate = moment(dateValue);

        // If the date is in ISO format with timezone, parse as UTC and convert to local
        if (typeof dateValue === 'string' && dateValue.includes('T')) {
          momentDate = moment.utc(dateValue).local();
        } else {
          // For date-only strings, parse as local date
          momentDate = moment(dateValue, ['YYYY-MM-DD', 'DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DDTHH:mm:ss']);
        }

        if (momentDate.isValid()) {
          // Create a new date at noon local time to avoid DST issues
          const year = momentDate.year();
          const month = momentDate.month();
          const day = momentDate.date();
          const localDate = new Date(year, month, day, 12, 0, 0); // Set to noon to avoid DST issues

          console.log(`Converted ${fieldName}:`, dateValue, '->', localDate);
          return localDate;
        }

        console.log(`Failed to convert ${fieldName}:`, dateValue);
        return null;
      };

      // Convert dates
      const convertedAccountDate = convertToLocalDate(this.element.accountSignatoryDate, 'accountSignatoryDate');
      if (convertedAccountDate) {
        (this.element as any).accountSignatoryDate = convertedAccountDate;
      }

      const convertedCessationDate = convertToLocalDate(this.element.cessationDate, 'cessationDate');
      if (convertedCessationDate) {
        (this.element as any).cessationDate = convertedCessationDate;
      }
    }

    this.setup(this.element);
    super.ngOnInit();

    this.loadPersonssFn = (search: string) => this.loadPersons(search);
    this.loadRulesFn = (search: string) => this.dlService.GetAllByParentId(environment.rootDynamicLists.rule, search)


  }

  loadPersons(search: string) {
    return this.personService.getAllPersons({
      searchBy: search,
      page: 0,
      pageSize: 100
    }).pipe(
      map(res => res.filter(p =>
        p.personEnglishName && p.personEnglishName.toLowerCase().includes(search.toLowerCase())
      ))
    );
  }

  // Override save to handle date conversion
  override save(closeAfterSave: boolean = false): void {
    // Get form values
    const formValue = this.formGroup.getRawValue();

    // Convert dates to ensure they're saved correctly
    if (formValue.accountSignatoryDate) {
      const accountSignatoryMoment = moment(formValue.accountSignatoryDate);
      if (accountSignatoryMoment.isValid()) {
        // Format as local date string to avoid timezone issues
        formValue.accountSignatoryDate = accountSignatoryMoment.format('YYYY-MM-DD');
        console.log('Saving accountSignatoryDate as:', formValue.accountSignatoryDate);
      }
    }

    if (formValue.cessationDate) {
      const cessationMoment = moment(formValue.cessationDate);
      if (cessationMoment.isValid()) {
        // Format as local date string to avoid timezone issues
        formValue.cessationDate = cessationMoment.format('YYYY-MM-DD');
        console.log('Saving cessationDate as:', formValue.cessationDate);
      }
    }

    // Update form with converted values
    this.formGroup.patchValue(formValue);

    // Call parent save
    super.save(closeAfterSave);
  }
}
