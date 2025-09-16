import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { CompanyCapitalDto } from '../../../../../models/company-models/company-capital/dtos/company-capital-dto';
import { CompanyCapitalService } from '../../../../../services/company-services/company-capital-service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseDialogComponent } from '../../../../base-components/base-dialog-component/base-dialog-component';
import { BaseDialogFormComponent } from '../../../../base-components/base-dialog-form-component/base-dialog-form-component';
import { CompanyCapital } from '../../../../../models/company-models/company-capital/company-capital';
import { LanguageService } from '../../../../../services/language-service';

@Component({
  selector: 'app-company-capital-dialog-form-component',
  standalone: false,

  templateUrl: './company-capital-dialog-form-component.html',
  styleUrl: './company-capital-dialog-form-component.scss'
})
export class CompanyCapitalDialogFormComponent extends BaseDialogFormComponent<CompanyCapital> {
  constructor(
    override dialogRef: MatDialogRef<CompanyCapitalDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public override data: CompanyCapitalDto,
    override service: CompanyCapitalService,
    override cdr: ChangeDetectorRef,
    protected override langService: LanguageService
  ) {
    super(dialogRef, data, service, cdr, langService)
  }


}
