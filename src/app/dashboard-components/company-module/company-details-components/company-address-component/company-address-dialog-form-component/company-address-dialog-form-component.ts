import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { CompanyAddress } from '../../../../../models/company-models/company-address/company-address';
import { BaseDialogFormComponent } from '../../../../base-components/base-dialog-form-component/base-dialog-form-component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompanyAddressDto } from '../../../../../models/company-models/company-address/dtos/company-address-dto';
import { CompanyAddressService } from '../../../../../services/company-services/company-address-service';
import { LanguageService } from '../../../../../services/language-service';

@Component({
  selector: 'app-company-address-dialog-form-component',
  standalone:false,

  templateUrl: './company-address-dialog-form-component.html',
  styleUrl: './company-address-dialog-form-component.scss'
})
export class CompanyAddressDialogFormComponent 
  extends BaseDialogFormComponent<CompanyAddress> {

  constructor(
    protected override dialogRef: MatDialogRef<CompanyAddressDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public override data: CompanyAddressDto,
    override service: CompanyAddressService,
    protected override cdr: ChangeDetectorRef,
    protected override langService: LanguageService
  ) {
    super(dialogRef, data, service, cdr, langService)
  }
}