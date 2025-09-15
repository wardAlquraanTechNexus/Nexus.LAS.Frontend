import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Company } from '../../../../models/company-models/company';
import { TableFormComponent } from '../../../base-components/table-form-component/table-form-component';
import GetCompanyQuery from '../../../../models/company-models/get-company-query/get-company-dto-command';
import { CompanyService } from '../../../../services/company-services/company-service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { MenuService } from '../../../../services/menu-service';
import { MatDialog } from '@angular/material/dialog';
import { DynamicListService } from '../../../../services/dynamic-list-service';
import { MenuTree } from '../../../../models/menus/menu-tree';
import { GetCompanyDto } from '../../../../models/company-models/get-company-query/get-company-dto';
import { PaginateRsult } from '../../../../models/paginate-result';
import { DynamicList } from '../../../../models/dynamic-list/dynamic-list';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environment/environment';
import { CompanyStatus } from '../../../../enums/company-status';
import { CompanyFormDialog } from '../../company-form-dialog/company-form-dialog';
import { downloadBlobFile } from '../../../_shared/shared-methods/downloadBlob';
import { LanguageService } from '../../../../services/language-service'; // Adjust path as needed
import { Labels } from '../../../../models/consts/labels';

@Component({
  selector: 'app-base-companies-component',
  standalone:false,
  templateUrl: './base-companies-component.html',
  styleUrl: './base-companies-component.scss'
})
export class BaseCompaniesComponent extends TableFormComponent<Company> implements OnInit {


  selectedCompanies: GetCompanyDto[] = [];
  override data: PaginateRsult<GetCompanyDto> = {
    collection: [],
    totalPages: 0,
    totalRecords: 0,
    pageSize: 10,
    page: 0
  };

  override params: GetCompanyQuery = {
    searchBy: null,
    private: null,
    status: null,
    page: 0,
    pageSize: 10,
    orderBy: 'id',
    orderDir: 'desc'
  }

  columns = {
    code: true,
    nameEn: true,
    nameAr: true,
    status: true,
    private: true
  };
  labels:any;

  activeStatus = CompanyStatus.Active;
  inActiveStatus = CompanyStatus.Inactive;

  currentMenu: MenuTree | null = null;
  loadCompanyTypesFn!: (search: string) => Observable<DynamicList[]>;
  loadCompanyClassesFn!: (search: string) => Observable<DynamicList[]>;
  loadCompanyLegalsFn!: (search: string) => Observable<DynamicList[]>;
  loadPlaceOfRegistrationFn!: (search: string) => Observable<DynamicList[]>;
  loadPlaceOfRegistrationSubFn!: (search: string) => Observable<DynamicList[]>;
  loadActivitiesFn!: (search: string) => Observable<DynamicList[]>;
  loadContractTypesFn!: (search: string) => Observable<DynamicList[]>;



  formGroup!: FormGroup;
  companyTypeId!: number;


  constructor(
    override service: CompanyService,
    override cdr: ChangeDetectorRef,
    override fb: FormBuilder,
    override router: Router,
    override errorHandler: ErrorHandlerService,
    override route: ActivatedRoute,
    protected menuService: MenuService,
    protected dialog: MatDialog,
    protected dlService: DynamicListService,
    override langService: LanguageService

  ) {
    super(service, cdr, fb, router, errorHandler, route,langService);
  }

 

