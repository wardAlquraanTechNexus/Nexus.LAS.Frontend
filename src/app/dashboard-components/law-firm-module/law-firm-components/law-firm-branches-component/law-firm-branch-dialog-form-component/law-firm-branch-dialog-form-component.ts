import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { LawFirmBranch } from '../../../../../models/law-firm-models/law-firm-branch/law-firm-branch';
import { LawFirmBranchDto } from '../../../../../models/law-firm-models/law-firm-branch/dtos/law-firm-branch-dto';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LanguageService } from '../../../../../services/language-service';
import { LawFirmBranchService } from '../../../../../services/law-firm-services/law-firm-branch-service';
import { BaseDialogFormComponent } from '../../../../base-components/base-dialog-form-component/base-dialog-form-component';

@Component({
  selector: 'app-law-firm-branch-dialog-form-component',
  standalone : false,
  templateUrl: './law-firm-branch-dialog-form-component.html',
  styleUrl: './law-firm-branch-dialog-form-component.scss'
})
export class LawFirmBranchDialogFormComponent  extends BaseDialogFormComponent<LawFirmBranch> {

  constructor(
    protected override dialogRef: MatDialogRef<LawFirmBranchDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public override data: LawFirmBranchDto,
    override service: LawFirmBranchService,
    protected override cdr: ChangeDetectorRef,
    protected override langService: LanguageService
  ) {
    super(dialogRef, data, service, cdr, langService)
  }

  
 
}
