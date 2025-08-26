import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { CompanyCapitalDto } from '../../../../../models/company-models/company-capital/dtos/company-capital-dto';
import { CompanyCapitalService } from '../../../../../services/company-services/company-capital-service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseDialogComponent } from '../../../../base-components/base-dialog-component/base-dialog-component';

@Component({
  selector: 'app-company-capital-dialog-form-component',
  standalone: false,

  templateUrl: './company-capital-dialog-form-component.html',
  styleUrl: './company-capital-dialog-form-component.scss'
})
export class CompanyCapitalDialogFormComponent  extends BaseDialogComponent {
 showLoading = false;
  constructor(
    protected override dialogRef: MatDialogRef<CompanyCapitalDialogFormComponent>, 
    @Inject(MAT_DIALOG_DATA) public override data: CompanyCapitalDto,
    private service:CompanyCapitalService,
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
