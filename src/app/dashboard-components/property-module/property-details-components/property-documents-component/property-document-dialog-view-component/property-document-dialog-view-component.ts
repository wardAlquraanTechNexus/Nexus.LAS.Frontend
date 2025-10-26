import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { LanguageCode } from '../../../../../models/types/lang-type';
import { Labels } from '../../../../../models/consts/labels';
import { PropertyDocumentService } from '../../../../../services/property-services/property-document-service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { PersonIdDetailDto } from '../../../../../models/person-models/person-id-details/person-id-details-dto';
import { LanguageService } from '../../../../../services/language-service';
import { base64ToBlob, downloadBlob } from '../../../../_shared/shared-methods/downloadBlob';
import { PersonIdDocumentViewComponent } from '../../../../person-module/shared-person-documents-components/person-id-documents-table-component/person-id-document-view-component/person-id-document-view-component';
import { PropertyDocumentDTO } from '../../../../../models/property-models/property-document/dtos/property-document-dto';

@Component({
  selector: 'app-property-document-dialog-view-component',
  standalone: false,
  templateUrl: './property-document-dialog-view-component.html',
  styleUrls: ['./property-document-dialog-view-component.scss']
})
export class PropertyDocumentDialogViewComponent  implements OnInit {

  currentLang: LanguageCode = 'en';
  get label() {
    return Labels[this.currentLang as keyof typeof Labels];
  }

  fileUrl:any | null = null;
  constructor(
    private service: PropertyDocumentService,
    protected cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    protected dialogRef: MatDialogRef<PropertyDocumentDialogViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PropertyDocumentDTO,
    private langService: LanguageService
  ) {

  }
  ngOnInit(): void {

    if (this.data.data && this.data.contentType) {
      const base64Data = this.data.data;
      const blob = base64ToBlob(base64Data, this.data.contentType);
      const url = URL.createObjectURL(blob);
      this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      this.cdr.markForCheck();
    }

    this.langService.language$.subscribe(lang => {
      this.currentLang = lang;
    });
  }

  isImageFile(): boolean {
    const imageTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/bmp', 'image/webp', 'image/svg+xml'];
    return imageTypes.includes(this.data.contentType?.toLowerCase() || '');
  }

  canPreview(): boolean {
    return this.data.contentType === 'application/pdf' || this.isImageFile();
  }

  download() {
    downloadBlob(this.data.data , this.data.contentType , this.data?.fileName);
  }



  close() {
    this.dialogRef.close();
  }


}
