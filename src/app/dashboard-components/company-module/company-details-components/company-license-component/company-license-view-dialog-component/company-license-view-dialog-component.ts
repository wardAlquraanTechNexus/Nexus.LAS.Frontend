import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompanyLicenseService } from '../../../../../services/company-services/company-license-service';
import { CompanyLicenseDto } from '../../../../../models/company-models/company-license/dtos/company-license-dto';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../../../../../services/error-handler.service';
import { base64ToBlob, downloadBlob } from '../../../../_shared/shared-methods/downloadBlob';
import { Labels } from '../../../../../models/consts/labels';
import { LanguageCode } from '../../../../../models/types/lang-type';
import { LanguageService } from '../../../../../services/language-service';

@Component({
  selector: 'app-company-license-view-dialog-component',
  standalone: false,
  templateUrl: './company-license-view-dialog-component.html',
  styleUrl: './company-license-view-dialog-component.scss'
})
export class CompanyLicenseViewDialogComponent implements OnInit {

  currentLang: LanguageCode = 'en';
  get label() {
    return Labels[this.currentLang as keyof typeof Labels];
  }


  constructor(
    private service: CompanyLicenseService,
    protected router: Router,
    private errorHandler: ErrorHandlerService,
    protected route: ActivatedRoute,
    protected cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    protected dialogRef: MatDialogRef<CompanyLicenseViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CompanyLicenseDto,
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
    downloadBlob(this.data.dataFile, this.data.contentType, this.data?.fileName);
  }



  close() {
    this.dialogRef.close();
  }


}
