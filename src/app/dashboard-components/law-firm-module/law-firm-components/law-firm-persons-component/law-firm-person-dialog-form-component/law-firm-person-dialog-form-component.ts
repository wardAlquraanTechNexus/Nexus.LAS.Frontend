import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { LawFirmPersonDto } from '../../../../../models/law-firm-models/law-firm-person/dtos/law-firm-person-dto';
import { BaseDialogFormComponent } from '../../../../base-components/base-dialog-form-component/base-dialog-form-component';
import { LawFirmPersonService } from '../../../../../services/law-firm-services/law-firm-person-service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LanguageService } from '../../../../../services/language-service';
import { LawFirmPerson } from '../../../../../models/law-firm-models/law-firm-person/law-firm-person';

@Component({
  selector: 'app-law-firm-person-dialog-form-component',
  standalone: false,
  templateUrl: './law-firm-person-dialog-form-component.html',
  styleUrls: ['../../../../_shared/styles/common-form-style.scss']
})
export class LawFirmPersonDialogFormComponent extends BaseDialogFormComponent<LawFirmPerson> {

  constructor(
    protected override dialogRef: MatDialogRef<LawFirmPersonDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public override data: LawFirmPersonDto,
    override service: LawFirmPersonService,
    override cdr: ChangeDetectorRef,
    override langService: LanguageService
  ) {
    super(dialogRef, data, service, cdr, langService)
  }



}
