import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { BaseDialogComponent } from '../../../../base-components/base-dialog-component/base-dialog-component';
import { CompaniesShareHolderDto } from '../../../../../models/company-models/company-share-holder/dtos/company-share-holder-dto';
import { CompanyShareHolderService } from '../../../../../services/company-services/company-share-holder-service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseDialogFormComponent } from '../../../../base-components/base-dialog-form-component/base-dialog-form-component';
import { CompaniesShareHolder } from '../../../../../models/company-models/company-share-holder/company-share-holder';

@Component({
  selector: 'app-company-shareholder-dialog-form-component',
  standalone: false,
  templateUrl: './company-shareholder-dialog-form-component.html',
  styleUrl: './company-shareholder-dialog-form-component.scss'
})
export class CompanyShareholderDialogFormComponent  extends BaseDialogFormComponent<CompaniesShareHolder> {
  constructor(
    override dialogRef: MatDialogRef<CompanyShareholderDialogFormComponent>, 
    @Inject(MAT_DIALOG_DATA) public override data: CompaniesShareHolderDto,
    override service:CompanyShareHolderService,
    override cdr: ChangeDetectorRef,
  ) {
    super(dialogRef, data,service , cdr)
  }

}
