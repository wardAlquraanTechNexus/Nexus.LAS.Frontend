import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { PersonOtherDocumentDTO } from '../../../../models/person-other-document/person-other-document-dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PersonOtherDocumentService } from '../../../../services/person-other-document-service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuccessSnackbar } from '../../../../components/snackbars/success-snackbar/success-snackbar';

@Component({
  selector: 'app-edit-person-other-document-form',
  standalone: false,
  templateUrl: './edit-person-other-document-form.html',
  styleUrl: './edit-person-other-document-form.scss'
})
export class EditPersonOtherDocumentForm implements OnInit {
  personOtherDocumentDto!: PersonOtherDocumentDTO;
  isLoading = false;
  formGroup!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { personOtherDocument: PersonOtherDocumentDTO },
    private dialogRef: MatDialogRef<EditPersonOtherDocumentForm>,
    private service: PersonOtherDocumentService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    protected snackBar: MatSnackBar,

  ) {
    this.personOtherDocumentDto = data.personOtherDocument;
    this.formGroup = this.fb.group({
      documentType: [this.personOtherDocumentDto?.documentType, Validators.required],
      documentDescription: [this.personOtherDocumentDto?.documentDescription, Validators.required],
    });
  }
  ngOnInit(): void {

  }


  save() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    Object.assign(this.personOtherDocumentDto, this.formGroup.value);
    this.isLoading = true;

    this.service.updateByDto(this.personOtherDocumentDto).subscribe({
      next: (res => {
        this.isLoading = false;
        this.snackBar.openFromComponent(SuccessSnackbar, {
          duration: 4000,
          data: "Registered Successfully"
        });
        this.dialogRef.close(this.personOtherDocumentDto);
      }),
      error: (res => {
        setTimeout(() => {
          this.isLoading = false;
          this.cdr.detectChanges();

        }, 100);
      })
    });
  }

  cancel() {
    this.dialogRef.close();
  }
}
