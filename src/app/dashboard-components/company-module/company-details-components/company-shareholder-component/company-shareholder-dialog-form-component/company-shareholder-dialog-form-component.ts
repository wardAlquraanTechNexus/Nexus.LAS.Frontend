import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { BaseDialogComponent } from '../../../../base-components/base-dialog-component/base-dialog-component';
import { CompaniesShareHolderDto } from '../../../../../models/company-models/company-share-holder/dtos/company-share-holder-dto';
import { CompanyShareHolderService } from '../../../../../services/company-services/company-share-holder-service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-company-shareholder-dialog-form-component',
  standalone: false,
  templateUrl: './company-shareholder-dialog-form-component.html',
  styleUrl: './company-shareholder-dialog-form-component.scss'
})
export class CompanyShareholderDialogFormComponent  extends BaseDialogComponent {
 showLoading = false;
  constructor(
    protected override dialogRef: MatDialogRef<CompanyShareholderDialogFormComponent>, 
    @Inject(MAT_DIALOG_DATA) public override data: CompaniesShareHolderDto,
    private service:CompanyShareHolderService,
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
