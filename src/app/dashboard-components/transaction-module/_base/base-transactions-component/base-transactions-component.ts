import { ChangeDetectorRef, Component } from '@angular/core';
import { Transaction } from '../../../../models/transaction-models/transaction/transaction';
import { TransactionDto } from '../../../../models/transaction-models/transaction/dtos/transaction-dto';
import { Observable } from 'rxjs';
import { CommonStatus } from '../../../../enums/common-status';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TableFormComponent } from '../../../base-components/table-form-component/table-form-component';
import { PaginateRsult } from '../../../../models/paginate-result';
import { GetTransactionQuery } from '../../../../models/transaction-models/transaction/params/get-transaction-query';
import { TransactionService } from '../../../../services/transaction-services/transaction-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { MenuService } from '../../../../services/menu-service';
import { MatDialog } from '@angular/material/dialog';
import { DynamicListService } from '../../../../services/dynamic-list-service';
import { LanguageService } from '../../../../services/language-service';
import { environment } from '../../../../../environment/environment';
import { TransactionDialogFormComponent } from '../../transaction-dialog-form-component/transaction-dialog-form-component';
import { downloadBlobFile } from '../../../_shared/shared-methods/downloadBlob';

@Component({
  selector: 'app-base-transactions-component',
  standalone: false,
  templateUrl: './base-transactions-component.html',
  styleUrl: './base-transactions-component.scss'
})
export class BaseTransactionsComponent extends TableFormComponent<Transaction> {

  activeStatus = CommonStatus.Active;
  inactiveStatus = CommonStatus.Inactive;
  transactionTypeId!: number;

  formGroup!: FormGroup;

  statuses = [
    {
      value: CommonStatus.New, label: this.label.COMMON.NEW
    },
    {
      value: CommonStatus.Active, label: this.label.COMMON.ACTIVE
    },
    {
      value: CommonStatus.Inactive, label: this.label.COMMON.INACTIVE
    }
  ];


  selectedProperties: TransactionDto[] = [];
  override data: PaginateRsult<TransactionDto> = {
    collection: [],
    totalPages: 0,
    totalRecords: 0,
    pageSize: 10,
    page: 0
  };

  override params: GetTransactionQuery = {
    page: 0,
    pageSize: 10,
    orderBy: 'id',
    orderDir: 'desc'
  }

  showFilters = false;

  constructor(
    override service: TransactionService,
    override cdr: ChangeDetectorRef,
    override fb: FormBuilder,
    override router: Router,
    override errorHandler: ErrorHandlerService,
    override route: ActivatedRoute,
    protected menuService: MenuService,
    protected dialog: MatDialog,
    protected dlService: DynamicListService,
    override langService: LanguageService,

  ) {
    super(service, cdr, fb, router, errorHandler, route, langService);
  }

  override ngOnInit(): void {
    super.ngOnInit();

    this.statuses = [
      {
        value: CommonStatus.New, label: this.label.COMMON.NEW
      },
      {
        value: CommonStatus.Active, label: this.label.COMMON.ACTIVE
      },
      {
        value: CommonStatus.Inactive, label: this.label.COMMON.INACTIVE
      }
    ];
    this.transactionTypeId = environment.rootDynamicLists.transactionTypes;


    this.formGroup = this.fb.group(
      {
        subjectType: [null],
      },
    );


  }

