import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { TransactionInvoice } from '../../../../../models/transaction-models/transaction-invoice/transaction-invoice';
import { TransactionInvoiceDto } from '../../../../../models/transaction-models/transaction-invoice/dtos/transaction-invoice-dto';
import { TransactionInvoiceService } from '../../../../../services/transaction-services/transaction-invoice-service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LanguageService } from '../../../../../services/language-service';
import { BaseDialogFormComponent } from '../../../../base-components/base-dialog-form-component/base-dialog-form-component';

@Component({
  selector: 'app-transaction-invoices-dialog-form',
  standalone: false,
  templateUrl: './transaction-invoices-dialog-form-component.html',
  styleUrls: ['../../../../_shared/styles/common-dialog-form-style.scss']
})
export class TransactionInvoicesDialogFormComponent extends BaseDialogFormComponent<TransactionInvoice> {

  constructor(
    override dialogRef: MatDialogRef<TransactionInvoicesDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public override data: TransactionInvoiceDto,
    override service: TransactionInvoiceService,
    override cdr: ChangeDetectorRef,
    override langService: LanguageService
  ) {
    super(dialogRef, data, service, cdr, langService)
  }


  override onSave(element: any): void {
    this.showLoading = true;
    if(!element.element.id){
      this.service.create(element.element).subscribe({
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
      this.service.update(element.element).subscribe({
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
