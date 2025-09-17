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
import { DATE_FORMAT_PROVIDERS } from '../../../../../shared/date-format.config';
import { parse, isValid, format, parseISO } from 'date-fns';
import { LanguageService } from '../../../../../services/language-service';

@Component({
  selector: 'app-company-account-signatory-form-component',
  standalone: false,
  templateUrl: './company-account-signatory-form-component.html',
  styleUrl: './company-account-signatory-form-component.scss',
  providers: [
    ...DATE_FORMAT_PROVIDERS
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
        let parsedDate: Date | null = null;

        // If the date is in ISO format with timezone, parse as ISO
        if (typeof dateValue === 'string' && dateValue.includes('T')) {
          parsedDate = parseISO(dateValue);
        } else {
          // For date-only strings, try multiple formats
          const formats = ['yyyy-MM-dd', 'dd/MM/yyyy', 'MM/dd/yyyy', 'yyyy-MM-dd\'T\'HH:mm:ss'];
          for (const fmt of formats) {
            try {
              parsedDate = parse(dateValue, fmt, new Date());
              if (isValid(parsedDate)) break;
            } catch {
              // Continue to next format
            }
          }
        }

        if (parsedDate && isValid(parsedDate)) {
          // Create a new date at noon local time to avoid DST issues
          const year = parsedDate.getFullYear();
          const month = parsedDate.getMonth();
          const day = parsedDate.getDate();
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
      let parsedDate: Date | null = null;
      if (formValue.accountSignatoryDate instanceof Date) {
        parsedDate = formValue.accountSignatoryDate;
      } else {
        parsedDate = parseISO(formValue.accountSignatoryDate);
      }
      if (parsedDate && isValid(parsedDate)) {
        // Format as local date string to avoid timezone issues
        formValue.accountSignatoryDate = format(parsedDate, 'yyyy-MM-dd');
        console.log('Saving accountSignatoryDate as:', formValue.accountSignatoryDate);
      }
    }

    if (formValue.cessationDate) {
      let parsedDate: Date | null = null;
      if (formValue.cessationDate instanceof Date) {
        parsedDate = formValue.cessationDate;
      } else {
        parsedDate = parseISO(formValue.cessationDate);
      }
      if (parsedDate && isValid(parsedDate)) {
        // Format as local date string to avoid timezone issues
        formValue.cessationDate = format(parsedDate, 'yyyy-MM-dd');
        console.log('Saving cessationDate as:', formValue.cessationDate);
      }
    }

    // Update form with converted values
    this.formGroup.patchValue(formValue);

    // Call parent save
    super.save(closeAfterSave);
  }
}
