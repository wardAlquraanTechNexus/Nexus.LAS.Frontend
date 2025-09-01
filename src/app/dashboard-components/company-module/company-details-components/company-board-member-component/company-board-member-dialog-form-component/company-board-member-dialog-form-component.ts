import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { CompanyBoardMember } from '../../../../../models/company-models/company-board-member/company-board-member';
import { CompanyBoardMemberDto } from '../../../../../models/company-models/company-board-member/dtos/company-board-member-dto';
import { CompanyBoardMemberService } from '../../../../../services/company-services/company-board-member-service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseDialogFormComponent } from '../../../../base-components/base-dialog-form-component/base-dialog-form-component';

@Component({
  selector: 'app-company-board-member-dialog-form-component',
  standalone:false,
  templateUrl: './company-board-member-dialog-form-component.html',
  styleUrl: './company-board-member-dialog-form-component.scss'
})
export class CompanyBoardMemberDialogFormComponent extends BaseDialogFormComponent<CompanyBoardMember> {
  constructor(
    override dialogRef: MatDialogRef<CompanyBoardMemberDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public override data: CompanyBoardMemberDto,
    override service: CompanyBoardMemberService,
    override cdr: ChangeDetectorRef,
  ) {
    super(dialogRef, data, service, cdr)
  }


}