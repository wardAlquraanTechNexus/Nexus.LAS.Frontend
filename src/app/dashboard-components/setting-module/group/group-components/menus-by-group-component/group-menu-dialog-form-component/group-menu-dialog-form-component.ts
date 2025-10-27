import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { GroupMenu } from '../../../../../../models/group-menu/group-menu';
import { GroupMenuDTO } from '../../../../../../models/group-menu/dtos/group-menu-dto';
import { BaseDialogFormComponent } from '../../../../../base-components/base-dialog-form-component/base-dialog-form-component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { GroupMenuService } from '../../../../../../services/group-menu-service';
import { LanguageService } from '../../../../../../services/language-service';

@Component({
  selector: 'app-group-menu-dialog-form-component',
  standalone: false,
  templateUrl: './group-menu-dialog-form-component.html',
  styleUrls: ['../../../../../_shared/styles/common-dialog-form-style.scss']
})
export class GroupMenuDialogFormComponent extends BaseDialogFormComponent<GroupMenu> {

  constructor(
    protected override dialogRef: MatDialogRef<GroupMenuDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public override data: GroupMenuDTO,
    override service: GroupMenuService,
    protected override cdr: ChangeDetectorRef,
    protected override langService: LanguageService
  ) {
    super(dialogRef, data, service, cdr, langService)
  }



}
