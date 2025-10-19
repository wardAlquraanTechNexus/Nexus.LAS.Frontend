import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { CompanyAccountSignatory } from '../../../../../models/company-models/company-account-signatory/company-account-signatory';
import { BaseDialogFormComponent } from '../../../../base-components/base-dialog-form-component/base-dialog-form-component';
import { CompanyAccountSignatoryService } from '../../../../../services/company-services/company-account-signatory-service';
import { CompanyAccountSignatoryDto } from '../../../../../models/company-models/company-account-signatory/dtos/company-account-signatory-dto';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LanguageService } from '../../../../../services/language-service';

@Component({
  selector: 'app-company-account-signatory-dialog-form-component',
  standalone: false,
  templateUrl: './company-account-signatory-dialog-form-component.html',
  styleUrls: ['../../../../_shared/styles/common-dialog-form-style.scss']
})
export class CompanyAccountSignatoryDialogFormComponent extends BaseDialogFormComponent<CompanyAccountSignatory> {

  constructor(
    protected override dialogRef: MatDialogRef<CompanyAccountSignatoryDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public override data: CompanyAccountSignatoryDto,
    override service: CompanyAccountSignatoryService,
    protected override cdr: ChangeDetectorRef,
    protected override langService: LanguageService
  ) {
    super(dialogRef, data, service, cdr, langService)
  }
}
