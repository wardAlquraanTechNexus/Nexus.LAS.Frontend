import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { CompanyBoard } from '../../../../../models/company-models/company-board/company-board';
import { CompanyBoardDto } from '../../../../../models/company-models/company-board/dtos/company-board-dto';
import { CompanyBoardService } from '../../../../../services/company-services/company-board-service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseDialogFormComponent } from '../../../../base-components/base-dialog-form-component/base-dialog-form-component';

@Component({
  selector: 'app-company-board-dialog-form-component',
  standalone:false,
  templateUrl: './company-board-dialog-form-component.html',
  styleUrl: './company-board-dialog-form-component.scss'
})
export class CompanyBoardDialogFormComponent extends BaseDialogFormComponent<CompanyBoard> {
  constructor(
    override dialogRef: MatDialogRef<CompanyBoardDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public override data: CompanyBoardDto,
    override service: CompanyBoardService,
    override cdr: ChangeDetectorRef,
  ) {
    super(dialogRef, data, service, cdr)
  }


}
