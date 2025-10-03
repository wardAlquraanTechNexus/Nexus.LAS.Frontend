import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { TransactionAction } from '../../../../models/transaction-models/transaction-action/transaction-action';
import { TableFormComponent } from '../../../base-components/table-form-component/table-form-component';
import { TransactionDto } from '../../../../models/transaction-models/transaction/dtos/transaction-dto';
import { GetTransactionActionParam } from '../../../../models/transaction-models/transaction-action/params/get-transaction-action-param';
import { TransactionActionDto } from '../../../../models/transaction-models/transaction-action/dtos/transaction-dto';
import { PaginateRsult } from '../../../../models/paginate-result';
import { TransactionActionService } from '../../../../services/transaction-services/transaction-action-service';
import { TransactionActionsDialogFormComponent } from './transaction-actions-dialog-form-component/transaction-actions-dialog-form-component';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { LanguageService } from '../../../../services/language-service';
import { MenuService } from '../../../../services/menu-service';
import { TransactionActionViewDialogComponent } from './transaction-action-view-dialog-component/transaction-action-view-dialog-component';

@Component({
  selector: 'app-transaction-actions',
  standalone: false,
  templateUrl: './transaction-actions-component.html',
  styleUrls: ['../../../_shared/styles/table-style.scss']
})
export class TransactionActionsComponent  extends TableFormComponent<TransactionAction> {

  @Input() transaction!: TransactionDto;
  override params: GetTransactionActionParam = {
    page: 0,
    pageSize: 10,
    transactionId: 0
  };
  override data: PaginateRsult<TransactionActionDto> = {
    collection: [],
    totalPages: 0,
    totalRecords: 0,
    pageSize: 10,
    page: 0
  };

  constructor(
    override service: TransactionActionService,
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
    this.params.transactionId = this.transaction.id;
    super.ngOnInit();

  }

  override setDisplayColumns() {
    this.displayColumns = [

      {
        key: "id",
        label: this.label.COMMON.ID,
      },
      { 
        key: 'personId',
        label: this.label.PROPERTY.OWNER,
        pipes: ['person']
      },
      {
        key: 'description',
        label: this.label.COMMON.DESCRIPTION,
      },
      {
        key: 'dueDate',
        label: this.label.TRANSACTION.DUE_DATE,
        pipes: ['date']
      },
      {
        key: 'closedDate',
        label: this.label.TRANSACTION.CLOSED_DATE,
        pipes: ['date']
      },
      { 
        key: 'actionStatus',
        label: this.label.COMMON.STATUS,
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
    let element: TransactionActionDto = {
      id: 0,
      transactionId: this.transaction.id,
      personId: null,
      time: null,
      description: '',
      dueDate: null,
      closedDate: null,
      files: [],
    };
    const dialogRef = this.dialog.open(TransactionActionsDialogFormComponent, {
      disableClose: true,
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchData();
      }
    })
  }

  onEdit(element: TransactionActionDto) {
    const dialogRef = this.dialog.open(TransactionActionsDialogFormComponent, {
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

  viewFiles(row: TransactionActionDto) {
  if (!row.files || row.files.length === 0) {
    this.errorHandler.handleError('No files available for this transaction action.');
    return;
  }

  // Option 1: Open a dialog (Angular Material example)
  this.dialog.open(TransactionActionViewDialogComponent, {
    width: '600px',
    data: { files: row.files }
  });

  
}




}
