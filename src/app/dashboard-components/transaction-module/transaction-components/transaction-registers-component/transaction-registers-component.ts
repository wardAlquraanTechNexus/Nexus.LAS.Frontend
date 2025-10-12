import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { TransactionRegister } from '../../../../models/transaction-models/transaction-register/transaction-register';
import { TableFormComponent } from '../../../base-components/table-form-component/table-form-component';
import { TransactionDto } from '../../../../models/transaction-models/transaction/dtos/transaction-dto';
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
import { GetTransactionRegisterByListIdcsQuery } from '../../../../models/transaction-models/transaction-register/params/get-transaction-register-query-by-list-idcs';

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
  @Input() title: string = '';
  @Input() addLabel = '';
  @Input() editLabel = '';
  @Input() enterDetailsLabel = '';
  @Input() icon = "list_alt";
  override params: GetTransactionRegisterByListIdcsQuery = {
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
    if(!this.addLabel){
      this.addLabel = this.label.TRANSACTION.ADD_TRANSACTION_REGISTER;
    }
    if(!this.editLabel){
      this.editLabel = this.label.TRANSACTION.EDIT_TRANSACTION_REGISTER;
    }
    if(!this.enterDetailsLabel){
      this.enterDetailsLabel = this.label.TRANSACTION.ENTER_TRANSACTION_REGISTER_DETAILS;
    }
    if(!this.title){
      this.title = this.label.TRANSACTION.TRANSACTION_REGISTERS;
    }

  }

  override setDisplayColumns() {
    this.displayColumns = [
      {
        key: 'registerId',
        label: this.label.COMMON.NAME,
        sort: true,
        pipes: ['register'],
        compareKey: 'registerIdc',
        keysPipes:[
          { key: 'registerId' , pipes: ['register'] },
          { key: 'primaryRegister' , pipes: ['primary'] }
  
        ]
      },
      { 
        key: 'registerIdc',
        label: this.label.TRANSACTION.REGISTER_TYPE,
        sort: true,
        pipes: ['register-type']
      },
    ];

    if (!this.readonly) {
      this.displayColumns.push(
        { key: "action", label: this.label.COMMON.ACTIONS }
      );
    }
  }
  override fetchData() {
    this.showLoading = true;
    this.service.getPagingByListIdcs(this.params)
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
        addLabel: this.addLabel,
        editLabel: this.editLabel,
        enterDetailsLabel: this.enterDetailsLabel,
        icon: this.icon
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
        addLabel: this.addLabel,
        editLabel: this.editLabel,
        enterDetailsLabel: this.enterDetailsLabel,
        icon: this.icon

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
    element.editLabel = this.editLabel;
    element.addLabel = this.addLabel;
    element.enterDetailsLabel = this.enterDetailsLabel;
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
