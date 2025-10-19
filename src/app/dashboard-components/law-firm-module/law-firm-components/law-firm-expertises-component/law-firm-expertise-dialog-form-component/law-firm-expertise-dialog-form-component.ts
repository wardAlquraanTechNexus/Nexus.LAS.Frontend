import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { LawFirmExpertiseService } from '../../../../../services/law-firm-services/law-firm-expertise-service';
import { BaseDialogFormComponent } from '../../../../base-components/base-dialog-form-component/base-dialog-form-component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LawFirmExpertiseDto } from '../../../../../models/law-firm-models/law-firm-expertise/dtos/law-firm-expertise-dto';
import { LanguageService } from '../../../../../services/language-service';

@Component({
  selector: 'app-law-firm-expertise-dialog-form-component',
  standalone: false,
  templateUrl: './law-firm-expertise-dialog-form-component.html',
  styleUrls: ['../../../../_shared/styles/common-dialog-form-style.scss']
})
export class LawFirmExpertiseDialogFormComponent extends BaseDialogFormComponent<LawFirmExpertiseDto> {

  constructor(
    protected override dialogRef: MatDialogRef<LawFirmExpertiseDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public override data: LawFirmExpertiseDto,
    override service: LawFirmExpertiseService,
    protected override cdr: ChangeDetectorRef,
    protected override langService: LanguageService
  ) {
    super(dialogRef, data, service, cdr, langService)
  }

  
 
}