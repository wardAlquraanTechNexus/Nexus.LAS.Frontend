import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { BaseDialogComponent } from '../../../../base-components/base-dialog-component/base-dialog-component';
import { CompanyActivityDto } from '../../../../../models/company-models/company-activity/dtos/company-activity-dto';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompanyActivityService } from '../../../../../services/company-services/company-activity-service';

@Component({
  selector: 'app-company-activity-form-dialog-component',
  standalone: false,
  templateUrl: './company-activity-form-dialog-component.html',
  styleUrl: './company-activity-form-dialog-component.scss'
})
export class CompanyActivityFormDialogComponent  extends BaseDialogComponent {
 showLoading = false;
  constructor(
    protected override dialogRef: MatDialogRef<CompanyActivityFormDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public override data: CompanyActivityDto,
    private service:CompanyActivityService,
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
