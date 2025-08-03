import { Component, Inject } from '@angular/core';
import { BaseDialougeComponent } from '../../../../base-components/base-dialouge-component/base-dialouge-component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PersonEmail } from '../../../../../models/person-email/person-email';
import { PersonEmailService } from '../../../../../services/person-email-service';

@Component({
  selector: 'app-person-email-dialouge',
  standalone: false,
  templateUrl: './person-email-dialouge.html',
  styleUrl: './person-email-dialouge.scss'
})
export class PersonEmailDialouge extends BaseDialougeComponent {
  showLoading = false;
  personEmail?: PersonEmail;
  isInsert = true;
  constructor(
    protected override dialogRef: MatDialogRef<PersonEmailDialouge>,
    @Inject(MAT_DIALOG_DATA) public override data: any,
    private service: PersonEmailService,
  ) {
    super(dialogRef, data)
  }

  override ngOnInit(): void {
    this.personEmail = this.data;
    this.isInsert = this.personEmail?.id ? false : true;
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
