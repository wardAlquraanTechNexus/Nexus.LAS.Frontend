import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { LawFirm } from '../../../models/law-firm-models/law-firm/law-firm';
import { LawFirmService } from '../../../services/law-firm-services/law-firm-service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LanguageService } from '../../../services/language-service';
import { BaseDialogFormComponent } from '../../base-components/base-dialog-form-component/base-dialog-form-component';
import { LawFirmDTO } from '../../../models/law-firm-models/law-firm/dtos/law-firm-dto';

@Component({
  selector: 'app-law-firm-dialog-form-component',
  standalone: false,
  templateUrl: './law-firm-dialog-form-component.html',
  styleUrls: ['./law-firm-dialog-form-component.scss']
})
export class LawFirmDialogFormComponent  extends BaseDialogFormComponent<LawFirm> {

  constructor(
    protected override dialogRef: MatDialogRef<LawFirmDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public override data: LawFirmDTO,
    override service: LawFirmService,
    protected override cdr: ChangeDetectorRef,
    protected override langService: LanguageService
  ) {
    super(dialogRef, data, service, cdr, langService)
  }

  
 
}
