import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { TransactionRegister } from '../../../../models/transaction-models/transaction-register/transaction-register';
import { TableFormComponent } from '../../../base-components/table-form-component/table-form-component';
import { TransactionDto } from '../../../../models/transaction-models/transaction/dtos/transaction-dto';
import { GetTransactionRegisterQuery } from '../../../../models/transaction-models/transaction-register/params/get-transaction-register-query';
import { TransactionRegisterDto } from '../../../../models/transaction-models/transaction-register/dtos/transaction-register-dto';
import { PaginateRsult } from '../../../../models/paginate-result';
import { TransactionRegisterService } from '../../../../services/transaction-services/transaction-register-service';
import { TransactionRegisterDialogFormComponent } from './transaction-register-dialog-form-component/transaction-register-dialog-form-component';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { LanguageService } from '../../../../services/language-service';
import { MenuService } from '../../../../services/menu-service';
import { EntityIDc } from '../../../../enums/entity-idc';
import { TransactionRegisterPersonCompanyFormDialogComponent } from './transaction-register-person-company-form-dialog-component/transaction-register-person-company-form-dialog-component';

@Component({
  selector: 'app-transaction-registers',
  standalone: false,
  templateUrl: './transaction-registers-component.html',
  styleUrls: ['../../../_shared/styles/table-style.scss']
})
export class TransactionRegistersComponent extends TableFormComponent<TransactionRegister> {

  @Input() idc!: string;
  @Input() registerTypes?: { idc: string, name: string } [] ;
  @Input() transaction!: TransactionDto;
  @Input() readonly = false;
  override params: GetTransactionRegisterQuery = {
    page: 0,
    pageSize: 10,
    transactionId: 0
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
    this.params.transactionId = this.transaction.id;
    this.params.registerIdcs = this.registerTypes?.map(rt => rt.idc);
    super.ngOnInit();
    if(!this.registerTypes){
      this.registerTypes = [
        { idc: EntityIDc.Company, name: this.label.COMPANY.COMPANY },
        { idc: EntityIDc.Person, name: this.label.PERSON.PERSON },
        { idc: EntityIDc.LawFirm, name: this.label.LAW_FIRM.LAW_FIRM },
      ];
    }

  }

  override setDisplayColumns() {
    this.displayColumns = [

      { 
        key: 'registerIdc',
        label: this.label.TRANSACTION.REGISTER_TYPE,
        sort: true,
        keysPipes:[
          { key: 'registerIdc' , pipes: ['register-type'] },
          { key: 'primaryRegister' , pipes: ['primary'] }

        ]
      },
      {
        key: 'registerId',
        label: this.label.TRANSACTION.REGISTER,
        sort: true,
        pipes: ['register'],
        compareKey: 'registerIdc',
      }
    ];

    if (!this.readonly) {
      this.displayColumns.push(
        { key: "action", label: this.label.COMMON.ACTIONS }
      );
    }
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
    let element: TransactionRegisterDto ;
    if(this.idc == EntityIDc.Company){
      element = {
        id: 0,
        transactionId: this.transaction.id,
        registerIdc: EntityIDc.Company,
        registerId: null,
        primaryRegister: false,
        registerTypes: this.registerTypes,
        companyId : null,
        personId : null,
      };

      const dialogRef = this.dialog.open(TransactionRegisterPersonCompanyFormDialogComponent, {
        disableClose: true,
        data: element
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.fetchData();
        }
      })

    }else{
      element = {
        id: 0,
        transactionId: this.transaction.id,
        registerIdc: this.idc,
        registerId: null,
        primaryRegister: false,
        registerTypes: this.registerTypes,
        companyId : null,
        personId : null,
      };

      const dialogRef = this.dialog.open(TransactionRegisterDialogFormComponent, {
        disableClose: true,
        data: element
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.fetchData();
        }
      })
      
    }
  }

  onEdit(element: TransactionRegisterDto) {
    element.registerTypes = this.registerTypes;
    const dialogRef = this.dialog.open(TransactionRegisterDialogFormComponent, {
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
