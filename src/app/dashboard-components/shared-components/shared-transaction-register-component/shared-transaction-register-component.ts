import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { EntityIDc } from '../../../enums/entity-idc';
import { PaginateRsult } from '../../../models/paginate-result';
import { TransactionRegisterDto } from '../../../models/transaction-models/transaction-register/dtos/transaction-register-dto';
import { TransactionRegister } from '../../../models/transaction-models/transaction-register/transaction-register';
import { TransactionDto } from '../../../models/transaction-models/transaction/dtos/transaction-dto';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { LanguageService } from '../../../services/language-service';
import { MenuService } from '../../../services/menu-service';
import { TransactionRegisterService } from '../../../services/transaction-services/transaction-register-service';
import { TableFormComponent } from '../../base-components/table-form-component/table-form-component';
import { GetTransactionRegisterByQuery } from '../../../models/transaction-models/transaction-register/params/get-transaction-register-by-query';

@Component({
  selector: 'app-shared-transaction-register',
  standalone: false,
  templateUrl: './shared-transaction-register-component.html',
  styleUrls: ['../../_shared/styles/table-style.scss']

})
export class SharedTransactionRegisterComponent extends TableFormComponent<TransactionRegister> {

  @Input() idc!: string;
  @Input() id!: number;
  
  @Input() readonly = false;
  override params: GetTransactionRegisterByQuery = {
    page: 0,
    pageSize: 10,
    
  };
  override data: PaginateRsult<TransactionRegisterDto> = {
    collection: [],
    totalPages: 0,
    totalRecords: 0,
    pageSize: 10,
    page: 0
  };

  constructor(
    override service: TransactionRegisterService,
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
    this.params.registerIdc = this.idc;
    this.params.registerId = this.id;
    super.ngOnInit();
 

  }

  override setDisplayColumns() {
    this.displayColumns = [

      {
        key: 'transactionNumber',
        label: this.label.TRANSACTION.TRANSACTION_NUMBER,
        sort: true,
      },
      {
        key: 'transactionDate',
        label: this.label.TRANSACTION.TRANSACTION_DATE,
        pipes: ['date'],
      },
      {
        key: 'transactionSubjectDecription',
        label: this.label.COMMON.DESCRIPTION,
      },
      {
        key: "subjectType",
        label: this.label.TRANSACTION.SUBJECT_TYPE,
        sort: true,
        pipes: ['transaction-type']
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





}
