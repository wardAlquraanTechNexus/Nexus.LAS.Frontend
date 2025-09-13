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

  override displayColumns: DisplayColumn[] = [
    {
      key:"companyNameEn",
      label:"Company Name",
    },
    {
      key:"rule",
      label:"Rule",
      pipes:["rule"]
    },
    {
      key:"fromAmount",
      label:"From Amount"
    },
    {
      key:"toAmount",
      label:"To Amount"
    },
    {
      key:"accountSignatoryDate",
      label:"Date",
      pipes:["date"]
    },
    {
      key:"accountSignatoryActive",
      label:"Active",
      pipes:['signatory-active']
    }
  ]

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
    private dialog: MatDialog
  ) {
    super(service, cdr, fb, router, errorHandler, route)
  }
  override ngOnInit(): void {
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