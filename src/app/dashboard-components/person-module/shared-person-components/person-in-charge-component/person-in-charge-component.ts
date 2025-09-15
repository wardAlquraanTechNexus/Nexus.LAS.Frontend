import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { PersonDto } from '../../../../models/person-models/person-dto';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DisplayColumn } from '../../../../models/columns/display-column';
import { CompanyPersonInCharge } from '../../../../models/company-models/company-person-in-charge/company-person-in-charge';
import { CompanyPersonInChargeDto } from '../../../../models/company-models/company-person-in-charge/get-company-person-in-charge/get-company-person-in-charge-dto';
import { GetPagingCompanyPersonInChargeQuery } from '../../../../models/company-models/company-person-in-charge/get-company-person-in-charge/get-company-person-in-charge-query';
import { PaginateRsult } from '../../../../models/paginate-result';
import { CompanyPersonInChargeService } from '../../../../services/company-services/company-person-in-charge-service';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { MenuService } from '../../../../services/menu-service';
import { TableFormComponent } from '../../../base-components/table-form-component/table-form-component';
import { LanguageService } from '../../../../services/language-service';

@Component({
  selector: 'app-person-in-charge-component',
  standalone:false,
  templateUrl: './person-in-charge-component.html',
  styleUrls: ['../../../_shared/styles/table-style.scss']
})
export class PersonInChargeComponent  extends TableFormComponent<CompanyPersonInCharge> {

  @Input() person!: PersonDto;
  override params: GetPagingCompanyPersonInChargeQuery = {
    page: 0,
    pageSize: 10,
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

    // Re-assign displayColumns with correct labels after langService is available
   
  }

  override ngOnInit(): void {
    this.params.personId = this.person.id;
    super.ngOnInit();

     this.displayColumns = [
      {
        key: "companyNameEn",
        label: this.langService.getLabel('COMPANY.COMPANY_NAME') || "Company Name",
      },
      {
        key: "designation",
        label: this.langService.getLabel('PERSON.DESIGNATION') || "Designation",
        pipes: ['designation']
      },
      {
        key: "statusName",
        label: this.langService.getLabel('COMPANY.STATUS') || "Status",
        pipes: ['person-company-in-charge']
      },
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




}

