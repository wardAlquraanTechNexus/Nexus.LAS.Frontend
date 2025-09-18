import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { PersonIdDetailService } from '../../../../../services/person-services/person-id-detail-service';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonIdDetailDto } from '../../../../../models/person-models/person-id-details/person-id-details-dto';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ErrorHandlerService } from '../../../../../services/error-handler.service';
import { base64ToBlob, downloadBlob } from '../../../../_shared/shared-methods/downloadBlob';
import { LanguageService } from '../../../../../services/language-service';
import { Labels } from '../../../../../models/consts/labels';
import { LanguageCode } from '../../../../../models/types/lang-type';

@Component({
  selector: 'app-person-id-document-view-component',
  standalone:false,
  templateUrl: './person-id-document-view-component.html',
  styleUrl: './person-id-document-view-component.scss'
})
export class PersonIdDocumentViewComponent  implements OnInit {

  currentLang: LanguageCode = 'en';
  get label() {
    return Labels[this.currentLang as keyof typeof Labels];
  }

  constructor(
    private service: PersonIdDetailService,
    protected router: Router,
    private errorHandler: ErrorHandlerService,
    protected route: ActivatedRoute,
    protected cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    protected dialogRef: MatDialogRef<PersonIdDocumentViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PersonIdDetailDto,
    private langService: LanguageService
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
