import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Person } from '../../../../models/persons/person';

@Component({
  selector: 'app-person-details-form',
  standalone: false,
  templateUrl: './person-details-form.html',
  styleUrl: './person-details-form.scss'
})
export class PersonDetailsForm implements OnInit {
  @Input() person: Person | null = null;
  @Input() isSaving = false;
  personalDetailsForm!: FormGroup;
  @Output() saveEmitter = new EventEmitter<any>;
  constructor(
    private cdRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {



    this.personalDetailsForm = this.fb.group({
      personEnglishName: [this.person?.personEnglishName, [Validators.required]],
      personArabicName: [this.person?.personArabicName, Validators.required],
      personShortName: [this.person?.personShortName, [Validators.required, this.noWhitespaceValidator]],
      personStatus: [this.person?.personStatus],
      private: [this.person?.private],

    });
  }

  noWhitespaceValidator(control: AbstractControl): ValidationErrors | null {

    const isWhitespace = /\s/.test(control.value);
    return isWhitespace ? { whitespace: true } : null;
  }
  imagePreview: string | ArrayBuffer | null = null;

  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.imagePreview = reader.result;
        this.cdRef.detectChanges();
      };

      reader.readAsDataURL(file);
    }
  }

  onSave(): void {
    if (this.personalDetailsForm.valid) {
      const person = { ...this.personalDetailsForm.getRawValue() };
      this.saveEmitter.emit(person);
    } else {
      this.personalDetailsForm.markAllAsTouched();
    }
  }

}
