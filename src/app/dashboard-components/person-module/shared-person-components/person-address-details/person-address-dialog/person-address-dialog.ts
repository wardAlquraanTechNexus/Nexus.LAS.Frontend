import { Component, Inject } from '@angular/core';
import { BaseDialogComponent } from '../../../../base-components/base-dialog-component/base-dialog-component';
import { PersonAddress } from '../../../../../models/person-address/person-address';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PersonAddressService } from '../../../../../services/person-address-service';

@Component({
  selector: 'app-person-address-dialog',
  standalone:false,
  templateUrl: './person-address-dialog.html',
  styleUrl: './person-address-dialog.scss'
})
export class PersonAddressDialog extends BaseDialogComponent {
  showLoading = false;
  personAddress?: PersonAddress;
  isInsert = true;
  constructor(
    protected override dialogRef: MatDialogRef<PersonAddressDialog>,
    @Inject(MAT_DIALOG_DATA) public override data: any,
    private service: PersonAddressService,
  ) {
    super(dialogRef, data)
  }

  override ngOnInit(): void {
    this.personAddress = this.data;
    this.isInsert = this.personAddress?.id ? false : true;
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
