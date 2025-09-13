import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { BaseDialogComponent } from '../../../../base-components/base-dialog-component/base-dialog-component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PersonEmail } from '../../../../../models/person-models/person-email/person-email';
import { PersonEmailService } from '../../../../../services/person-services/person-email-service';

@Component({
  selector: 'app-person-email-dialog-component',
  standalone: false,
  templateUrl: './person-email-dialog-component.html',
  styleUrl: './person-email-dialog-component.scss'
})
export class PersonEmailDialogComponent extends BaseDialogComponent {
  showLoading = false;
  personEmail?: PersonEmail;
  isInsert = true;
  constructor(
    protected override dialogRef: MatDialogRef<PersonEmailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public override data: any,
    private service: PersonEmailService,
    private cdr: ChangeDetectorRef
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
            this.cdr.markForCheck();
          }),
          error:(err=>{
            this.showLoading = false;
            this.cdr.markForCheck();
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
