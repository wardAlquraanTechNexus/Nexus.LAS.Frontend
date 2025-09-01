import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { TableFormComponent } from '../../../base-components/table-form-component/table-form-component';
import { CompaniesShareHolder } from '../../../../models/company-models/company-share-holder/company-share-holder';
import { CompaniesShareHolderDto } from '../../../../models/company-models/company-share-holder/dtos/company-share-holder-dto';
import { PaginateRsult } from '../../../../models/paginate-result';
import { DisplayColumn } from '../../../../models/columns/display-column';
import { GetPagingCompanyShareHolderParams } from '../../../../models/company-models/company-share-holder/params/get-paging-company-shareholder-params';
import { GetCompanyDto } from '../../../../models/company-models/get-company-query/get-company-dto';
import { CompanyShareHolderService } from '../../../../services/company-services/company-share-holder-service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { CompanyShareholderDialogFormComponent } from './company-shareholder-dialog-form-component/company-shareholder-dialog-form-component';
import { EntityIDc } from '../../../../enums/entity-idc';
import { CompanyCapitalService } from '../../../../services/company-services/company-capital-service';

@Component({
  selector: 'app-company-shareholder-component',
  standalone:false,
  templateUrl: './company-shareholder-component.html',
  styleUrl: './company-shareholder-component.scss'
})
export class CompanyShareholderComponent extends TableFormComponent<CompaniesShareHolder> {



  override data: PaginateRsult<CompaniesShareHolderDto> = {
    collection: [],
    page: 0,
    pageSize: 10,
    totalPages: 0,
    totalRecords: 0
  };

  override displayColumns: DisplayColumn[] = [
    {
      key: "registerName",
      label: "Registers",
      pipes: ["link"]
    },
    {
      key: "registersIdc",
      label: "Type",
      pipes: ['register-type'],
    },
    {
      key: "numbersOfShares",
      label: "No. of shares",
    },
     {
      key: "sharePercent",
      label: "% of Shares",
      pipes: ["percentage"]
    },
     {
      key: "shareHolderDate",
      label: "Date Of Appointment",
      pipes:['date']
    }, 
    {
      key: "cessationDate",
      label: "Date of Cessation",
      pipes: ["date"]
    }, 
    {
      key: "shareHolderActive",
      label: "Shareholder Status",
      pipes:['company-shareholder-status']
    }, 
    {
      key: 'action',
      label: 'Actions'
    }
  ]

  override params: GetPagingCompanyShareHolderParams = {
    companyId: 0,
    page: 0,
    pageSize: 10
  };
  @Input() company!: GetCompanyDto;

  constructor(
    override service: CompanyShareHolderService,
    override cdr: ChangeDetectorRef,
    override fb: FormBuilder,
    override router: Router,
    override errorHandler: ErrorHandlerService,
    override route: ActivatedRoute,
    private dialog: MatDialog,
    private companyCapitalService: CompanyCapitalService
  ) {
    super(service, cdr, fb, router, errorHandler, route)
  }
  override ngOnInit(): void {
    this.params.companyId = this.company.id;
    super.ngOnInit();

    this.companyCapitalService.activeCapitalUpdated$.subscribe(capital => {
    if (capital.companyId === this.company.id) {
      this.fetchData(); 
    }
  });
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
    const element: CompaniesShareHolderDto = {
      id: 0,
      shareHoldersGroupsId: undefined,
      registersIdc: EntityIDc.Person,
      registersIdn: 0,
      numbersOfShares: 0,
      shareHolderDate: "",
      shareHolderActive: false,
      companyId: this.company.id,
    };
    const dialogRef = this.dialog.open(CompanyShareholderDialogFormComponent, {
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
    const dialogRef = this.dialog.open(CompanyShareholderDialogFormComponent, {
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