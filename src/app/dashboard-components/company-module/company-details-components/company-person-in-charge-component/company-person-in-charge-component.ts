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
import { CompanyPersonInChargeDialogFormComponent } from './company-person-in-charge-dialog-form-component/company-person-in-charge-dialog-form-component';
import { MatDialog } from '@angular/material/dialog';
import { MenuService } from '../../../../services/menu-service';
import { environment } from '../../../../../environment/environment';
import { LanguageService } from '../../../../services/language-service';
import { Labels } from '../../../../models/consts/labels';

@Component({
  selector: 'app-company-person-in-charge-component',
  standalone: false,
  templateUrl: './company-person-in-charge-component.html',
  styleUrls: ['../../../_shared/styles/table-style.scss']
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
  
  constructor(
    override service: CompanyPersonInChargeService,
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
    this.params.companyId = this.company.id;
    super.ngOnInit();

  

  }

  override setDisplayColumns() {
      this.displayColumns = [
    {
      key: "personNameEn",
      label: this.label.COMMON.NAME,
      pipes: ["link"]
    },
    {
      key: "designation",
      label: this.label.COMPANY.DESIGNATION,
      pipes: ['designation']
    },
    {
      key: "authorityRule",
      label: this.label.COMMON.RULE,
      pipes: ["rule"]
    },
    {
      key: "notes",
      label: this.label.COMMON.NOTES
    },
    {
      key: "personInChargeDate",
      label: this.label.COMMON.DATE_OF_APPOINTMENT,
      pipes: ["date"]
    },
    {
      key: "cessationDate",
      label: this.label.COMPANY.CESSATION_DATE,
      pipes: ["date"]
    },
    {
      key: "statusName",
      label: this.label.COMMON.STATUS,
      pipes: ['person-company-in-charge'],
      hasIcon: true
    },
    {
      key: "personInChargeActive",
      label: this.label.COMMON.ACTIVE,
      inputType: 'mat-slide-toggle'
    },
    {
      key: "action",
      label: this.label.COMMON.ACTIONS
    }
  ];
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
      authorityRule: null,
      notes: null,
      personInChargeDate: null,
      cessationDate: null,
      personInChargeActive: false,
      personIdn: null,
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
      if (!event.element.personInChargeActive) {
        event.element.cessationDate = new Date().toISOString();
      }else{
        event.element.cessationDate = null;
      }
      this.service.update(event.element).subscribe({
        next: (res => {
          this.errorHandler.showSuccess("Updated Successfully");
          this.fetchData();
        }), error: (err => {
          this.showLoading = false;
        })
      })
    } else if (event.key == "personNameEn") {
      let basePersonPath = this.menuService.getMenuByPath(environment.routes.People);
      let personPath =
        this.menuService.getMenuByPath(environment.routes.AllPeople) ||
        this.menuService.getMenuByPath(environment.routes.ActivePeople) ||
        this.menuService.getMenuByPath(environment.routes.ActivePublicPeople) ||
        this.menuService.getMenuByPath(environment.routes.ActivePrivatePeople);

      if (!basePersonPath || !personPath) {
        this.errorHandler.showWarning("You have no access to view the person");
      } else {
        this.router.navigate([`${basePersonPath.path}/${personPath.path}`], {
          queryParams: { id: event.element.personIdn }
        });
      }

    }
  }


}
