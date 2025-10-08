import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { TableFormComponent } from '../../../base-components/table-form-component/table-form-component';
import { FPCODAction } from '../../../../models/fpc-models/fpc-od-action/fpc-od-action';
import { FPCODDto } from '../../../../models/fpc-models/fpc-od/dtos/fpc-od-dto';
import { GetFPCODActionParam } from '../../../../models/fpc-models/fpc-od-action/params/get-fpc-od-action-param';
import { PaginateRsult } from '../../../../models/paginate-result';
import { FpcOdActionService } from '../../../../services/fpc-services/fpc-od-action-service';
import { FPCODActionDto } from '../../../../models/fpc-models/fpc-od-action/dtos/fpc-od-action-dto';
import { FpcOdActionDialogFormComponent } from './fpc-od-action-dialog-form-component/fpc-od-action-dialog-form-component';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { LanguageService } from '../../../../services/language-service';
import { MenuService } from '../../../../services/menu-service';

@Component({
  selector: 'app-fpc-od-actions',
  standalone: false,
  templateUrl: './fpc-od-actions-component.html',
  styleUrls: ['../../../_shared/styles/table-style.scss']
})
export class FpcOdActionsComponent extends TableFormComponent<FPCODAction> {

  @Input() fpcOd!: FPCODDto;
  override params: GetFPCODActionParam = {
    page: 0,
    pageSize: 10,
    fpcOdIdn: 0
  };
  override data: PaginateRsult<FPCODActionDto> = {
    collection: [],
    totalPages: 0,
    totalRecords: 0,
    pageSize: 10,
    page: 0
  };

  constructor(
    override service: FpcOdActionService,
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
    debugger
    this.params.fpcOdIdn = this.fpcOd.id;
    super.ngOnInit();

  }

  override setDisplayColumns() {
    this.displayColumns = [

      {
        key: "id",
        label: this.label.COMMON.ID,
      },
      { 
        key: 'actionType',
        label: this.label.FPC.ACTION_TYPE,
        pipes: ['original-document-action-type']
      },
      { 
        key: 'actionDate',
        label: this.label.FPC.ACTION_DATE,
        pipes: ['date']
      },
      {
        key: 'actionDescription',
        label: this.label.COMMON.DESCRIPTION,
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
    let element: FPCODActionDto = {
      id: 0,
      fpcOdIdn: this.fpcOd.id,
      actionType: 0,
      actionDate: null,
      actionDescription: null
    };
    const dialogRef = this.dialog.open(FpcOdActionDialogFormComponent, {
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
    const dialogRef = this.dialog.open(FpcOdActionDialogFormComponent, {
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