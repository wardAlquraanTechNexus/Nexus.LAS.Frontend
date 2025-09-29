import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LawFirmCounsel } from '../../../../models/law-firm-models/law-firm-counsel/law-firm-counsel';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { LanguageService } from '../../../../services/language-service';
import { LawFirmCounselService } from '../../../../services/law-firm-services/law-firm-counsel-service';
import { TableFormComponent } from '../../../base-components/table-form-component/table-form-component';
import { LawFirmDTO } from '../../../../models/law-firm-models/law-firm/dtos/law-firm-dto';
import { GetLawFirmCounselQuery } from '../../../../models/law-firm-models/law-firm-counsel/params/get-law-firm-counsel-query';
import { LawFirmCounselDto } from '../../../../models/law-firm-models/law-firm-counsel/dtos/law-firm-counsel-dto';
import { PaginateRsult } from '../../../../models/paginate-result';
import { LawFirmCounselDialogFormComponent } from './law-firm-counsel-dialog-form-component/law-firm-counsel-dialog-form-component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-law-firm-counsels',
  standalone: false,
  templateUrl: './law-firm-counsels-component.html',
  styleUrls: ['../../../_shared/styles/table-style.scss']
})
export class LawFirmCounselsComponent extends TableFormComponent<LawFirmCounsel> {

  @Input() lawFirm!: LawFirmDTO;
  override params: GetLawFirmCounselQuery = {
    page: 0,
    pageSize: 10,
    lawFirmId: 0
  };
  override data: PaginateRsult<LawFirmCounselDto> = {
    collection: [],
    totalPages: 0,
    totalRecords: 0,
    pageSize: 10,
    page: 0
  };

  constructor(
    override service: LawFirmCounselService,
    override cdr: ChangeDetectorRef,
    override fb: FormBuilder,
    override router: Router,
    override errorHandler: ErrorHandlerService,
    override route: ActivatedRoute,
    override langService: LanguageService,
    private dialog: MatDialog
  ) {
    super(service, cdr, fb, router, errorHandler, route, langService);
  }

  override ngOnInit(): void {
    this.params.lawFirmId = this.lawFirm.id;
    super.ngOnInit();
  }

  override setDisplayColumns() {
    this.displayColumns = [
      { key: 'counselName', label: this.label.LAW_FIRM.COUNSEL_NAME || 'Counsel Name' },
      { key: 'counselLevel', label: this.label.LAW_FIRM.COUNSEL_LEVEL || 'Counsel Level', pipes: ['staff-level'] },
      { key: 'rate', label: this.label.LAW_FIRM.COUNSEL_RATE || 'Rate' },
      { key: "action", label: this.label.COMMON.ACTIONS}
    ];
  }


  override fetchData() {
    this.showLoading = true;
    this.service.getPaging(this.params)
      .subscribe({
        next: (res => {
          this.data = res;
          this.showLoading = false;
          this.cdr.markForCheck();
        }),
        error: (err => {
          this.showLoading = false;
          this.loadingService.stopLoading('Loading data');
          this.errorHandler.handleApiError(err, 'Failed to load data');
          this.cdr.markForCheck();
        })
      })
  }

  showTable = true;
  toggleTable() {
    this.showTable = !this.showTable;
  }


  onAddNew() {
    let element: LawFirmCounselDto = {
      id: 0,
      lawFirmId: this.lawFirm.id,
      counselName: null,
      counselLevel: null,
      rate: null
    };
    const dialogRef = this.dialog.open(LawFirmCounselDialogFormComponent, {
      disableClose: true,
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchData();
      }
    })
  }

  onEdit(element: LawFirmCounselDto) {

    const dialogRef = this.dialog.open(LawFirmCounselDialogFormComponent, {
      disableClose: true,
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchData();
      }
    })
  }

  deleteFn(id: number) {
    return () => this.delete(id);
  }

  delete(id: number) {
    this.showLoading = true;
    this.service.delete(id).subscribe({
      next: (res => {
        this.errorHandler.showSuccess("Deleted Successfully");
        this.showLoading = false;
        this.fetchData();
      }), error: (err => {
        this.showLoading = false;
      })
    })
  }
  
}
