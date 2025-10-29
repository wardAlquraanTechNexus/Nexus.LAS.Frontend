import { Component, Input } from '@angular/core';
import { DATE_FORMAT_PROVIDERS } from '../../shared/date-format.config';
import { FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Labels } from '../../models/consts/labels';
import { LanguageCode } from '../../models/types/lang-type';
import { LanguageService } from '../../services/language-service';

@Component({
  selector: 'start-end-dates-input',
  standalone: false,
  templateUrl: './start-end-dates-input-component.html',
  styleUrl: './start-end-dates-input-component.scss',
  providers: [
    ...DATE_FORMAT_PROVIDERS
  ]
})
export class StartEndDatesInputComponent {

  @Input() formGroup!: FormGroup;
  @Input() startControlName!: string;
  @Input() endControlName!: string;
  @Input() startLabel!: string;
  @Input() endLabel!: string;
  @Input() isStartRequired: boolean = false;
  @Input() isEndRequired: boolean = false;
  @Input() startRequiredMsg!: string;
  @Input() endRequiredMsg!: string;

  get labels() {
    return Labels[this.currentLang as keyof typeof Labels];
  };
  currentLang: LanguageCode = 'en';

  constructor(protected langService: LanguageService) {}

  ngOnInit() {
    this.setupValidators();
    this.setupCrossDateValidation();
    this.setupLanguage();
  }

  private setupValidators() {
    if (this.isStartRequired) {
      const startCtrl = this.formGroup.get(this.startControlName);
      if (startCtrl) {
        startCtrl.setValidators([Validators.required]);
        startCtrl.updateValueAndValidity();
      }
    }

    if (this.isEndRequired) {
      const endCtrl = this.formGroup.get(this.endControlName);
      if (endCtrl) {
        endCtrl.setValidators([Validators.required]);
        endCtrl.updateValueAndValidity();
      }
    }
  }

  private setupCrossDateValidation() {
    const startControl = this.formGroup.get(this.startControlName);
    const endControl = this.formGroup.get(this.endControlName);

    if (startControl && endControl) {
      // Add cross-validation to the form group
      this.formGroup.setValidators(this.dateRangeValidator(this.startControlName, this.endControlName));

      // Listen for changes and revalidate
      startControl.valueChanges.subscribe(() => {
        if (endControl.value) {
          endControl.updateValueAndValidity({ emitEvent: false });
        }
      });

      endControl.valueChanges.subscribe(() => {
        if (startControl.value) {
          this.formGroup.updateValueAndValidity({ emitEvent: false });
        }
      });
    }
  }

  private setupLanguage() {
    if (!this.startRequiredMsg) {
      this.startRequiredMsg = this.labels.COMMON.START_DATE_REQUIRED;
    }

    if (!this.endRequiredMsg) {
      this.endRequiredMsg = this.labels.COMMON.END_DATE_REQUIRED;
    }

    this.langService.language$.subscribe(lang => {
      this.currentLang = lang;
    });
  }

  // Custom validator for date range
  private dateRangeValidator(startDateKey: string, endDateKey: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const startDate = formGroup.get(startDateKey)?.value;
      const endDate = formGroup.get(endDateKey)?.value;

      if (!startDate || !endDate) {
        return null; // Don't validate if either date is missing
      }

      const start = new Date(startDate);
      const end = new Date(endDate);

      // Reset time to compare only dates
      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);

      if (end < start) {
        // Set error on end date control
        const endControl = formGroup.get(endDateKey);
        if (endControl) {
          endControl.setErrors({ 
            ...endControl.errors, 
            endDateBeforeStart: true 
          });
        }
        return { dateRange: true };
      } else {
        // Clear the specific error if dates are valid
        const endControl = formGroup.get(endDateKey);
        if (endControl && endControl.errors?.['endDateBeforeStart']) {
          delete endControl.errors['endDateBeforeStart'];
          if (Object.keys(endControl.errors).length === 0) {
            endControl.setErrors(null);
          }
        }
      }

      return null;
    };
  }

  // Helper methods for template
  get startControl() {
    return this.formGroup.get(this.startControlName);
  }

  get endControl() {
    return this.formGroup.get(this.endControlName);
  }

  get hasStartError() {
    const control = this.startControl;
    return control?.invalid && (control?.dirty || control?.touched);
  }

  get hasEndError() {
    const control = this.endControl;
    return control?.invalid && (control?.dirty || control?.touched);
  }

  get startErrorMessage() {
    const control = this.startControl;
    if (control?.errors?.['required']) {
      return this.startRequiredMsg || this.labels.COMMON.START_DATE_REQUIRED;
    }
    return '';
  }

  get endErrorMessage() {
    const control = this.endControl;
    if (control?.errors?.['required']) {
      return this.endRequiredMsg || this.labels.COMMON.END_DATE_REQUIRED;
    }
    if (control?.errors?.['endDateBeforeStart']) {
      return this.labels.COMMON.END_DATE_BEFORE_START_DATE || 'End date cannot be before start date';
    }
    return '';
  }

  // Clear date methods
  clearStartDate(event: Event) {
    event.stopPropagation();
    this.startControl?.setValue(null);
    this.startControl?.markAsTouched();
  }

  clearEndDate(event: Event) {
    event.stopPropagation();
    this.endControl?.setValue(null);
    this.endControl?.markAsTouched();
  }
}
