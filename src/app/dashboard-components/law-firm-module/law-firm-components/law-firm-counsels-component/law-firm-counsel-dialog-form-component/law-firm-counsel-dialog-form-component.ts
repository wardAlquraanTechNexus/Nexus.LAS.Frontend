import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LawFirmPersonDto } from '../../../../../models/law-firm-models/law-firm-person/dtos/law-firm-person-dto';
import { LanguageService } from '../../../../../services/language-service';
import { LawFirmPersonService } from '../../../../../services/law-firm-services/law-firm-person-service';
import { BaseDialogFormComponent } from '../../../../base-components/base-dialog-form-component/base-dialog-form-component';
import { LawFirmPersonDialogFormComponent } from '../../law-firm-persons-component/law-firm-person-dialog-form-component/law-firm-person-dialog-form-component';
import { LawFirmCounselDto } from '../../../../../models/law-firm-models/law-firm-counsel/dtos/law-firm-counsel-dto';
import { LawFirmCounsel } from '../../../../../models/law-firm-models/law-firm-counsel/law-firm-counsel';
import { LawFirmCounselService } from '../../../../../services/law-firm-services/law-firm-counsel-service';

@Component({
  selector: 'app-law-firm-counsel-dialog-form-component',
  standalone : false,
  templateUrl: './law-firm-counsel-dialog-form-component.html',
  styleUrl: './law-firm-counsel-dialog-form-component.scss'
})
export class LawFirmCounselDialogFormComponent extends BaseDialogFormComponent<LawFirmCounsel> {

  constructor(
    protected override dialogRef: MatDialogRef<LawFirmCounselDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public override data: LawFirmCounselDto,
    override service: LawFirmCounselService,
    protected override cdr: ChangeDetectorRef,
    protected override langService: LanguageService
  ) {
    super(dialogRef, data, service, cdr, langService)
  }

  
 
}
