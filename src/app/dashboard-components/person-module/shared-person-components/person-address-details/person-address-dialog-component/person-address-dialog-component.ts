import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { BaseDialogComponent } from '../../../../base-components/base-dialog-component/base-dialog-component';
import { PersonAddress } from '../../../../../models/person-models/person-address/person-address';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PersonAddressService } from '../../../../../services/person-services/person-address-service';

@Component({
  selector: 'app-person-address-dialog-component',
  standalone:false,
  templateUrl: './person-address-dialog-component.html',
  styleUrl: './person-address-dialog-component.scss'
})
export class PersonAddressDialogComponent extends BaseDialogComponent {
  showLoading = false;
  personAddress?: PersonAddress;
  isInsert = true;
  constructor(
    protected override dialogRef: MatDialogRef<PersonAddressDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public override data: any,
    private service: PersonAddressService,
    private cdr: ChangeDetectorRef
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
