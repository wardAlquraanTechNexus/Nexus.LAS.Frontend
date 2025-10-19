import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FPCDto } from '../../../models/fpc-models/fpc/dtos/fpc-dto';
import { BaseDialogFormComponent } from '../../base-components/base-dialog-form-component/base-dialog-form-component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FPCService } from '../../../services/fpc-services/fpc-service';
import { LanguageService } from '../../../services/language-service';
import { FPC } from '../../../models/fpc-models/fpc/fpc';

@Component({
  selector: 'app-fpc-dialog-form-component',
  standalone: false,
  templateUrl: './fpc-dialog-form-component.html',
  styleUrls: ['../../_shared/styles/common-dialog-form-style.scss' , './fpc-dialog-form-component.scss'],
})
export class FpcDialogFormComponent  extends BaseDialogFormComponent<FPC> {

  constructor(
    protected override dialogRef: MatDialogRef<FpcDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public override data: FPCDto,
    override service: FPCService,
    protected override cdr: ChangeDetectorRef,
    protected override langService: LanguageService
  ) {
    super(dialogRef, data, service, cdr, langService);
  }

  
 
}
