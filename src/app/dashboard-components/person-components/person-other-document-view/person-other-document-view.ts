import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PersonOtherDocumentDTO } from '../../../models/person-other-document/person-other-document-dto';
import { PersonOtherDocumentService } from '../../../services/person-other-document-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SuccessSnackbar } from '../../../components/snackbars/success-snackbar/success-snackbar';
import { environment } from '../../../../environment/environment';
import { EditPersonOtherDocumentForm } from './edit-person-other-document-form/edit-person-other-document-form';

@Component({
  selector: 'app-person-other-document-view',
  standalone: false,
  templateUrl: './person-other-document-view.html',
  styleUrl: './person-other-document-view.scss'
})
export class PersonOtherDocumentView implements OnInit {
  imageUrl: SafeResourceUrl | null = null;
  personOtherDocument!: PersonOtherDocumentDTO;
  id: number = 0;
  showLoading = false;
  constructor(
    private service: PersonOtherDocumentService,
    protected router: Router,
    protected snackBar: MatSnackBar,
    protected route: ActivatedRoute,
    protected cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    let id = this.route.snapshot.queryParamMap.get('id');
    if (id) {
      this.id = parseInt(id);
      this.showLoading = true;
      this.service.getDTOById(this.id).subscribe(
        {
          next: (data) => {
            this.personOtherDocument = data;

            if (data.dataFile && data.contentType) {

              // If dataFile is base64
              const base64Data = data.dataFile;
              const blob = this.base64ToBlob(base64Data, data.contentType);
              const url = URL.createObjectURL(blob);

              this.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
            }
            this.showLoading = false;
            this.cdr.detectChanges();
          },
          error: (error) => {
            this.showLoading = false;
            this.snackBar.open('Error loading person ID details', 'Close', { duration: 3000 });
          }
        }
      )

    }
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

  edit() {
    const dialogRef = this.dialog.open(EditPersonOtherDocumentForm, {
      width: '700px',
      panelClass: 'no-radius-dialog',
      disableClose: true,
      data: {
        personOtherDocument: this.personOtherDocument
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.personOtherDocument = result;
        this.cdr.detectChanges();
      }
    });
  }

  getRemoveCallback() {
    return () => this.deleteIdDetail();
  }


  deleteIdDetail() {
    this.service.delete(this.personOtherDocument.id).subscribe({
      next: (res => {
        this.showLoading = false;

        this.snackBar.openFromComponent(SuccessSnackbar, {
          duration: 4000,
          data: "Deleted Successfully"
        });
        this.cdr.detectChanges();
        this.router.navigate([environment.routes.EditPerson], {
          queryParams: { id: this.personOtherDocument.personsIdn }
        });
      }), error: (err => {
        this.cdr.detectChanges();
      })
    })
  }

}
