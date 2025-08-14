import { Component, Inject } from '@angular/core';
import { BaseDialogComponent } from '../../../../base-components/base-dialog-component/base-dialog-component';
import { PersonPhoneService } from '../../../../../services/person-phone-service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PersonPhone } from '../../../../../models/person-phone/person-phone';

@Component({
  selector: 'app-person-phone-dialouge',
  standalone:false,
  templateUrl: './person-phone-dialouge.html',
  styleUrl: './person-phone-dialouge.scss'
})
export class PersonPhoneDialouge extends BaseDialogComponent {
  showLoading = false;
  personPhone?: PersonPhone;
  isInsert = true;
  constructor(
    protected override dialogRef: MatDialogRef<PersonPhoneDialouge>,
    @Inject(MAT_DIALOG_DATA) public override data: any,
    private service: PersonPhoneService,
  ) {
    super(dialogRef, data)
  }

  override ngOnInit(): void {
    this.personPhone = this.data;
    this.isInsert = this.personPhone?.id ? false : true;
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
      this.service.update(object.element).subscribe(res => {
        this.dialogRef.close();
      })
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
