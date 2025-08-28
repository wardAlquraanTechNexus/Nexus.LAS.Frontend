import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { CompanyChamberOfCommerceDTO } from '../../../../../models/company-models/company-champer-of-commerce/dtos/company-champer-of-commerce-dto';
import { CompanyChamperOfCommerceService } from '../../../../../services/company-services/company-champer-of-commerce-service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseDialogFormComponent } from '../../../../base-components/base-dialog-form-component/base-dialog-form-component';
import { CompanyChamberOfCommerce } from '../../../../../models/company-models/company-champer-of-commerce/company-champer-of-commerce';

@Component({
  selector: 'app-company-champer-of-commerce-form-dialog-component',
  standalone: false,
  templateUrl: './company-champer-of-commerce-form-dialog-component.html',
  styleUrl: './company-champer-of-commerce-form-dialog-component.scss'
})
export class CompanyChamperOfCommerceFormDialogComponent extends BaseDialogFormComponent<CompanyChamberOfCommerce> {

  constructor(
    override dialogRef: MatDialogRef<CompanyChamperOfCommerceFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public override data: CompanyChamberOfCommerceDTO,
    override service: CompanyChamperOfCommerceService,
    override cdr: ChangeDetectorRef,
  ) {
    super(dialogRef, data, service, cdr)
  }


}
