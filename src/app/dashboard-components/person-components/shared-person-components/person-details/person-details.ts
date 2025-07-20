import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Person } from '../../../../models/persons/person';

@Component({
  selector: 'app-person-details',
  standalone: false,
  templateUrl: './person-details.html',
  styleUrl: './person-details.scss'
})
export class PersonDetails implements OnInit {
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
    let firstNameEn: string | null = null;
    let middleNameEn: string | null = null;
    let lastNameEn: string | null = null;
    let firstNameAr: string | null = null;
    let middleNameAr: string | null = null;
    let lastNameAr: string | null = null;

    if (this.person?.personEnglishName) {
      const parts = this.person.personEnglishName.trim().split(/\s+/);
      if (parts.length === 2) {
        [firstNameEn, lastNameEn] = parts;
      } else if (parts.length >= 3) {
        [firstNameEn, middleNameEn, lastNameEn] = parts;
      }
    }

    if (this.person?.personArabicName) {
      const parts = this.person.personArabicName.trim().split(/\s+/);
      if (parts.length === 2) {
        [firstNameAr, lastNameAr] = parts;
      } else if (parts.length >= 3) {
        [firstNameAr, middleNameAr, lastNameAr] = parts;
      }
    }

    this.personalDetailsForm = this.fb.group({
      firstNameEn: [firstNameEn, Validators.required],
      middleNameEn: [middleNameEn],
      lastNameEn: [lastNameEn, Validators.required],
      firstNameAr: [firstNameAr, Validators.required],
      middleNameAr: [middleNameEn],
      lastNameAr: [lastNameEn, Validators.required],
      shortName: [this.person?.personShortName, Validators.required]
    });
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
      const person = {...this.personalDetailsForm.getRawValue()};
      this.saveEmitter.emit(person);
    } else {
      this.personalDetailsForm.markAllAsTouched();
    }
  }

}
