import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { TransactionInvoice } from '../../../../models/transaction-models/transaction-invoice/transaction-invoice';
import { GetTransactionInvoiceParam } from '../../../../models/transaction-models/transaction-invoice/params/get-transaction-invoice-param';
import { TransactionInvoiceDto } from '../../../../models/transaction-models/transaction-invoice/dtos/transaction-invoice-dto';
import { PaginateRsult } from '../../../../models/paginate-result';
import { TableFormComponent } from '../../../base-components/table-form-component/table-form-component';
import { TransactionInvoiceService } from '../../../../services/transaction-services/transaction-invoice-service';
import { LawFirmDTO } from '../../../../models/law-firm-models/law-firm/dtos/law-firm-dto';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { LanguageService } from '../../../../services/language-service';
import { MenuService } from '../../../../services/menu-service';
import { environment } from '../../../../../environment/environment';

@Component({
  selector: 'app-law-firm-invoices',
  standalone: false,
  templateUrl: './law-firm-invoices-component.html',
  styleUrls: ['../../../_shared/styles/table-style.scss']
})
export class LawFirmInvoicesComponent extends TableFormComponent<TransactionInvoice> {

  @Input() lawFirm!: LawFirmDTO;
  override params: GetTransactionInvoiceParam = {
    page: 0,
    pageSize: 10,
    lawFirmId: 0
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
    override langService: LanguageService,
    private menuService: MenuService,

  ) {
    super(service, cdr, fb, router, errorHandler, route, langService);
  }

  override ngOnInit(): void {
    this.params.lawFirmId = this.lawFirm.id;
    super.ngOnInit();


  }

  override setDisplayColumns() {
    this.displayColumns = [

      {
        key: 'transactionNumber',
        label: this.label.TRANSACTION.TRANSACTION_NUMBER,
        pipes: ['link']
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

  onClickRow(row: any) {

    if (row.key !== 'transactionNumber') return;

    let path =
      this.menuService.getMenuByPath(environment.routes.AllTransactions) ||
      this.menuService.getMenuByPath(environment.routes.ActiveTransactions) ||
      this.menuService.getMenuByPath(environment.routes.ActivePrivateTransactions) ||
      this.menuService.getMenuByPath(environment.routes.ActivePublicTransactions);
    let basePath = this.menuService.getMenuByPath(environment.routes.Transactions);


    this.router.navigateByUrl(basePath?.path + '/' + path?.path + '?id=' + row.element.transactionId);
  }



}
