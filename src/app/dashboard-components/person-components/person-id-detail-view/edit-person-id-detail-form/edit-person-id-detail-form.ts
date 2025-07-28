import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PersonIdDetailDto } from '../../../../models/person-id-details/person-id-details-dto';
import { PersonIdDetailService } from '../../../../services/person-id-detail-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuccessSnackbar } from '../../../../components/snackbars/success-snackbar/success-snackbar';

@Component({
  selector: 'app-edit-person-id-detail-form',
  standalone: false,
  templateUrl: './edit-person-id-detail-form.html',
  styleUrl: './edit-person-id-detail-form.scss'
})
export class EditPersonIdDetailForm implements OnInit {
  personIdDetail!: PersonIdDetailDto;
  isLoading = false;
  formGroup!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { personIdDetail: PersonIdDetailDto },
    private dialogRef: MatDialogRef<EditPersonIdDetailForm>,
    private service: PersonIdDetailService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    protected snackBar: MatSnackBar,

  ) {
    this.personIdDetail = data.personIdDetail;
    this.formGroup = this.fb.group({
      isPrimary: [this.personIdDetail?.isPrimary],
      type: [this.personIdDetail?.type, Validators.required],
      nationality: [this.personIdDetail?.nationality, Validators.required],
      placeOfIssue: [this.personIdDetail?.placeOfIssue, Validators.required],
      idNumber: [this.personIdDetail?.idNumber, [Validators.required, Validators.minLength(4)]],
      idIssueDate: [this.personIdDetail?.idIssueDate, Validators.required],
      expiryDate: [this.personIdDetail?.expiryDate],
      activeReminder: [this.personIdDetail?.activeReminder],
    });
  }
  ngOnInit(): void {

  }

  save() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    Object.assign(this.personIdDetail, this.formGroup.value);
    this.isLoading = true;

    this.service.updateByDto(this.personIdDetail).subscribe({
      next: (res => {
        this.isLoading = false;
        this.snackBar.openFromComponent(SuccessSnackbar, {
          data: "Updated Successfully"
        })
        this.dialogRef.close(this.personIdDetail);
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
