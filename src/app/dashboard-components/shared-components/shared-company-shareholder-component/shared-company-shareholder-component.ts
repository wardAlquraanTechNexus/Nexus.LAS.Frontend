import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environment/environment';
import { EntityIDc } from '../../../enums/entity-idc';
import { DisplayColumn } from '../../../models/columns/display-column';
import { CompaniesShareHolder } from '../../../models/company-models/company-share-holder/company-share-holder';
import { CompaniesShareHolderDto } from '../../../models/company-models/company-share-holder/dtos/company-share-holder-dto';
import { GetPagingCompanyShareHolderParams } from '../../../models/company-models/company-share-holder/params/get-paging-company-shareholder-params';
import { GetCompanyDto } from '../../../models/company-models/get-company-query/get-company-dto';
import { PaginateRsult } from '../../../models/paginate-result';
import { CompanyCapitalService } from '../../../services/company-services/company-capital-service';
import { CompanyShareHolderService } from '../../../services/company-services/company-share-holder-service';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { MenuService } from '../../../services/menu-service';
import { TableFormComponent } from '../../base-components/table-form-component/table-form-component';
import { CompanyShareholderDialogFormComponent } from '../../company-module/company-details-components/company-shareholder-component/company-shareholder-dialog-form-component/company-shareholder-dialog-form-component';
import { ShareholderAssetsDto } from '../../../models/company-models/company-share-holder/dtos/shareholder-assets-dto';
import { LanguageService } from '../../../services/language-service';

@Component({
  selector: 'app-shared-company-shareholder-component',
  standalone:false,
  templateUrl: './shared-company-shareholder-component.html',
  styleUrl: './shared-company-shareholder-component.scss'
})
export class SharedCompanyShareholderComponent extends TableFormComponent<CompaniesShareHolder> {

  @Input() registersIdc!: string;
  @Input() registersIdn!: number

  override data: PaginateRsult<ShareholderAssetsDto> = {
    collection: [],
    page: 0,
    pageSize: 10,
    totalPages: 0,
    totalRecords: 0
  };

  override displayColumns: DisplayColumn[] = [];

  override params: GetPagingCompanyShareHolderParams = {
    page: 0,
    pageSize: 10
  };

  constructor(
    override service: CompanyShareHolderService,
    override cdr: ChangeDetectorRef,
    override fb: FormBuilder,
    override router: Router,
    override errorHandler: ErrorHandlerService,
    override route: ActivatedRoute,
    private dialog: MatDialog,
    private companyCapitalService: CompanyCapitalService,
    private menuService: MenuService,
    override langService: LanguageService,
  ) {
    super(service, cdr, fb, router, errorHandler, route, langService)
  }

  override ngOnInit(): void {
    

    this.params.registersIdc = this.registersIdc;
    this.params.registersIdn = this.registersIdn;
    super.ngOnInit();
  }

  override setDisplayColumns(): void {
    this.displayColumns = [
      {
        key: "companyName",
        label: this.langService.getLabel('COMPANY.COMPANY_NAME') || "Company Name",
        pipes: ["link"]
      },
      {
        key: "ownedSahresCount",
        label: this.langService.getLabel('COMPANY.TOTAL_SHARES') || "No. of shares",
      },
      {
        key: "sharePercentage",
        label: this.langService.getLabel('COMPANY.SHARE_PERCENT') || "% of Shares",
        pipes: ["percentage"]
      },
      {
        key: "date",
        label: this.langService.getLabel('COMMON.DATE') || "Date",
        pipes: ['date']
      },
      {
        key: "isActive",
        label: this.langService.getLabel('COMMON.STATUS') || "Status",
        pipes: ['company-shareholder-status']
      }
    ];
  }
  override fetchData(): void {
    this.showLoading = true;
    this.service.getShareholderAssets(this.params)
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

  onRowClick(row:any){

  }

}