  override ngOnInit(): void {
    let routerSplitted = this.router.url.split('/');
    let roterLen = routerSplitted.length;

    this.currentMenu = this.menuService.getMenuByPath(routerSplitted[roterLen - 1]);
    this.fetchData();
    this.loadCompanyTypesFn = (search: string) => this.dlService.GetAllByParentId(environment.rootDynamicLists.companyType, search)
    this.loadCompanyLegalsFn = (search: string) => this.dlService.GetAllByParentId(environment.rootDynamicLists.legalType, search)
    this.loadPlaceOfRegistrationFn = (search: string) => this.dlService.GetAllByParentId(environment.rootDynamicLists.placeOfRegistration, search)
    this.loadActivitiesFn = (search: string) => this.dlService.GetAllByParentId(environment.rootDynamicLists.companyActivity, search)
    this.loadContractTypesFn = (search: string) => this.dlService.GetAllByParentId(environment.rootDynamicLists.companyContractType, search)

    this.formGroup = this.fb.group(
      {
        companyTypeIdn: [''],
        companyClassIdn: [''],
        legalTypeIdn: [''],
        placeOfRegistrationMainIdn: [''],
        placeOfRegistrationSubIdn: [''],
        companyActivityIdn: [''],
        companyContractTypeIdn: ['']
      },
    )

    this.setLabels();
  }


  setLabels() {
    this.langService.language$.subscribe(lang => {
         this.labels = Labels[lang];
       });
  }


