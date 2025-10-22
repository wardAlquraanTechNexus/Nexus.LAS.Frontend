import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { BaseDialogComponent } from '../../../../base-components/base-dialog-component/base-dialog-component';
import { CompanyActivityDto } from '../../../../../models/company-models/company-activity/dtos/company-activity-dto';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompanyActivityService } from '../../../../../services/company-services/company-activity-service';
import { BaseDialogFormComponent } from '../../../../base-components/base-dialog-form-component/base-dialog-form-component';
import { CompanyActivity } from '../../../../../models/company-models/company-activity/company-activity';
import { LanguageService } from '../../../../../services/language-service';

@Component({
  selector: 'app-company-activity-form-dialog-component',
  standalone: false,
  templateUrl: './company-activity-form-dialog-component.html',
  styleUrls: ['../../../../_shared/styles/common-dialog-form-style.scss' ],
})
export class CompanyActivityFormDialogComponent  extends BaseDialogFormComponent<CompanyActivity> {
  constructor(
    override dialogRef: MatDialogRef<CompanyActivityFormDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public override data: CompanyActivityDto,
    override service:CompanyActivityService,
    override cdr: ChangeDetectorRef,
    override langService: LanguageService
  ) {
    super(dialogRef, data , service , cdr, langService)
  }


}
