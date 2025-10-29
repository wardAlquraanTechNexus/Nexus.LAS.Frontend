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
import { LanguageService } from '../../../../services/language-service';
import { MenuService } from '../../../../services/menu-service';
import { environment } from '../../../../../environment/environment';

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
    private dialog: MatDialog,
    override langService: LanguageService,
    private menuService: MenuService
  ) {
    super(service, cdr, fb, router, errorHandler, route, langService)
  }

  override ngOnInit(): void {
    // Set display column labels using LanguageService
    

    this.params.personId = this.person.id;
    super.ngOnInit();
  }

  override setDisplayColumns(): void {
    this.displayColumns = [
      {
        key: "companyNameEn",
        label: this.langService.getLabel('COMPANY.COMPANY_NAME') || "Company Name",
        pipes: ['link']
      },
      {
        key: "position",
        label: this.langService.getLabel('COMPANY.DESIGNATION') || "Position",
        pipes: ["board-position"]
      },
      {
        key: "appointmentDate",
        label: this.langService.getLabel('COMMON.DATE') || "Date",
        pipes: ["date"]
      },
      {
        key: "isActive",
        label: this.langService.getLabel('COMMON.STATUS') || "Status",
        pipes: ["active"]
      }
    ];
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

  onRowClick(event: any): void {
    if (event.key === 'companyNameEn' && event.element?.companyId) {
      const baseCompanyPath = this.menuService.getMenuByPath(environment.routes.Companies);
      const companyPath =
        this.menuService.getMenuByPath(environment.routes.AllCompanies) ||
        this.menuService.getMenuByPath(environment.routes.ActiveCompanies) ||
        this.menuService.getMenuByPath(environment.routes.ActivePublicCompanies) ||
        this.menuService.getMenuByPath(environment.routes.ActivePrivateCompanies);

      if (!baseCompanyPath || !companyPath) {
        this.errorHandler.showWarning("You have no access to view the company");
      } else {
        this.router.navigate([`${baseCompanyPath.path}/${companyPath.path}`], {
          queryParams: { id: event.element.companyId }
        });
      }
    }
  }

}

