import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyContractService } from '../../../../../services/company-services/company-contract-service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ErrorHandlerService } from '../../../../../services/error-handler.service';
import { CompanyContractDto } from '../../../../../models/company-models/company-contract/dtos/company-contract-dto';
import { base64ToBlob, downloadBlob } from '../../../../_shared/shared-methods/downloadBlob';


@Component({
  selector: 'app-company-contract-view-dialog-component',
  standalone: false,
  templateUrl: './company-contract-view-dialog-component.html',
  styleUrl: './company-contract-view-dialog-component.scss'
})
export class CompanyContractViewDialogComponent implements OnInit {

  constructor(
    private service: CompanyContractService,
    protected router: Router,
    private errorHandler: ErrorHandlerService,
    protected route: ActivatedRoute,
    protected cdr: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    protected dialogRef: MatDialogRef<CompanyContractViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CompanyContractDto
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
    downloadBlob(this.data.dataFile , this.data.contentType , this.data?.fileName);
  }



  close() {
    this.dialogRef.close();
  }


}
