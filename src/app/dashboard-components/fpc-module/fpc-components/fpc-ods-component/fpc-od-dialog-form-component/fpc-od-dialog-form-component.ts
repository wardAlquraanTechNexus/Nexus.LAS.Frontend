import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FPCOD } from '../../../../../models/fpc-models/fpc-od/fpc-od';
import { FPCODDto } from '../../../../../models/fpc-models/fpc-od/dtos/fpc-od-dto';
import { FPCODService } from '../../../../../services/fpc-services/fpc-od-service';
import { BaseDialogFormComponent } from '../../../../base-components/base-dialog-form-component/base-dialog-form-component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LanguageService } from '../../../../../services/language-service';

@Component({
  selector: 'app-fpc-od-dialog-form-component',
  standalone: false,
  templateUrl: './fpc-od-dialog-form-component.html',
  styleUrl: './fpc-od-dialog-form-component.scss'
})
export class FpcOdDialogFormComponent extends BaseDialogFormComponent<FPCOD> {

  constructor(
    protected override dialogRef: MatDialogRef<FpcOdDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public override data: FPCODDto,
    override service: FPCODService,
    protected override cdr: ChangeDetectorRef,
    protected override langService: LanguageService
  ) {
    super(dialogRef, data, service, cdr, langService);
  }

  
 
}
