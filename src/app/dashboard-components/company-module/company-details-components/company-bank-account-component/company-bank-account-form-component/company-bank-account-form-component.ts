import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { BaseFormComponent } from '../../../../base-components/base-form-component/base-form-component';
import { CompanyBankAccountDto } from '../../../../../models/company-models/company-bank-account/dtos/company-bank-account-dto';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../../../../environment/environment.prod';
import { DynamicListService } from '../../../../../services/dynamic-list-service';
import { ErrorHandlerService } from '../../../../../services/error-handler.service';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DATE_FORMAT_PROVIDERS } from '../../../../../shared/date-format.config';
import moment from 'moment';
import { LanguageService } from '../../../../../services/language-service';

@Component({
  selector: 'app-company-bank-account-form-component',
  standalone:false,
  templateUrl: './company-bank-account-form-component.html',
  styleUrl: './company-bank-account-form-component.scss',
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
    ...DATE_FORMAT_PROVIDERS,
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: false } }
  ]
})
export class CompanyBankAccountFormComponent extends BaseFormComponent
{
  @Input() element!: CompanyBankAccountDto;

  constructor(
    protected override fb: FormBuilder,
    protected override cdr: ChangeDetectorRef,
    protected override sanitizer: DomSanitizer,
    protected override errorHandler: ErrorHandlerService,
    private dlService: DynamicListService,
    override langService: LanguageService,
  ) {
    super(fb, cdr, sanitizer, errorHandler, langService);
  }

  override ngOnInit(): void {
    // Convert date strings to local dates before setup
    if (this.element) {
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

      // Convert bankAccountDate
      const convertedBankAccountDate = convertToLocalDate(this.element.bankAccountDate, 'bankAccountDate');
      if (convertedBankAccountDate) {
        (this.element as any).bankAccountDate = convertedBankAccountDate;
      }
    }

    this.setup(this.element);
    super.ngOnInit();


  }

  // Override save to handle date conversion
  override save(closeAfterSave: boolean = false): void {
    // Get form values
    const formValue = this.formGroup.getRawValue();

    // Convert bankAccountDate to ensure it's saved correctly
    if (formValue.bankAccountDate) {
      const bankAccountMoment = moment(formValue.bankAccountDate);
      if (bankAccountMoment.isValid()) {
        // Format as local date string to avoid timezone issues
        formValue.bankAccountDate = bankAccountMoment.format('YYYY-MM-DD');
        console.log('Saving bankAccountDate as:', formValue.bankAccountDate);
      }
    }

    // Update form with converted values
    this.formGroup.patchValue(formValue);

    // Call parent save
    super.save(closeAfterSave);
  }
}
