import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { TableFormComponent } from '../../../base-components/table-form-component/table-form-component';
import { CompanyPersonInCharge } from '../../../../models/company-models/company-person-in-charge/company-person-in-charge';
import { CompanyPersonInChargeService } from '../../../../services/company-services/company-person-in-charge-service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { DisplayColumn } from '../../../../models/columns/display-column';
import { GetCompanyDto } from '../../../../models/company-models/get-company-query/get-company-dto';
import { GetPagingCompanyPersonInChargeQuery } from '../../../../models/company-models/company-person-in-charge/get-company-person-in-charge/get-company-person-in-charge-query';
import { CompanyPersonInChargeDto } from '../../../../models/company-models/company-person-in-charge/get-company-person-in-charge/get-company-person-in-charge-dto';
import { PaginateRsult } from '../../../../models/paginate-result';
import { BaseParam } from '../../../../models/base/base-param';
import { CompanyPersonInChargeDialogFormComponent } from './company-person-in-charge-dialog-form-component/company-person-in-charge-dialog-form-component';
import { MatDialog } from '@angular/material/dialog';
import { DynamicList } from '../../../../models/dynamic-list/dynamic-list';
import { Observable } from 'rxjs';
import { DynamicListService } from '../../../../services/dynamic-list-service';
import { environment } from '../../../../../environment/environment';

@Component({
  selector: 'app-company-person-in-charge-component',
  standalone: false,
  templateUrl: './company-person-in-charge-component.html',
  styleUrl: './company-person-in-charge-component.scss'
})
export class CompanyPersonInChargeComponent extends TableFormComponent<CompanyPersonInCharge> {

  @Input() company!: GetCompanyDto;
  override params: GetPagingCompanyPersonInChargeQuery = {
    page: 0,
    pageSize: 10,
    companyId: 0
  };
  override data: PaginateRsult<CompanyPersonInChargeDto> = {
    collection: [],
    totalPages: 0,
    totalRecords: 0,
    pageSize: 10,
    page: 0
  };
  override displayColumns: DisplayColumn[] = [
    {
      key: "personNameEn",
      label: "Name En",
      pipes: ["link"]
    },
    {
      key: "designation",
      label: "Designation"
    },
    {
      key: "authorityRule",
      label: "Rule",
      pipes: ["rule"]
    },
    {
      key: "notes",
      label: "Note"
    },
    {
      key: "personInChargeDate",
      label: "Date Of Appointment",
      pipes: ["date"]
    },
    {
      key: "cessationDate",
      label: "Cessation Date",
      pipes: ["date"]
    },
    {
      key: "statusName",
      label: "Status",
      pipes: ['person-company-in-charge']
    },
    {
      key: "personInChargeActive",
      label: "Active",
      inputType: 'mat-slide-toggle'
    },
    {
      key: "action",
      label: "Actions"
    }
  ];
  constructor(
    override service: CompanyPersonInChargeService,
    override cdr: ChangeDetectorRef,
    override fb: FormBuilder,
    override router: Router,
    override errorHandler: ErrorHandlerService,
    override route: ActivatedRoute,
    private dialog: MatDialog
  ) {
    super(service, cdr, fb, router, errorHandler, route);
  }

  override ngOnInit(): void {
    this.params.companyId = this.company.id;
    super.ngOnInit();

  }
  override fetchData() {
    this.showLoading = true;
    this.service.getPaging(this.params)
      .subscribe({
        next: (res => {
          res.collection.forEach((item => {
            item.statusName = item.personInChargeActive ? "Active" : "Inactive"
          }))
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
    let element: CompanyPersonInChargeDto = {
      id: 0,
      companyIdn: this.company.id,
      designation: "",
      authorityRule: "",
      notes: "",
      personInChargeDate: "",
      cessationDate: "",
      personInChargeActive: false,
      personIdn: null
    };
    const dialogRef = this.dialog.open(CompanyPersonInChargeDialogFormComponent, {
      disableClose: true,
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchData();
      }
    })
  }

  onEdit(element: CompanyPersonInChargeDto) {

    const dialogRef = this.dialog.open(CompanyPersonInChargeDialogFormComponent, {
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

  onRowClick(event: any) {
    if (event.key == 'personInChargeActive') {
      this.showLoading = true;
      this.service.update(event.element).subscribe({
        next: (res => {
          this.errorHandler.showSuccess("Updated Successfully");
          this.fetchData();
        }), error: (err => {
          this.showLoading = false;
        })
      })
    }
  }


}
