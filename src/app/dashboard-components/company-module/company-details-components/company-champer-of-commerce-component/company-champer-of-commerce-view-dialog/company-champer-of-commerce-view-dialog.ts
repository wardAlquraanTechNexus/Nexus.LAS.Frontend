import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { CompanyChamperOfCommerceService } from '../../../../../services/company-services/company-champer-of-commerce-service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ErrorHandlerService } from '../../../../../services/error-handler.service';
import { base64ToBlob, downloadBlob } from '../../../../_shared/shared-methods/downloadBlob';
import { CompanyChamberOfCommerceDTO } from '../../../../../models/company-models/company-champer-of-commerce/dtos/company-champer-of-commerce-dto';
import { LanguageService } from '../../../../../services/language-service';
import { Labels } from '../../../../../models/consts/labels';
import { LanguageCode } from '../../../../../models/types/lang-type';

@Component({
  selector: 'app-company-champer-of-commerce-view-dialog',
  standalone: false,
  templateUrl: './company-champer-of-commerce-view-dialog.html',
  styleUrl: './company-champer-of-commerce-view-dialog.scss'
})
export class CompanyChamperOfCommerceViewDialog  implements OnInit {

   currentLang: LanguageCode = 'en';
    get label() {
      return Labels[this.currentLang as keyof typeof Labels];
    }
    
  constructor(
    private service: CompanyChamperOfCommerceService,
    protected router: Router,
    private errorHandler: ErrorHandlerService,
    protected route: ActivatedRoute,
    protected cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    protected dialogRef: MatDialogRef<CompanyChamperOfCommerceViewDialog>,
    @Inject(MAT_DIALOG_DATA) public data: CompanyChamberOfCommerceDTO,
    private langService: LanguageService,
  ) {

  }
  ngOnInit(): void {

    if (this.data.dataFile && this.data.contentType) {
      const base64Data = this.data.dataFile;
      const blob = base64ToBlob(base64Data, this.data.contentType);
      const url = URL.createObjectURL(blob);
      this.data.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      this.cdr.markForCheck();
    }

    
    this.langService.language$.subscribe(lang => {
      this.currentLang = lang;
    });
  }

  download() {
    downloadBlob(this.data.dataFile , this.data.contentType , this.data?.fileName);
  }



  close() {
    this.dialogRef.close();
  }


}
