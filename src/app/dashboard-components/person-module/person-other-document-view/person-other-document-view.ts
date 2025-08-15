import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PersonOtherDocumentDTO } from '../../../models/person-other-document/person-other-document-dto';
import { PersonOtherDocumentService } from '../../../services/person-services/person-other-document-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SuccessSnackbar } from '../../../components/snackbars/success-snackbar/success-snackbar';
import { environment } from '../../../../environment/environment';
import { EditPersonOtherDocumentForm } from './edit-person-other-document-form/edit-person-other-document-form';
import { BaseDialogComponent } from '../../base-components/base-dialog-component/base-dialog-component';

@Component({
  selector: 'app-person-other-document-view',
  standalone: false,
  templateUrl: './person-other-document-view.html',
  styleUrl: './person-other-document-view.scss'
})
export class PersonOtherDocumentView extends BaseDialogComponent {
  personOtherDocument!: PersonOtherDocumentDTO;
  showLoading = false;
  openEditForm = false;
  isEdit = false;
  constructor(
    private service: PersonOtherDocumentService,
    protected router: Router,
    protected snackBar: MatSnackBar,
    protected route: ActivatedRoute,
    protected cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
  protected override dialogRef: MatDialogRef<PersonOtherDocumentView>,
  @Inject(MAT_DIALOG_DATA) public override data: any
  ) {
    super(dialogRef, data)
  }

  override ngOnInit(): void {
    this.showLoading = true;
    this.service.getDTOById(this.element.id).subscribe(
      {
        next: (data) => {

          this.personOtherDocument = data;

          if (data.dataFile && data.contentType) {

            // If dataFile is base64
            const base64Data = data.dataFile;
            const blob = this.base64ToBlob(base64Data, data.contentType);
            const url = URL.createObjectURL(blob);
            this.personOtherDocument.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
          }
          this.showLoading = false;
          this.cdr.markForCheck();
        },
        error: (error) => {
          this.showLoading = false;
          this.snackBar.open('Error loading person ID details', 'Close', { duration: 3000 });
        }
      })
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


  download() {
    if (this.personOtherDocument.dataFile && this.personOtherDocument.contentType && this.personOtherDocument.fileName) {
      const blob = this.base64ToBlob(this.personOtherDocument.dataFile, this.personOtherDocument.contentType);
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = this.personOtherDocument.fileName;
      a.click();

      // Optional cleanup
      window.URL.revokeObjectURL(url);
    } else {
      this.snackBar.open('No file available to download.', 'Close', { duration: 3000 });
    }
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
  
  getRemoveCallback() {
    return () => this.deleteOtherDocument(this.personOtherDocument);
  }


  

  deleteOtherDocument(personOtherDocument:any) {
    this.service.delete(personOtherDocument.id).subscribe({
      next: (res => {
        this.showLoading = false;

        this.snackBar.openFromComponent(SuccessSnackbar, {
          duration: 4000,
          data: "Deleted Successfully"
        });
        this.cdr.detectChanges();
        this.isEdit = true;
        this.close();
      }), error: (err => {
        this.cdr.detectChanges();
      })
    })
  }


    save(event: any) {
    this.personOtherDocument = event.element;
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

      }
    });
  }
}
