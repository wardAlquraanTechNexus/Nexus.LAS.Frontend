import { ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Person } from '../../../../models/persons/person';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PersonService } from '../../../../services/person-service';
import { SuccessSnackbar } from '../../../../components/snackbars/success-snackbar/success-snackbar';

@Component({
  selector: 'app-person-details-form',
  standalone: false,
  templateUrl: './person-details-form.html',
  styleUrl: './person-details-form.scss'
})
export class PersonDetailsForm implements OnInit {
  @Input() isSaving = false;
  person:Person | null = null;
  personalDetailsForm!: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<PersonDetailsForm>,
    private cdRef: ChangeDetectorRef,
    private fb: FormBuilder,
    private personService:PersonService,
    @Inject(MAT_DIALOG_DATA) public data: Person | null,
    private snackBar: MatSnackBar) {
      this.person = data;
  }

  ngOnInit(): void {



    this.personalDetailsForm = this.fb.group({
      id:[this.person?.id],
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
      if(this.person){
        this.personService.updatePerson(person).subscribe({
          next:(res=>{
            this.isSaving = false;
            this.snackBar.openFromComponent(SuccessSnackbar,{
              data: "Updated Successfully",
              duration: 1000
            });
            this.dialogRef.close({ ...this.person, ...person });
          })
        })
      }else{
        this.personService.createPerson(person).subscribe({
          next:(res=>{
            this.isSaving = false;
            this.snackBar.openFromComponent(SuccessSnackbar,{
              data: "Updated Successfully"
            });
            this.dialogRef.close({ ...this.person, ...person });
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
