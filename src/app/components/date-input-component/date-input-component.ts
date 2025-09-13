import { Component, Input, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, ValidatorFn, ValidationErrors, Validators } from '@angular/forms';
import flatpickr from 'flatpickr';

@Component({
  standalone: false,
  selector: 'app-date-input',
  templateUrl: './date-input-component.html',
  styleUrls: ['./date-input-component.scss']
})
export class DateInputComponent implements OnInit, AfterViewInit {
  @Input() formGroup!: FormGroup;
  @Input() controlName!: string;
  @Input() label!: string;;
  @Input() isRequired: boolean = false;
  @ViewChild('input') input!: ElementRef;

  displayValue: string = '';

  ngOnInit() {

    if (this.isRequired) {
      this.formGroup.get(this.controlName)?.addValidators((Validators.required));
    }
    this.updateDisplayValue();
  }

  ngAfterViewInit() {
    flatpickr(this.input.nativeElement, {
      dateFormat: 'd/m/Y',
      clickOpens: false,
      allowInput: true,
      onChange: (dates) => {
        if (dates.length) {
          this.formGroup.get(this.controlName)?.setValue(dates[0]);
          this.updateDisplayValue();
        }
      }
    });
  }

  onInputChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    const control = this.formGroup.get(this.controlName);
    const date = this.parseDate(value); // parse string to Date
    control?.setValue(date);
    this.updateDisplayValue();
  }


onCalendarClose() {
  const control = this.formGroup.get(this.controlName);
  if (!control) return;

  // Parse the current input value
  const value = this.input.nativeElement.value;
  const date = this.parseDate(value);
  
  // Set the parsed date (or null if invalid)
  control.setValue(date);

  // Update display and mark touched/dirty
  this.updateDisplayValue();
  
}

parseDate(value: string): Date | null {
  const regex = /^([0-2]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
  if (!regex.test(value)) return null;

  const [day, month, year] = value.split('/').map(Number);
  const date = new Date(year, month - 1, day);

  // Validate real date
  return (date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day)
    ? date
    : null;
}

  updateDisplayValue() {
    const val = this.formGroup.get(this.controlName)?.value;
    if (val instanceof Date && !isNaN(val.getTime())) {
      const day = val.getDate().toString().padStart(2, '0');
      const month = (val.getMonth() + 1).toString().padStart(2, '0');
      const year = val.getFullYear();
      this.displayValue = `${day}/${month}/${year}`;
    } else {
      this.displayValue = '';
    }
  }

  dateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const val = control.value;
      if (!val) return null;
      if (val instanceof Date && !isNaN(val.getTime())) return null;
      return { invalidDate: true };
    };
  }
}
