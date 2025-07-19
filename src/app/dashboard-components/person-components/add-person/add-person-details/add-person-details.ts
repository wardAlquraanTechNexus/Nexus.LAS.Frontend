import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonService } from '../../../../services/person-service';
import { CreatePersonCommand } from '../../../../models/persons/create-person';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuccessSnackbar } from '../../../../components/snackbars/success-snackbar/success-snackbar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-person-details',
  standalone: false,
  templateUrl: './add-person-details.html',
  styleUrl: './add-person-details.scss'
})
export class AddPersonDetails implements OnInit {

  personalDetailsForm!: FormGroup;

  constructor(
    private cdRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private personService: PersonService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.personalDetailsForm = this.fb.group({
      firstNameEn: ['', Validators.required],
      middleNameEn: [''],
      lastNameEn: ['', Validators.required],
      firstNameAr: ['', Validators.required],
      middleNameAr: [''],
      lastNameAr: ['', Validators.required],
      shortName: ['', Validators.required]
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

  isSaving = false;
  onSave(): void {
    this.isSaving =  true;
    if (this.personalDetailsForm.valid) {
      let createPersonCommand: CreatePersonCommand = this.personalDetailsForm.getRawValue();
      this.personService.createPerson(createPersonCommand).subscribe({
        next: (res => {
          this.snackBar.openFromComponent(SuccessSnackbar, {
            duration: 4000,
            data: "Person Created Successfully",
          });
          this.isSaving = false;
          this.cdRef.detectChanges();

        }),
        error: (err=>{
          this.isSaving = false;
          this.cdRef.detectChanges();

        })
      }
      )
    } else {
      this.isSaving = false;
      this.cdRef.detectChanges()
      this.personalDetailsForm.markAllAsTouched();
    }
  }
}
