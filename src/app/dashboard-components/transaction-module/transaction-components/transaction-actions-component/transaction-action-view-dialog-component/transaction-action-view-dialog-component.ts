import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { TransactionActionDto } from '../../../../../models/transaction-models/transaction-action/dtos/transaction-dto';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { base64ToBlob, downloadBlobFile } from '../../../../_shared/shared-methods/downloadBlob';
import { FileDto } from '../../../../../models/base/file-dto';
import { TransactionAction } from '../../../../../models/transaction-models/transaction-action/transaction-action';
import { LanguageService } from '../../../../../services/language-service';
import { TransactionActionService } from '../../../../../services/transaction-services/transaction-action-service';
import { BaseDialogFormComponent } from '../../../../base-components/base-dialog-form-component/base-dialog-form-component';
import { TransactionActionsDialogFormComponent } from '../transaction-actions-dialog-form-component/transaction-actions-dialog-form-component';

@Component({
  selector: 'app-transaction-action-view-dialog-component',
  standalone: false,
  templateUrl: './transaction-action-view-dialog-component.html',
  styleUrls: ['../../../../_shared/styles/common-dialog-form-style.scss' , '../../../../_shared/styles/common-form-style.scss','./transaction-action-view-dialog-component.scss']
})
export class TransactionActionViewDialogComponent extends BaseDialogFormComponent<TransactionAction> {

  constructor(
    override dialogRef: MatDialogRef<TransactionActionsDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public override data: TransactionActionDto,
    override service: TransactionActionService,
    override cdr: ChangeDetectorRef,
    override langService: LanguageService
  ) {
    super(dialogRef, data, service, cdr, langService)
  }

  close() {
    this.dialogRef.close();
  }

  isImageFile(contentType?: string | null): boolean {
    if (!contentType) return false;
    const imageTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/bmp', 'image/webp', 'image/svg+xml'];
    return imageTypes.includes(contentType.toLowerCase());
  }

  canPreview(contentType?: string | null): boolean {
    if (!contentType) return false;
    return contentType === 'application/pdf' || this.isImageFile(contentType);
  }

  previewFile(file: FileDto) {
    if (!file.data || !file.contentType) return;

    // If file cannot be previewed in browser, download it instead
    if (!this.canPreview(file.contentType)) {
      this.downloadFile(file);
      return;
    }

    // Otherwise, open in new window for preview
    const blob = base64ToBlob(file.data, file.contentType);
    const fileURL = URL.createObjectURL(blob);
    window.open(fileURL, '_blank');
  }

  downloadFile(file: FileDto) {
    if (!file.data || !file.contentType || !file.fileName) return;
    const blob = base64ToBlob(file.data, file.contentType);
    downloadBlobFile(blob, file.fileName);
  }
}
