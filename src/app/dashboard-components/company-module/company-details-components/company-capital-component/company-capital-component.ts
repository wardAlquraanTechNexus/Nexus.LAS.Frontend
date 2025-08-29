import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DisplayColumn } from '../../../../models/columns/display-column';
import { CompanyCapital } from '../../../../models/company-models/company-capital/company-capital';
import { CompanyCapitalDto } from '../../../../models/company-models/company-capital/dtos/company-capital-dto';
import { GetPagingCompanyCapital } from '../../../../models/company-models/company-capital/params/get-paging-company-capital';
import { GetCompanyDto } from '../../../../models/company-models/get-company-query/get-company-dto';
import { PaginateRsult } from '../../../../models/paginate-result';
import { CompanyCapitalService } from '../../../../services/company-services/company-capital-service';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { TableFormComponent } from '../../../base-components/table-form-component/table-form-component';
import { CompanyCapitalDialogFormComponent } from './company-capital-dialog-form-component/company-capital-dialog-form-component';

@Component({
  selector: 'app-company-capital-component',
  standalone:false,
  templateUrl: './company-capital-component.html',
  styleUrl: './company-capital-component.scss'
})
export class CompanyCapitalComponent extends TableFormComponent<CompanyCapital> {



  override data: PaginateRsult<CompanyCapitalDto> = {
    collection: [],
    page: 0,
    pageSize: 10,
    totalPages: 0,
    totalRecords: 0
  };

  override displayColumns: DisplayColumn[] = [
    {
      key:"id",
      label:"Id"
    },
    {
      key: "capitalDate",
      label: "Date",
      pipes: ['date'],
    },
    {
      key: "capitalAmount",
      label: "Amount",
    },
    {
      key:"numberOfShares",
      label:"NO. of Shares"
    },
    {
      key: "nominalValueOfShare",
      label: "Nominal Value of share",
      pipes: ['capital-currency'],
      compareKey: 'capitalCurrency'
    }, {
      key: "capitalAuthorized",
      label: "Authorized Capital Amount",
      pipes: ['capital-currency'],
      compareKey: 'capitalCurrency'
    }, {
      key: "capitalPaid",
      label: "Paid",
      pipes: ['capital-currency'],
      compareKey: 'capitalCurrency'
    }, {
      key: "issuedShares",
      label: "Issued Shares",
    }, {
      key: "classOfShares",
      label: "Class Of Shares",
    }, {
      key: "capitalActive",
      label: "Status",
      pipes:['capital-active']
    },
    {
      key: 'action',
      label: 'Actions'
    }
  ]

  override params: GetPagingCompanyCapital = {
    companyId: 0,
    page: 0,
    pageSize: 10
  };
  @Input() company!: GetCompanyDto;

  constructor(
    override service: CompanyCapitalService,
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
    const element: CompanyCapitalDto = {
      id: 0,
      companyId: this.company.id,
      capitalDate: "",
      capitalAmount: 0,
      nominalValueOfShare: 0,
      classOfShares: '',
      numberOfShares: 0,
      capitalAuthorized: 0,
      capitalPaid: 0,
      issuedShares: 0,
      capitalCurrency: '',
      capitalActive: false
    };
    const dialogRef = this.dialog.open(CompanyCapitalDialogFormComponent, {
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
    const dialogRef = this.dialog.open(CompanyCapitalDialogFormComponent, {
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



}
