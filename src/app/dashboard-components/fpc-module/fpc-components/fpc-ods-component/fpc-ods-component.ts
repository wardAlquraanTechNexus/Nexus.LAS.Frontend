import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { FPCOD } from '../../../../models/fpc-models/fpc-od/fpc-od';
import { TableFormComponent } from '../../../base-components/table-form-component/table-form-component';
import { FPCDto } from '../../../../models/fpc-models/fpc/dtos/fpc-dto';
import { GetFPCODParam } from '../../../../models/fpc-models/fpc-od/params/get-fpc-od';
import { FPCODDto } from '../../../../models/fpc-models/fpc-od/dtos/fpc-od-dto';
import { PaginateRsult } from '../../../../models/paginate-result';
import { FPCODService } from '../../../../services/fpc-services/fpc-od-service';
import { LanguageService } from '../../../../services/language-service';
import { MenuService } from '../../../../services/menu-service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { FormBuilder } from '@angular/forms';
import { FpcOdDialogFormComponent } from './fpc-od-dialog-form-component/fpc-od-dialog-form-component';
import { base64ToBlob } from '../../../_shared/shared-methods/downloadBlob';

@Component({
  selector: 'app-fpc-ods',
  standalone: false,
  templateUrl: './fpc-ods-component.html',
  styleUrls: ['../../../_shared/styles/table-style.scss']
})
export class FpcOdsComponent  extends TableFormComponent<FPCOD> {

  @Input() fpc!: FPCDto;
  @Output() onChangeOd = new EventEmitter<FPCODDto>();
  override params: GetFPCODParam = {
    page: 0,
    pageSize: 10,
    fpcIdn: 0
  };
  override data: PaginateRsult<FPCODDto> = {
    collection: [],
    totalPages: 0,
    totalRecords: 0,
    pageSize: 10,
    page: 0
  };

  constructor(
    override service: FPCODService,
    override cdr: ChangeDetectorRef,
    override fb: FormBuilder,
    override router: Router,
    override errorHandler: ErrorHandlerService,
    override route: ActivatedRoute,
    private dialog: MatDialog,
    private menuService: MenuService,
    override langService: LanguageService,
  ) {
    super(service, cdr, fb, router, errorHandler, route, langService);
  }

  override ngOnInit(): void {
    this.params.fpcIdn = this.fpc.id;
    super.ngOnInit();

  }

  override setDisplayColumns() {
    this.displayColumns = [

      {
        key: "id",
        label: this.label.COMMON.ID,
      },
      { 
        key: 'docType',
        label: this.label.FPC.DOCUMENT_TYPE,
        pipes: ['original-document-type', 'link']
      },
      {
        key: 'description',
        label: this.label.COMMON.DESCRIPTION,
        pipes: ['link']
      },
      {
        key: "action", 
        label: this.label.COMMON.ACTIONS
      }
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
    let element: FPCODDto = {
      id: 0,
      fpcIdn: this.fpc.id,
      docType: null,
      description: null,
    };
    const dialogRef = this.dialog.open(FpcOdDialogFormComponent, {
      disableClose: true,
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchData();
      }
    })
  }

  onEdit(element: FPCODDto) {
    const dialogRef = this.dialog.open(FpcOdDialogFormComponent, {
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

  onRowClick(element: any) {
    if(element.key == "description" || element.key == "docType"){
      this.onChangeOd.emit(element.element);
    }
  }
}