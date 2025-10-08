import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FPCODAction } from '../../../../../models/fpc-models/fpc-od-action/fpc-od-action';
import { FPCODActionDto } from '../../../../../models/fpc-models/fpc-od-action/dtos/fpc-od-action-dto';
import { FpcOdActionService } from '../../../../../services/fpc-services/fpc-od-action-service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LanguageService } from '../../../../../services/language-service';
import { BaseDialogFormComponent } from '../../../../base-components/base-dialog-form-component/base-dialog-form-component';

@Component({
  selector: 'app-fpc-od-action-dialog-form-component',
  standalone: false,
  templateUrl: './fpc-od-action-dialog-form-component.html',
  styleUrls: ['../../../../_shared/styles/common-dialog-form-style.scss']
})
export class FpcOdActionDialogFormComponent extends BaseDialogFormComponent<FPCODAction> {

  constructor(
    protected override dialogRef: MatDialogRef<FpcOdActionDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public override data: FPCODActionDto,
    override service: FpcOdActionService,
    protected override cdr: ChangeDetectorRef,
    protected override langService: LanguageService
  ) {
    super(dialogRef, data, service, cdr, langService);
  }

  
 
}