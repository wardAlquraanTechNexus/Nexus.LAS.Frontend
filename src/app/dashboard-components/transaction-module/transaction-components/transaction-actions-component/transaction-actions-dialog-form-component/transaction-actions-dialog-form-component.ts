import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { TransactionAction } from '../../../../../models/transaction-models/transaction-action/transaction-action';
import { BaseDialogFormComponent } from '../../../../base-components/base-dialog-form-component/base-dialog-form-component';
import { TransactionActionDto } from '../../../../../models/transaction-models/transaction-action/dtos/transaction-dto';
import { TransactionActionService } from '../../../../../services/transaction-services/transaction-action-service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LanguageService } from '../../../../../services/language-service';

@Component({
  selector: 'app-transaction-actions-dialog-form-component',
  standalone: false,
  templateUrl: './transaction-actions-dialog-form-component.html',
  styleUrls: ['../../../../_shared/styles/common-dialog-form-style.scss']
})
export class TransactionActionsDialogFormComponent extends BaseDialogFormComponent<TransactionAction> {

  constructor(
    override dialogRef: MatDialogRef<TransactionActionsDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public override data: TransactionActionDto,
    override service: TransactionActionService,
    override cdr: ChangeDetectorRef,
    override langService: LanguageService
  ) {
    super(dialogRef, data, service, cdr, langService)
  }


  override onSave(element: any): void {
    this.showLoading = true;
    if(!element.element.id){
      this.service.saveFollowUp(element.formData).subscribe({
        next: (res => {
          this.showLoading = false;
          element.element.id = res;
          this.dialogRef.close(element.element);
          this.cdr.markForCheck();
        }), error: (err => {
          this.showLoading = false;
          this.cdr.markForCheck();
        })
      });
    }else{
      this.service.updateByForm(element.formData).subscribe({
        next: (res => {
          this.showLoading = false;
          this.dialogRef.close(element.element);
          this.cdr.markForCheck();
        }), error: (err => {
          this.showLoading = false;
          this.cdr.markForCheck();
        })
      });
    }
  }




}
