import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { CompanyContract } from '../../../../../models/company-models/company-contract/company-contract';
import { BaseDialogFormComponent } from '../../../../base-components/base-dialog-form-component/base-dialog-form-component';
import { CompanyContractDto } from '../../../../../models/company-models/company-contract/dtos/company-contract-dto';
import { CompanyContractService } from '../../../../../services/company-services/company-contract-service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-company-contract-form-dialog-component',
  standalone:false,
  templateUrl: './company-contract-form-dialog-component.html',
  styleUrl: './company-contract-form-dialog-component.scss'
})
export class CompanyContractFormDialogComponent  extends BaseDialogFormComponent<CompanyContract> {
  
  element?:CompanyContractDto;
  constructor(
    override dialogRef: MatDialogRef<CompanyContractFormDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public override data: CompanyContractDto,
    override service:CompanyContractService,
    override cdr: ChangeDetectorRef,
  ) {
    super(dialogRef, data , service , cdr)
  }

  override ngOnInit(): void {
    if(this.data.id){
      this.showLoading = true;
      this.service.getById(this.data.id).subscribe({
        next:(res=>{
          this.element = res;
          this.showLoading = false;
          this.cdr.markForCheck();
        }),error:(err=>{
          this.showLoading = false;
          this.cdr.markForCheck();
        })
      })

    }else{
      this.element = this.data;
    }
  }

}
