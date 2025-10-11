import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { PersonIdDetailService } from '../../../services/person-services/person-id-detail-service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BaseDialogComponent } from '../../base-components/base-dialog-component/base-dialog-component';
import { FormBuilder } from '@angular/forms';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { PersonIdDetailDto } from '../../../models/person-models/person-id-details/person-id-details-dto';
import { downloadBlobFile } from '../../_shared/shared-methods/downloadBlob';

@Component({
  selector: 'app-person-id-detail-view-component',
  standalone: false,
  templateUrl: './person-id-detail-view-component.html',
  styleUrl: './person-id-detail-view-component.scss'
})
export class PersonIdDetailViewComponent extends BaseDialogComponent {
  openEditForm = false;
  isEdit = false;
  personIdDetail!: PersonIdDetailDto;
  fileUrl:any;

  showLoading = false;
  constructor(
    private service: PersonIdDetailService,
    protected router: Router,
    protected errorHandler: ErrorHandlerService,
    protected route: ActivatedRoute,
    protected cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    protected override dialogRef: MatDialogRef<PersonIdDetailViewComponent>,
    @Inject(MAT_DIALOG_DATA) public override data: any,
    private fb: FormBuilder,


  ) {
    super(dialogRef, data);

  }


  override ngOnInit(): void {
    this.showLoading = true;
    this.service.getDTOById(this.element.id).subscribe(
      {
        next: (data) => {

          this.personIdDetail = data;

          if (data.data && data.contentType) {

            // If dataFile is base64
            const base64Data = data.data;
            const blob = this.base64ToBlob(base64Data, data.contentType);
            const url = URL.createObjectURL(blob);
            this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
          }
          this.showLoading = false;
          this.cdr.markForCheck();
        },
        error: (error) => {
          this.showLoading = false;
          this.errorHandler.handleError('Error loading person ID details');
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
  getPrimaryStyle() {
    if (this.personIdDetail.isPrimary) {
      return {
        'border': `2px solid #025EBA`,
        'color': '#025EBA',
        'border-radius': '20px',
        'padding': '10px'

      };
    }
    return {}
  }

  openEdit() {
    this.openEditForm = true;
  }

  cancelEdit() {
    this.openEditForm = false;
  }
  close() {
    this.dialogRef.close(this.isEdit);
  }

  download() {
    downloadBlobFile(this.data.data , this.data.file)
  }

  getRemoveCallback(): () => void {
    return () => this.deleteIdDetail();
  }

  deleteIdDetail() {
    this.service.delete(this.personIdDetail.id).subscribe({
      next: (res => {
        this.showLoading = false;

        this.errorHandler.showSuccess("Deleted Successfully");
        this.cdr.detectChanges();
        this.dialogRef.close(true);
      }), error: (err => {
        this.cdr.detectChanges();
      })
    })
  }

  uploadedFile: File | null = null;
 

  save(event: any) {
    this.personIdDetail = event.element;
    this.showLoading = true;

    this.service.updateByForm(event.formData).subscribe({
      next: (res) => {
        this.showLoading = false;
        this.errorHandler.showSuccess('Updated Successfully');
        this.cdr.markForCheck();
        this.openEditForm = false;
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
