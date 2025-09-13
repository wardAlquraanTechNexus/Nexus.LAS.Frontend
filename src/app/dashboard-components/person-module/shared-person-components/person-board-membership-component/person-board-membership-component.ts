import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DisplayColumn } from '../../../../models/columns/display-column';
import { CompanyBoardMember } from '../../../../models/company-models/company-board-member/company-board-member';
import { CompanyBoardMemberDto } from '../../../../models/company-models/company-board-member/dtos/company-board-member-dto';
import { GetCompanyBoardMemberParams } from '../../../../models/company-models/company-board-member/params/get-company-board-member';
import { GetCompanyDto } from '../../../../models/company-models/get-company-query/get-company-dto';
import { PaginateRsult } from '../../../../models/paginate-result';
import { CompanyBoardMemberService } from '../../../../services/company-services/company-board-member-service';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { TableFormComponent } from '../../../base-components/table-form-component/table-form-component';
import { PersonDto } from '../../../../models/person-models/person-dto';

@Component({
  selector: 'app-person-board-membership-component',
  standalone:false,
  templateUrl: './person-board-membership-component.html',
  styleUrls: ['../../../_shared/styles/table-style.scss']
})
export class PersonBoardMembershipComponent  extends TableFormComponent<CompanyBoardMember> {
  @Input() person!: PersonDto;

  override data: PaginateRsult<CompanyBoardMemberDto> = {
    collection: [],
    page: 0,
    pageSize: 10,
    totalPages: 0,
    totalRecords: 0
  };

  override displayColumns: DisplayColumn[] = [
    {
      key: "companyNameEn",
      label: "Company Name",
    },
    {
      key: "position",
      label: "Position",
      pipes: ["board-position"]
    },
    {
      key: "appointmentDate",
      label: "Date",
      pipes: ["date"]
    },
    {
      key: "isActive",
      label: "Status",
      pipes: ["active"]
    }
  ]

  override params: GetCompanyBoardMemberParams = {
    page: 0,
    pageSize: 10
  };

  constructor(
    override service: CompanyBoardMemberService,
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

