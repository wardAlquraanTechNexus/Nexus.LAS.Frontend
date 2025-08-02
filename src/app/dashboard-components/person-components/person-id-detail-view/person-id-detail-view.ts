import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { PersonIdDetailService } from '../../../services/person-id-detail-service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PersonsIDDetail } from '../../../models/person-id-details/person-id-details';
import { PersonIdDetailDto } from '../../../models/person-id-details/person-id-details-dto';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { EditPersonIdDetailForm } from './edit-person-id-detail-form/edit-person-id-detail-form';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SuccessSnackbar } from '../../../components/snackbars/success-snackbar/success-snackbar';
import { environment } from '../../../../environment/environment';
import { BaseDialougeComponent } from '../../base-components/base-dialouge-component/base-dialouge-component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-person-id-detail-view',
  standalone: false,
  templateUrl: './person-id-detail-view.html',
  styleUrl: './person-id-detail-view.scss'
})
export class PersonIdDetailView extends BaseDialougeComponent {
  openEditForm = false;
  isEdit = false;
  personIdDetail!: PersonIdDetailDto;

  showLoading = false;
  constructor(
    private service: PersonIdDetailService,
    protected router: Router,
    protected snackBar: MatSnackBar,
    protected route: ActivatedRoute,
    protected cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    protected override dialogRef: MatDialogRef<PersonIdDetailView>,
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
    if (this.personIdDetail.dataFile && this.personIdDetail.contentType && this.personIdDetail.fileName) {
      const blob = this.base64ToBlob(this.personIdDetail.dataFile, this.personIdDetail.contentType);
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = this.personIdDetail.fileName;
      a.click();

      // Optional cleanup
      window.URL.revokeObjectURL(url);
    } else {
      this.snackBar.open('No file available to download.', 'Close', { duration: 3000 });
    }
  }

  getRemoveCallback(): () => void {
    return () => this.deleteIdDetail();
  }

  deleteIdDetail() {
    this.service.delete(this.personIdDetail.id).subscribe({
      next: (res => {
        this.showLoading = false;

        this.snackBar.openFromComponent(SuccessSnackbar, {
          duration: 4000,
          data: "Deleted Successfully"
        });
        this.cdr.detectChanges();
        this.dialogRef.close(true);
      }), error: (err => {
        this.cdr.detectChanges();
      })
    })
  }

  uploadedFile: File | null = null;
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      this.uploadedFile = input.files[0];
      const file = this.uploadedFile;

      this.personIdDetail.contentType = file.type;

      if (file.type === 'application/pdf') {
        const blobUrl = URL.createObjectURL(file);
        this.personIdDetail.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl);
      } else if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          this.personIdDetail.imageUrl = reader.result as string;
          this.cdr.markForCheck();
        };
        reader.readAsDataURL(file);
      }

      this.cdr.markForCheck();
    }
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
