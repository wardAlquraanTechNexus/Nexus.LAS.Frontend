import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { CompanyChamberOfCommerceService } from '../../../../../services/company-services/company-chamber-of-commerce-service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ErrorHandlerService } from '../../../../../services/error-handler.service';
import { base64ToBlob, downloadBlob } from '../../../../_shared/shared-methods/downloadBlob';
import { CompanyChamberOfCommerceDTO } from '../../../../../models/company-models/company-chamber-of-commerce/dtos/company-chamber-of-commerce-dto';
import { LanguageService } from '../../../../../services/language-service';
import { Labels } from '../../../../../models/consts/labels';
import { LanguageCode } from '../../../../../models/types/lang-type';

@Component({
  selector: 'app-company-chamber-of-commerce-view-dialog',
  standalone: false,
  templateUrl: './company-chamber-of-commerce-view-dialog.html',
  styleUrl: './company-chamber-of-commerce-view-dialog.scss'
})
export class CompanyChamberOfCommerceViewDialog  implements OnInit {

  fileUrl:any;
   currentLang: LanguageCode = 'en';
    get label() {
      return Labels[this.currentLang as keyof typeof Labels];
    }

  constructor(
    private service: CompanyChamberOfCommerceService,
    protected router: Router,
    private errorHandler: ErrorHandlerService,
    protected route: ActivatedRoute,
    protected cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    protected dialogRef: MatDialogRef<CompanyChamberOfCommerceViewDialog>,
    @Inject(MAT_DIALOG_DATA) public data: CompanyChamberOfCommerceDTO,
    private langService: LanguageService,
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
