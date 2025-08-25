import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { CompanyPersonInChargeDto } from '../../../../../models/company-models/company-person-in-charge/get-company-person-in-charge/get-company-person-in-charge-dto';
import { BaseDialogComponent } from '../../../../base-components/base-dialog-component/base-dialog-component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompanyPersonInChargeService } from '../../../../../services/company-services/company-person-in-charge-service';

@Component({
  selector: 'app-company-person-in-charge-dialog-form-component',
  standalone:false,
  templateUrl: './company-person-in-charge-dialog-form-component.html',
  styleUrl: './company-person-in-charge-dialog-form-component.scss'
})
export class CompanyPersonInChargeDialogFormComponent  extends BaseDialogComponent {
 showLoading = false;
  constructor(
    protected override dialogRef: MatDialogRef<CompanyPersonInChargeDialogFormComponent>, 
    @Inject(MAT_DIALOG_DATA) public override data: CompanyPersonInChargeDto,
    private service:CompanyPersonInChargeService,
    protected cdr: ChangeDetectorRef,
  ) {
    super(dialogRef, data)
  }

  onSave(element: any) {
    if(!element.element.id){
      this.showLoading = true;
      this.service.create(element.element).subscribe({
        next:(res=>{
          this.showLoading = false;
          element.element.id = res;
          this.dialogRef.close(element.element);
          this.cdr.markForCheck();
        }),error:(err=>{
          this.showLoading = false;
          this.cdr.markForCheck();
        })
      })
    }else{
      this.showLoading = true;
      this.service.update(element.element).subscribe({
        next:(res=>{
          this.showLoading = false;
          this.dialogRef.close(element.element);
          this.cdr.markForCheck();
        }),error:(err=>{
          this.showLoading = false;
          this.cdr.markForCheck();
        })
      })
    }
  }
  onCancel(event: any) {
    this.dialogRef.close();
  }
}
