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

@Component({
  selector: 'app-person-other-document-dialog-view-component',
  standalone:false,
  templateUrl: './person-other-document-dialog-view-component.html',
  styleUrl: './person-other-document-dialog-view-component.scss'
})
export class PersonOtherDocumentDialogViewComponent  implements OnInit {

  constructor(
    private service: PersonOtherDocumentService,
    protected router: Router,
    private errorHandler: ErrorHandlerService,
    protected route: ActivatedRoute,
    protected cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    protected dialogRef: MatDialogRef<PersonIdDocumentViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PersonOtherDocumentDTO
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
  }

  download() {
    downloadBlob(this.data.dataFile , this.data.contentType! , this.data?.fileName!);
  }



  close() {
    this.dialogRef.close();
  }


}