  override fetchData(): void {
    this.showLoading = true;
    this.loadingService.startLoading('Loading data');

    this.service.getCompanies(this.params)
      .subscribe({
        next: (res => {
          this.data = res;
          this.showLoading = false;
          this.loadingService.stopLoading('Loading data');
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

  onSelectCompanyType(event: any) {
    this.params.companyTypeIdn = event;
    if (event) {
      this.loadCompanyClassesFn = (search: string) => this.dlService.GetAllByParentId(event, search)
    } else {
      this.loadCompanyClassesFn = (search: string) => this.dlService.GetAllByParentId(0, search)
    }
    this.cdr.markForCheck();
    this.fetchData();
  }
  onSelectCompanyClass(event: any) {
    this.params.companyClassIdn = event;
    this.fetchData();
  }
  onSelectCompanyLegalType(event: any) {
    this.params.legalTypeIdn = event;
    this.fetchData();
  }

  onSelectCompanyActivity(event: any) {
    this.params.companyActivityIdn = event;
    this.fetchData();
  }

  onSelectContractType(event: any) {
    this.params.companyContractTypeIdn = event;
    this.fetchData();
  }

  onSelectMainRegistrtaion(event: number) {
    this.params.placeOfRegistrationMainIdn = event;
    if (event) {
      this.loadPlaceOfRegistrationSubFn = (search: string) => this.dlService.GetAllByParentId(event, search);
    } else {
      this.loadPlaceOfRegistrationSubFn = (search: string) => this.dlService.GetAllByParentId(0, search);
    }
    this.cdr.markForCheck();
    this.fetchData();
  }

  onSelectSubRegistrtaion(event: any) {
    this.params.placeOfRegistrationSubIdn = event;
    this.fetchData();
  }


  activate(event: any) {
    this.changeStatus(event, CompanyStatus.Active);
  }
  deactivate(event: any) {
    this.changeStatus(event, CompanyStatus.Inactive);
  }
  markPublic(event: any) {
    this.changePrivate(event, false);
  }
  markPrivate(event: any) {
    this.changePrivate(event, true);

  }
  deleteCompany(event: any) {
    return () => this.deleteCompanyAfterConfirm(event);
  }

  deleteCompanyAfterConfirm(event: any) {
    this.showLoading = true;
    this.service.delete(event.id).subscribe({
      next: (res => {
        this.errorHandler.showSuccess("Deleted Successfully");
        this.fetchData();
      }), error: (err => {
        this.showLoading = false;
        this.cdr.markForCheck();
      })
    })
  }


  changeStatus(event: any, status: CompanyStatus) {
    this.showLoading = true;
    this.service.updateStatus({
      ids: [event.id],
      status: status
    }).subscribe({
      next: (res => {
        this.errorHandler.showSuccess("Updated Successfully");
        this.fetchData();
      }), error: (err => {
        this.showLoading = false;
        this.cdr.markForCheck();
      })
    })
  }

  changePrivate(event: any, isPrivate: boolean) {
    this.showLoading = true;
    this.service.updatePrivate({
      ids: [event.id],
      isPrivate: isPrivate
    }).subscribe({
      next: (res => {
        this.errorHandler.showSuccess("Updated Successfully");
        this.fetchData();
      }), error: (err => {
        this.showLoading = false;
        this.cdr.markForCheck();
      })
    })
  }



  onSelectionChange(selectedRows: GetCompanyDto[]) {
    this.selectedCompanies = selectedRows;
    this.cdr.detectChanges();
  }


  bulkChangeStatus(status: CompanyStatus) {
    this.showLoading = true;
    this.service.updateStatus({
      ids: this.selectedCompanies.map(x => x.id),
      status: status
    }).subscribe({
      next: (res => {
        this.errorHandler.showSuccess("Updated Successfully");
        this.fetchData();
      }), error: (err => {
        this.showLoading = false;
        this.cdr.markForCheck();
      })
    })
  }
  bulkChangePrivate(isPrivate: boolean) {
    this.showLoading = true;
    this.service.updatePrivate({
      ids: this.selectedCompanies.map(x => x.id),
      isPrivate: isPrivate
    }).subscribe({
      next: (res => {
        this.errorHandler.showSuccess("Updated Successfully");
        this.fetchData();
      }), error: (err => {
        this.showLoading = false;
        this.cdr.markForCheck();
      })
    })
  }



  onAddNew() {
    let companyDto: GetCompanyDto = {
      id: 0,
      companyIdc: "",
      companyCode: null,
      companyEnglishName: null,
      companyArabicName: null,
      companyShortName: null,
      companyStatus: 0,
      companyTypeIdn: null,
      companyClassIdn: null,
      groupCompanyIdn: null,
      relevantCompanyIdn: null,
      legalTypeIdn: null,
      cciNumber: null,
      cciIssueDate: null,
      cciExpiryDate: null,
      cciExpiryActiveReminder: null,
      placeOfRegistrationMainIdn: null,
      placeOfRegistrationSubIdn: null,
      capitalAmount: null,
      totalShares: null,
      numberOfPartners: null,
      updateDate: null,
      updateDescription: null,
      personsIdn: null,
      fpcCode: null,
      private: true,
      incorporationDate: null,
    };
    const dialogRef = this.dialog.open(CompanyFormDialog, {
      disableClose: true,
      data: companyDto
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchData();
      }
    });
  }

  onRowClick(event: any) {
    if (event.key == "companyCode" || event.key == "companyEnglishName" || event.key == "companyArabicName" || event.key == "companyShortName") {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { id: event.element.id },
      });
    }
  }
  showFilters = false;

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

    getAuditTooltip(person: any): string {
    const createdBy = person?.createdBy || 'N/A';
    const createdAt = person?.createdAt ? new Date(person.createdAt).toLocaleDateString('en-GB') : 'N/A';
    const modifiedBy = person?.modifiedBy || 'N/A';
    const modifiedAt = person?.modifiedAt ? new Date(person.modifiedAt).toLocaleDateString('en-GB') : 'N/A';

    return `Created by: ${createdBy}\nCreated at: ${createdAt}\n\nModified by: ${modifiedBy}\nModified at: ${modifiedAt}`;
  }

   exportToExcel() {
    this.service.exportToExcel(this.params).subscribe(res => {
      // Assuming res.data is base64 string:
      const binaryString = atob(res.data);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const blob = new Blob([bytes], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });


      downloadBlobFile(blob, res.fileName || 'export.xlsx');
    });
  }

  
    exportToPdf(id: number) {
      this.service.exportToPdf({ id: id }).subscribe(res => {
        // Assuming res.data is a base64 string
        const binaryString = atob(res.data);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
  
        const blob = new Blob([bytes], {
          type: 'application/pdf'
        });
  
        downloadBlobFile(blob, res.fileName || 'report.pdf');
      });
    }

}
