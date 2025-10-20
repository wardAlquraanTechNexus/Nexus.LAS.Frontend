import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { User } from '../../../../../models/user/user';
import { UserService } from '../../../../../services/user-service';
import { BaseDialogFormComponent } from '../../../../base-components/base-dialog-form-component/base-dialog-form-component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LanguageService } from '../../../../../services/language-service';
import { UserDto } from '../../../../../models/user/dtos/user-dto';
import { LinkUserPersonParam } from '../../../../../models/user/param/link-user-person-param';

@Component({
  selector: 'app-user-dialog-form-component',
  standalone: false,
  templateUrl: './user-dialog-form-component.html',
  styleUrls: ['./../../../../_shared/styles/common-dialog-form-style.scss']
})
export class UserDialogFormComponent extends BaseDialogFormComponent<User> {

  constructor(
    protected override dialogRef: MatDialogRef<UserDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public override data: LinkUserPersonParam,
    override service: UserService,
    protected override cdr: ChangeDetectorRef,
    protected override langService: LanguageService
  ) {
    super(dialogRef, data, service, cdr, langService)
  }


  override onSave(element: any): void {
    this.showLoading = true;

    this.service.linkUserToPerson(element.element).subscribe({
      next: () => {
        this.showLoading = false;
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.showLoading = false;
        this.cdr.markForCheck();
    }});
  }


}
