import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { BaseDialougeComponent } from '../../../base-components/base-dialouge-component/base-dialouge-component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PersonIdDetailDto } from '../../../../models/person-id-details/person-id-details-dto';
import { PersonIdDetailService } from '../../../../services/person-id-detail-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { SuccessSnackbar } from '../../../../components/snackbars/success-snackbar/success-snackbar';

@Component({
  selector: 'app-edit-person-id-detail-view',
  standalone: false,
  templateUrl: './edit-person-id-detail-view.html',
  styleUrls: ['./edit-person-id-detail-view.scss', '../person-id-detail-view.scss']
})
export class EditPersonIdDetailView extends BaseDialougeComponent {
  showLoading = false;
  isEdit = false;
  personIdDetail!: PersonIdDetailDto;

  constructor(
    private service: PersonIdDetailService,
    protected override dialogRef: MatDialogRef<EditPersonIdDetailView>,
    @Inject(MAT_DIALOG_DATA) public override data: any,
  protected snackBar: MatSnackBar,
    protected cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,

    ) {
    super(dialogRef, data)
  }
  override ngOnInit(): void {
    this.showLoading = true;
    this.service.getDTOById(this.element.id).subscribe(
      {
        next: (data) => {

          this.personIdDetail = data;

          if (data.dataFile && data.contentType) {

            // If dataFile is base64
            const base64Data = data.dataFile;
            const blob = this.base64ToBlob(base64Data, data.contentType);
            const url = URL.createObjectURL(blob);
            this.personIdDetail.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
          }
          this.showLoading = false;
          this.cdr.markForCheck();
        },
        error: (error) => {
          this.showLoading = false;
          this.snackBar.open('Error loading person ID details', 'Close', { duration: 3000 });
        }
      }
    )
  }

   base64ToBlob(base64: any, contentType: string): Blob {
    const byteCharacters = atob(base64);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: contentType });
  }
  cancelEdit(){
    this.dialogRef.close(this.isEdit);
  }

  save(event: any) {
      this.personIdDetail = event.element;
      this.showLoading = true;
  
      this.service.updateByDto(event.formData).subscribe({
        next: (res) => {
          this.showLoading = false;
          this.snackBar.openFromComponent(SuccessSnackbar, {
            data: 'Updated Successfully'
          });
          this.cdr.markForCheck();
          this.isEdit = true;
        },
        error: () => {
          this.cdr.markForCheck();
          this.showLoading = false;
          this.isEdit = false;
  
        }
      });
    }

}
