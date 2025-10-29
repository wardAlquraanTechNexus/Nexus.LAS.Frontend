import { Component, Inject } from '@angular/core';
import { BaseDialogComponent } from '../../../../base-components/base-dialog-component/base-dialog-component';
import { PersonPhoneService } from '../../../../../services/person-services/person-phone-service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PersonPhone } from '../../../../../models/person-models/person-phone/person-phone';

@Component({
  selector: 'app-person-phone-dialog-component',
  standalone:false,
  templateUrl: './person-phone-dialog-component.html',
  styleUrl: './person-phone-dialog-component.scss'
})
export class PersonPhoneDialogComponent extends BaseDialogComponent {
  showLoading = false;
  personPhone!: PersonPhone;
  isInsert = true;
  constructor(
    protected override dialogRef: MatDialogRef<PersonPhoneDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public override data: any,
    private service: PersonPhoneService,
  ) {
    super(dialogRef, data)
  }

  override ngOnInit(): void {
    this.personPhone = this.data;
    this.isInsert = this.personPhone.id ? false : true;
  }

  onSave(object: any) {
    this.showLoading = true;
    if (this.isInsert) {
      this.service.create(object.element).subscribe(
        {
          next:(res=>{
            this.dialogRef.close(object.element);
            this.showLoading = false;
          }),
          error:(err=>{
            this.showLoading = false;
          })
      })
    }
    else  {
      this.service.update(object.element).subscribe({
        next: (res => {
          this.dialogRef.close(object.element);
          this.showLoading = false;
        }),
        error: (err => {
          this.showLoading = false;
        })
      })
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
