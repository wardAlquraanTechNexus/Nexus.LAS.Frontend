import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { TableFormComponent } from '../../../base-components/table-form-component/table-form-component';
import { CompanyAccountSignatory } from '../../../../models/company-models/company-account-signatory/company-account-signatory';
import { PaginateRsult } from '../../../../models/paginate-result';
import { DisplayColumn } from '../../../../models/columns/display-column';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CompanyAccountSignatoryDto } from '../../../../models/company-models/company-account-signatory/dtos/company-account-signatory-dto';
import { GetCompanyAccountSignatoryParams } from '../../../../models/company-models/company-account-signatory/params/get-company-account-signatory';
import { CompanyAccountSignatoryService } from '../../../../services/company-services/company-account-signatory-service';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { PersonDto } from '../../../../models/person-models/person-dto';
import { LanguageService } from '../../../../services/language-service';

@Component({
  selector: 'app-person-account-signatory-component',
  standalone: false,
  templateUrl: './person-account-signatory-component.html',
  styleUrls: ['../../../_shared/styles/table-style.scss']
})
export class PersonAccountSignatoryComponent  extends TableFormComponent<CompanyAccountSignatory> {

  override data: PaginateRsult<CompanyAccountSignatoryDto> = {
    collection: [],
    page: 0,
    pageSize: 10,
    totalPages: 0,
    totalRecords: 0
  };


  override params: GetCompanyAccountSignatoryParams = {
    page: 0,
    pageSize: 10
  };
  @Input() person!: PersonDto;

  constructor(
    override service: CompanyAccountSignatoryService,
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
    // Set display column labels using LanguageService
    this.displayColumns = [
      {
        key:"companyNameEn",
        label: this.langService.getLabel('COMPANY.COMPANY_NAME') || "Company Name",
      },
      {
        key:"rule",
        label: this.langService.getLabel('PERSON.DESIGNATION') || "Rule",
        pipes:["rule"]
      },
      {
        key:"fromAmount",
        label: this.langService.getLabel('COMPANY.FROM_AMOUNT') || "From Amount",
      },
      {
        key:"toAmount",
        label: this.langService.getLabel('COMPANY.TO_AMOUNT') || "To Amount",
      },
      {
        key:"accountSignatoryDate",
        label: this.langService.getLabel('COMMON.DATE') || "Date",
        pipes:["date"]
      },
      {
        key:"accountSignatoryActive",
        label: this.langService.getLabel('COMMON.ACTIVE') || "Active",
        pipes:['signatory-active']
      }
    ];

    this.params.personId = this.person.id;
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


  showTable = true;
  toggleTable() {
    this.showTable = !this.showTable;
  }
}