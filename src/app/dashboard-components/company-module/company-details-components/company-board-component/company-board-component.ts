import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { GetCompanyDto } from '../../../../models/company-models/get-company-query/get-company-dto';
import { CompanyBoard } from '../../../../models/company-models/company-board/company-board';
import { TableFormComponent } from '../../../base-components/table-form-component/table-form-component';
import { CompanyBoardDto } from '../../../../models/company-models/company-board/dtos/company-board-dto';
import { PaginateRsult } from '../../../../models/paginate-result';
import { GetCompanyBoardParams } from '../../../../models/company-models/company-board/params/get-company-board';
import { DisplayColumn } from '../../../../models/columns/display-column';
import { CompanyBoardService } from '../../../../services/company-services/company-board-service';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyCapitalDto } from '../../../../models/company-models/company-capital/dtos/company-capital-dto';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { CompanyCapitalDialogFormComponent } from '../company-capital-component/company-capital-dialog-form-component/company-capital-dialog-form-component';
import { CompanyBoardDialogFormComponent } from './company-board-dialog-form-component/company-board-dialog-form-component';

@Component({
  selector: 'app-company-board-component',
  standalone:false,
  templateUrl: './company-board-component.html',
  styleUrl: './company-board-component.scss'
})
export class CompanyBoardComponent  extends TableFormComponent<CompanyBoard> {

  @Output() rowClick = new EventEmitter<CompanyBoardDto>();

  override data: PaginateRsult<CompanyBoardDto> = {
    collection: [],
    page: 0,
    pageSize: 10,
    totalPages: 0,
    totalRecords: 0
  };

  override displayColumns: DisplayColumn[] = [
    {
      key:"id",
      label:"Id",
      pipes:["link"]
    },
    {
      key:"boardActive",
      label:"Status",
      pipes:["active", "link"]
    },
    {
      key: 'action',
      label: 'Actions'
    }
  ]

  override params: GetCompanyBoardParams = {
    companyId: 0,
    page: 0,
    pageSize: 10
  };
  @Input() company!: GetCompanyDto;

  constructor(
    override service: CompanyBoardService,
    override cdr: ChangeDetectorRef,
    override fb: FormBuilder,
    override router: Router,
    override errorHandler: ErrorHandlerService,
    override route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    super(service, cdr, fb, router, errorHandler, route)
  }
  override ngOnInit(): void {
    this.params.companyId = this.company.id;
    super.ngOnInit();
  }

  override fetchData(): void {
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
          this.errorHandler.handleApiError(err, 'Failed to load data');
          this.cdr.markForCheck();
        })
      })
  }



  onAddNew() {
    const element: CompanyBoardDto = {
      id: 0,
      companyId: this.company.id,
      boardActive : false
    };
    const dialogRef = this.dialog.open(CompanyBoardDialogFormComponent, {
      disableClose: true,
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchData();
      }
    })
  }

  onEdit(row: any) {
    const element = {...row};
    const dialogRef = this.dialog.open(CompanyBoardDialogFormComponent, {
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

  showTable = true;
  toggleTable() {
    this.showTable = !this.showTable;
  }

  onRowClick(event:any){
    this.rowClick.emit(event.element);
    
  }



}
