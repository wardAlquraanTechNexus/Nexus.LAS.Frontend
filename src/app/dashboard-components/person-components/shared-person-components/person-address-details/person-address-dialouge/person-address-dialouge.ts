import { Component, Inject } from '@angular/core';
import { BaseDialougeComponent } from '../../../../base-components/base-dialouge-component/base-dialouge-component';
import { PersonAddress } from '../../../../../models/person-address/person-address';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PersonAddressService } from '../../../../../services/person-address-service';

@Component({
  selector: 'app-person-address-dialouge',
  standalone:false,
  templateUrl: './person-address-dialouge.html',
  styleUrl: './person-address-dialouge.scss'
})
export class PersonAddressDialouge extends BaseDialougeComponent {
  showLoading = false;
  personAddress?: PersonAddress;
  isInsert = true;
  constructor(
    protected override dialogRef: MatDialogRef<PersonAddressDialouge>,
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