  override fetchData(): void {
    this.showLoading = true;
    this.service.getPaging(this.params).subscribe({
      next: (res => {
        this.data = res;
        this.showLoading = false;
        this.cdr.markForCheck();
      }), error: (err => {
        this.showLoading = false;
        this.cdr.markForCheck();
      })
    })
  }

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  onAddNew() {
    const element: TransactionDto = {
      id: 0,
      transactionDate: null,
      transactionCode: '',
      subjectType: null,
      subjectDescription: null,
      status: null,
      private: false,

    };
    const dialogRef = this.dialog.open(TransactionDialogFormComponent, {
      disableClose: true,
      data: element,
      // width: '900px',
      // maxWidth: '95vw',
      // minWidth: '800px',
      panelClass: 'property-dialog-panel'
    });

    let path =
      this.menuService.getMenuByPath(environment.routes.AllTransactions) ||
      this.menuService.getMenuByPath(environment.routes.ActiveTransactions) ||
      this.menuService.getMenuByPath(environment.routes.ActivePrivateTransactions) ||
      this.menuService.getMenuByPath(environment.routes.ActivePublicTransactions);
    let basePath = this.menuService.getMenuByPath(environment.routes.Transactions);


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { id: result.id },
        });
      }
    })
  }

  onEdit(row: any) {
    const element = { ...row };
    const dialogRef = this.dialog.open(TransactionDialogFormComponent, {
      disableClose: true,
      data: element,
      width: '900px',
      maxWidth: '95vw',
      minWidth: '800px',
      panelClass: 'property-dialog-panel'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchData();
      }
    })

  }

  onSubjectTypeChange($event: any) {
    this.params.subjectType = $event;
    this.fetchData();
  }


  bulkChangeStatus(status: CommonStatus) {
    this.showLoading = true;
    this.service.updateStatus({
      ids: this.selectedProperties.map(x => x.id),
      status: status
    }).subscribe({
      next: (res => {
        this.errorHandler.showSuccess("Updated Successfully");
        this.selectedProperties = [];
        this.fetchData();
      }), error: (err => {
        this.showLoading = false;
        this.cdr.markForCheck();
      })
    })
  }
  bulkChangePrivate(isPrivate: boolean) {
    this.showLoading = true;
    this.service.updatePrivate({
      ids: this.selectedProperties.map(x => x.id),
      isPrivate: isPrivate
    }).subscribe({
      next: (res => {
        this.errorHandler.showSuccess("Updated Successfully");
        this.selectedProperties = [];

        this.fetchData();
      }), error: (err => {
        this.showLoading = false;
        this.cdr.markForCheck();
      })
    })
  }



  activate(event: any) {
    this.changeStatus(event, CommonStatus.Active);
  }
  deactivate(event: any) {
    this.changeStatus(event, CommonStatus.Inactive);
  }
  markPublic(event: any) {
    this.changePrivate(event, false);
  }
  markPrivate(event: any) {
    this.changePrivate(event, true);

  }
  deleteCompany(event: any) {
    return () => this.deleteCompanyAfterConfirm(event);
  }

  deleteCompanyAfterConfirm(event: any) {
    this.showLoading = true;
    this.service.delete(event.id).subscribe({
      next: (res => {
        this.errorHandler.showSuccess("Deleted Successfully");
        this.fetchData();
      }), error: (err => {
        this.showLoading = false;
        this.cdr.markForCheck();
      })
    })
  }


  changeStatus(event: any, status: CommonStatus) {
    this.showLoading = true;
    this.service.updateStatus({
      ids: [event.id],
      status: status
    }).subscribe({
      next: (res => {
        this.errorHandler.showSuccess("Updated Successfully");
        this.fetchData();
      }), error: (err => {
        this.showLoading = false;
        this.cdr.markForCheck();
      })
    })
  }

  changePrivate(event: any, isPrivate: boolean) {
    this.showLoading = true;
    this.service.updatePrivate({
      ids: [event.id],
      isPrivate: isPrivate
    }).subscribe({
      next: (res => {
        this.errorHandler.showSuccess("Updated Successfully");
        this.fetchData();
      }), error: (err => {
        this.showLoading = false;
        this.cdr.markForCheck();
      })
    })
  }

  onSelectionChange(selectedRows: TransactionDto[]) {
    this.selectedProperties = selectedRows;
    this.cdr.markForCheck();
  }


  getAuditTooltip(person: any): string {
    const createdBy = person?.createdBy || 'N/A';
    const createdAt = person?.createdAt ? new Date(person.createdAt).toLocaleDateString('en-GB') : 'N/A';
    const modifiedBy = person?.modifiedBy || 'N/A';
    const modifiedAt = person?.modifiedAt ? new Date(person.modifiedAt).toLocaleDateString('en-GB') : 'N/A';

    return `Created by: ${createdBy}\nCreated at: ${createdAt}\n\nModified by: ${modifiedBy}\nModified at: ${modifiedAt}`;
  }

  onRowClick(event: any) {
    if (event.key == "transactionCode") {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { id: event.element.id },
      });
    }
  }

  exportToExcel() {
    this.service.exportToExcel(this.params).subscribe(res => {
      // Assuming res.data is base64 string:
      const binaryString = atob(res.data);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const blob = new Blob([bytes], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });


      downloadBlobFile(blob, res.fileName || 'export.xlsx');
    });
  }


   exportToPdf(id: number) {
      this.service.exportToPdf({ id: id }).subscribe(res => {
        // Assuming res.data is a base64 string
        const binaryString = atob(res.data);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
  
        const blob = new Blob([bytes], {
          type: 'application/pdf'
        });
  
        downloadBlobFile(blob, res.fileName || 'report.pdf');
      });
    }



}