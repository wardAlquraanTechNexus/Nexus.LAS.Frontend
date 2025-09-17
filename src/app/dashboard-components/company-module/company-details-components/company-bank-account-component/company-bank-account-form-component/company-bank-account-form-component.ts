import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { BaseFormComponent } from '../../../../base-components/base-form-component/base-form-component';
import { CompanyBankAccountDto } from '../../../../../models/company-models/company-bank-account/dtos/company-bank-account-dto';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../../../../environment/environment.prod';
import { DynamicListService } from '../../../../../services/dynamic-list-service';
import { ErrorHandlerService } from '../../../../../services/error-handler.service';
import { DATE_FORMAT_PROVIDERS } from '../../../../../shared/date-format.config';
import { parse, isValid, format, parseISO } from 'date-fns';
import { LanguageService } from '../../../../../services/language-service';

@Component({
  selector: 'app-company-bank-account-form-component',
  standalone:false,
  templateUrl: './company-bank-account-form-component.html',
  styleUrl: './company-bank-account-form-component.scss',
  providers: [
    ...DATE_FORMAT_PROVIDERS
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
      let parsedDate: Date | null = null;
      if (formValue.bankAccountDate instanceof Date) {
        parsedDate = formValue.bankAccountDate;
      } else {
        parsedDate = parseISO(formValue.bankAccountDate);
      }
      if (parsedDate && isValid(parsedDate)) {
        // Format as local date string to avoid timezone issues
        formValue.bankAccountDate = format(parsedDate, 'yyyy-MM-dd');
        console.log('Saving bankAccountDate as:', formValue.bankAccountDate);
      }
    }

    // Update form with converted values
    this.formGroup.patchValue(formValue);

    // Call parent save
    super.save(closeAfterSave);
  }
}
