import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { BaseDialogComponent } from '../../base-components/base-dialog-component/base-dialog-component';
import { GetCompanyDto } from '../../../models/company/get-company-query/get-company-dto';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompanyService } from '../../../services/company-service';

@Component({
  selector: 'app-company-form-dialog',
  standalone: false, 
  templateUrl: './company-form-dialog.html',
  styleUrl: './company-form-dialog.scss'
})
export class CompanyFormDialog extends BaseDialogComponent {
  showLoading = false;
    constructor(
      protected override dialogRef: MatDialogRef<CompanyFormDialog>, 
      @Inject(MAT_DIALOG_DATA) public override data: any,
      private service:CompanyService,
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
