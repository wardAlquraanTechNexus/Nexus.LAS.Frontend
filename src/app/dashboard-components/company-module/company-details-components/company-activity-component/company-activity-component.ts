import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { CompanyActivity } from '../../../../models/company-models/company-activity/company-activity';
import { TableFormComponent } from '../../../base-components/table-form-component/table-form-component';
import { DisplayColumn } from '../../../../models/columns/display-column';
import { GetPagingCompanyActivityQuery } from '../../../../models/company-models/company-activity/params/get-paging-company-activity-params';
import { GetCompanyDto } from '../../../../models/company-models/get-company-query/get-company-dto';
import { CompanyActivityService } from '../../../../services/company-services/company-activity-service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { CompanyActivityDto } from '../../../../models/company-models/company-activity/dtos/company-activity-dto';
import { CompanyActivityFormDialogComponent } from './company-activity-form-dialog-component/company-activity-form-dialog-component';
import { PaginateRsult } from '../../../../models/paginate-result';
import { LanguageService } from '../../../../services/language-service';

@Component({
  selector: 'app-company-activity-component',
  standalone: false,
  templateUrl: './company-activity-component.html',
  styleUrl: './company-activity-component.scss'
})
export class CompanyActivityComponent extends TableFormComponent<CompanyActivity> {



  override data: PaginateRsult<CompanyActivityDto> = {
    collection: [],
    page: 0,
    pageSize: 10,
    totalPages: 0,
    totalRecords: 0
  };

  override displayColumns: DisplayColumn[] = [
    {
      key: "activity",
      label: "Activity",
      pipes: ['company-activity'],
    },
    {
      key: "date",
      label: "Date",
      pipes:["date"]
    },
    {
      key: 'action',
      label: 'Actions'
    }
  ]

  override params: GetPagingCompanyActivityQuery = {
    companyId: 0,
    page: 0,
    pageSize: 10
  };
  @Input() company!: GetCompanyDto;

  constructor(
    override service: CompanyActivityService,
    override cdr: ChangeDetectorRef,
    override fb: FormBuilder,
    override router: Router,
    override errorHandler: ErrorHandlerService,
    override route: ActivatedRoute,
    private dialog: MatDialog,
    override langService: LanguageService
  ) {
    super(service, cdr, fb, router, errorHandler, route, langService)
  }
  override ngOnInit(): void {
    this.params.companyId = this.company.id;
    super.ngOnInit();
  }

  override fetchData(): void {
    this.showLoading = true;
    this.loadingService.startLoading('Loading data');

    this.service.getPaging(this.params)
      .subscribe({
        next: (res => {
          res.collection.forEach(item => {
            item.date = item.modifiedAt || item.createdAt;
          })
          this.data = res;
          this.showLoading = false;
          this.loadingService.stopLoading('Loading data');
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



  onAddNew() {
    let element: CompanyActivityDto = {
      id: 0,
      companyId: this.company.id,
      activity: 0,
      createdAt: "",
      modifiedAt: ""
    };
    const dialogRef = this.dialog.open(CompanyActivityFormDialogComponent, {
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
    const dialogRef = this.dialog.open(CompanyActivityFormDialogComponent, {
      disableClose: true,
      data: row
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



}