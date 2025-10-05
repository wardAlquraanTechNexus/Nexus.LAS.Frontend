import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { TransactionInvoice } from '../../../../models/transaction-models/transaction-invoice/transaction-invoice';
import { TableFormComponent } from '../../../base-components/table-form-component/table-form-component';
import { TransactionDto } from '../../../../models/transaction-models/transaction/dtos/transaction-dto';
import { GetTransactionInvoiceParam } from '../../../../models/transaction-models/transaction-invoice/params/get-transaction-invoice-param';
import { TransactionInvoiceDto } from '../../../../models/transaction-models/transaction-invoice/dtos/transaction-invoice-dto';
import { PaginateRsult } from '../../../../models/paginate-result';
import { TransactionInvoiceService } from '../../../../services/transaction-services/transaction-invoice-service';
import { TransactionInvoicesDialogFormComponent } from './transaction-invoices-dialog-form-component/transaction-invoices-dialog-form-component';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { LanguageService } from '../../../../services/language-service';
import { MenuService } from '../../../../services/menu-service';
import { base64ToBlob } from '../../../_shared/shared-methods/downloadBlob';

@Component({
  selector: 'app-transaction-invoices',
  standalone: false,
  templateUrl: './transaction-invoices-component.html',
  styleUrls: ['../../../_shared/styles/table-style.scss']
})
export class TransactionInvoicesComponent extends TableFormComponent<TransactionInvoice> {

  @Input() transaction!: TransactionDto;
  override params: GetTransactionInvoiceParam = {
    page: 0,
    pageSize: 10,
    transactionId: 0
  };
  override data: PaginateRsult<TransactionInvoiceDto> = {
    collection: [],
    totalPages: 0,
    totalRecords: 0,
    pageSize: 10,
    page: 0
  };

  constructor(
    override service: TransactionInvoiceService,
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
        key: 'lawFirmId',
        label: this.label.LAW_FIRM.LAW_FIRM,
        pipes: ['law-firm']
      },
      {
        key: 'invoice',
        label: this.label.TRANSACTION.INVOICE_NUMBER,
      },
      {
        key: 'invoiceDate',
        label: this.label.TRANSACTION.INVOICE_DATE,
        pipes: ['date']
      },
      {
        key: 'amount',
        label: this.label.TRANSACTION.AMOUNT,
        pipes: ['currency'],
        compareKey: 'currency'
      },
      {
        key: 'paid',
        label: this.label.TRANSACTION.PAID,
        pipes: ['currency'],
        compareKey: 'currency'
      },
      {
        key: "note",
        label: this.label.COMMON.NOTES,
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
    let element: TransactionInvoiceDto = {
      id: 0,
      transactionId: this.transaction.id,
      lawFirmId: null,
      invoice: null,
      invoiceDate: null,
      amount: null,
      paid: null,
      currency: null,
      note: null,
      file: null,
      imageUrl: null,
    };
    const dialogRef = this.dialog.open(TransactionInvoicesDialogFormComponent, {
      disableClose: true,
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchData();
      }
    })
  }

  onEdit(element: TransactionInvoiceDto) {
    const dialogRef = this.dialog.open(TransactionInvoicesDialogFormComponent, {
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


  previewFile(ti: TransactionInvoiceDto) {
    if (ti.data) {
      const fileBlob = base64ToBlob(ti.data, ti.contentType!);
      const file = new File([fileBlob], ti.fileName || 'file', { type: ti.contentType! });

      const url = URL.createObjectURL(file);
      if (!url) return;
      window.open(url, '_blank');
      URL.revokeObjectURL(url); // free memory after use
    }
  }






}
