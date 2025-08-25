import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { BaseDialogComponent } from '../../../../base-components/base-dialog-component/base-dialog-component';
import { CompanyChamberOfCommerceDTO } from '../../../../../models/company-models/company-champer-of-commerce/dtos/company-champer-of-commerce-dto';
import { CompanyChamperOfCommerceService } from '../../../../../services/company-services/company-champer-of-commerce-service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-company-champer-of-commerce-form-dialog-component',
  standalone: false,
  templateUrl: './company-champer-of-commerce-form-dialog-component.html',
  styleUrl: './company-champer-of-commerce-form-dialog-component.scss'
})
export class CompanyChamperOfCommerceFormDialogComponent  extends BaseDialogComponent {
 showLoading = false;
  constructor(
    protected override dialogRef: MatDialogRef<CompanyChamperOfCommerceFormDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public override data: CompanyChamberOfCommerceDTO,
    private service:CompanyChamperOfCommerceService,
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
