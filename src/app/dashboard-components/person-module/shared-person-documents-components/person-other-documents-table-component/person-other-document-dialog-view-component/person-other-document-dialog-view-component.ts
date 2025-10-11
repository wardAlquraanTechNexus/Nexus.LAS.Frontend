import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { PersonOtherDocumentService } from '../../../../../services/person-services/person-other-document-service';
import { Person } from '../../../../../models/person-models/person';
import { PersonOtherDocumentDTO } from '../../../../../models/person-models/person-other-document/person-other-document-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ErrorHandlerService } from '../../../../../services/error-handler.service';
import { base64ToBlob, downloadBlob } from '../../../../_shared/shared-methods/downloadBlob';
import { PersonIdDocumentViewComponent } from '../../person-id-documents-table-component/person-id-document-view-component/person-id-document-view-component';
import { ComponentsModule } from "../../../../../components/components-module";
import { LanguageService } from '../../../../../services/language-service';
import { Labels } from '../../../../../models/consts/labels';
import { LanguageCode } from '../../../../../models/types/lang-type';

@Component({
  selector: 'app-person-other-document-dialog-view-component',
  standalone:false,
  templateUrl: './person-other-document-dialog-view-component.html',
  styleUrl: './person-other-document-dialog-view-component.scss'
})
export class PersonOtherDocumentDialogViewComponent  implements OnInit {

  fileUrl:any;
  currentLang: LanguageCode = 'en';
  get label() {
    return Labels[this.currentLang as keyof typeof Labels];
  }

  constructor(
    private service: PersonOtherDocumentService,
    protected router: Router,
    private errorHandler: ErrorHandlerService,
    protected route: ActivatedRoute,
    protected cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    protected dialogRef: MatDialogRef<PersonIdDocumentViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PersonOtherDocumentDTO,
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

  download() {
    downloadBlob(this.data.data , this.data.contentType! , this.data?.fileName!);
  }

  close() {
    this.dialogRef.close();
  }
}
