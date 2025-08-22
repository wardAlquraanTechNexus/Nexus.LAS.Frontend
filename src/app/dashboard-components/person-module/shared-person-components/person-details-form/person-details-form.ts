import { ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Person } from '../../../../models/persons/person';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PersonService } from '../../../../services/person-services/person-service';
import { Router } from '@angular/router';
import { environment } from '../../../../../environment/environment';
import { ErrorHandlerService } from '../../../../services/error-handler.service';

@Component({
  selector: 'app-person-details-form',
  standalone: false,
  templateUrl: './person-details-form.html',
  styleUrl: './person-details-form.scss'
})
export class PersonDetailsForm implements OnInit {
  @Input() isSaving = false;
  person: Person | null = null;
  personalDetailsForm!: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<PersonDetailsForm>,
    private cdRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private personService: PersonService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: Person | null,
    private errorHandler: ErrorHandlerService) {
    this.person = data;
  }

  ngOnInit(): void {



    this.personalDetailsForm = this.fb.group({
      id: [this.person?.id],
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
      this.isSaving = true;
      const person = { ...this.personalDetailsForm.getRawValue() };
      if (this.person) {
        this.personService.updatePerson(person).subscribe({
          next: (res => {
            this.isSaving = false;
            this.errorHandler.showSuccess('Updated Successfully');
            this.dialogRef.close({ ...this.person, ...person });
          }), error: (err => {
            this.isSaving = false;
            this.cdRef.markForCheck();
          })
        })
      } else {
        this.personService.createPerson(person).subscribe({
          next: (res => {
            this.isSaving = false;
            this.errorHandler.showSuccess('Created Successfully');
            this.dialogRef.close({ ...this.person, ...person });
            this.router.navigate([`/${environment.routes.Persons}/view`], { queryParams: { id: res } });
          }), error: (err => {
            this.isSaving = false;
            this.cdRef.markForCheck();
          })
        })
      }
    } else {
      this.personalDetailsForm.markAllAsTouched();
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
