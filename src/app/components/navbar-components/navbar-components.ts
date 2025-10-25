import { Component, ViewChild, Inject, PLATFORM_ID, OnDestroy, Output, EventEmitter, OnInit, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environment/environment';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../services/auth-service';
import { AuthResponse } from '../../models/auth-response';
import { Subject, takeUntil } from 'rxjs';
import { Language } from './models/language';
import { LanguageService } from '../../services/language-service';
import { GetCompanyDto } from '../../models/company-models/get-company-query/get-company-dto';
import { CompanyFormDialog } from '../../dashboard-components/company-module/company-form-dialog/company-form-dialog';
import { MenuService } from '../../services/menu-service';
import { PersonDialogFormComponent } from '../../dashboard-components/person-module/person-dialog-form-component/person-dialog-form-component';
import { PersonDto } from '../../models/person-models/person-dto';
import { Labels } from '../../models/consts/labels';
import { LanguageCode } from '../../models/types/lang-type';
import { Event as RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { PropertyDTO } from '../../models/property-models/property/dtos/propery-dto';
import { PropertyDialogFormComponent } from '../../dashboard-components/property-module/property-dialog-form-component/property-dialog-form-component';
import { LawFirmDTO } from '../../models/law-firm-models/law-firm/dtos/law-firm-dto';
import { LawFirmDialogFormComponent } from '../../dashboard-components/law-firm-module/law-firm-dialog-form-component/law-firm-dialog-form-component';
import { TransactionDto } from '../../models/transaction-models/transaction/dtos/transaction-dto';
import { TransactionDialogFormComponent } from '../../dashboard-components/transaction-module/transaction-dialog-form-component/transaction-dialog-form-component';
import { FPCDto } from '../../models/fpc-models/fpc/dtos/fpc-dto';
import { CommonStatus } from '../../enums/common-status';
import { FpcDialogFormComponent } from '../../dashboard-components/fpc-module/fpc-dialog-form-component/fpc-dialog-form-component';
import { DocumentTrackingDto } from '../../models/document-tracking-models/document-tracking/dtos/document-tracking-dto';
import { DocumentTrackingDialogFormComponent } from '../../dashboard-components/document-tracking-module/document-tracking-dialog-form-component/document-tracking-dialog-form-component';
import { GlobalService } from '../../services/global-services/global-service';
import { GlobalSearchDTO } from '../../models/global-models/global-search/global-search-dto';
import { GlobalSearchQuery } from '../../models/global-models/global-search/global-search-param';
import { EntityIDc } from '../../enums/entity-idc';
import { entityIcons } from '../../enums/entity-icon';


@Component({
  selector: 'app-navbar-component',
  templateUrl: './navbar-components.html',
  styleUrls: ['./navbar-components.scss'],
  standalone: false
})
export class NavbarComponent implements OnDestroy, OnInit {

  entityIdc = EntityIDc;
  sidebarOpen = true;
  currentLang: LanguageCode = 'en';

  params: GlobalSearchQuery = {
    search: "",
    page: 0,
    pageSize: 5
  };
  searchResults: GlobalSearchDTO[] = [];
  isSearching = false;
  isLoadingMore = false;
  hasMoreResults = false;


  get label() {
    return Labels[this.currentLang as keyof typeof Labels];
  }

  @Output() changeLanguageEmitter = new EventEmitter<Language>();

  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger;
  private destroy$ = new Subject<void>();


  languages: Language[] = [
    {
      name: "English",
      value: "en",
      dir: "ltr"
    },
    {
      name: "العربية",
      value: "ar",
      dir: "rtl"
    }
  ]

  listToCreated:any = [];

  selectedLanguage = this.languages[0];

  user: AuthResponse | null;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService,
    protected langService: LanguageService,
    private menuService: MenuService,
    private route: ActivatedRoute,
    private globalService: GlobalService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {
    this.user = this.authService.getUser();
  }

  ngOnInit() {
    this.langService.language$.subscribe(lang => {
      this.currentLang = lang;
      this.listToCreated = this.getListOfCreated();
    });
  }


  getListOfCreated() {
    return [
    {
      name: this.label.PERSON.PERSON,
      icon: entityIcons[EntityIDc.Person],
      value: environment.routes.AddPerson
    },
    {
      name: this.label.COMPANY.COMPANY,
      icon: entityIcons[EntityIDc.Company],
      value: environment.routes.AddCompany
    },
    {
      name: this.label.PROPERTY.REAL_EASTATE,
      icon: entityIcons[EntityIDc.Properties],
      value: environment.routes.AddProperty
    },

    {
      name: this.label.LAW_FIRM.LAW_FIRM,
      icon: entityIcons[EntityIDc.LawFirm],
      value: environment.routes.AddLawFirm
    },
    {
      name: this.label.TRANSACTION.TRANSACTION,
      icon: entityIcons[EntityIDc.Transactions],
      value: environment.routes.AddTransaction
    },
    {
      name: this.label.FPC.FPC,
      icon: entityIcons[EntityIDc.FPCs],
      value: environment.routes.AddFpc
    },
    {
      name: this.label.DOCUMENT_TRACKING.DOCUMENT_TRACKING,
      icon: entityIcons[EntityIDc.DocumentTracking],
      value: environment.routes.AddDocumentTracking
    },
  ]
  }
  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  logout() {
    if (this.isBrowser) {
      localStorage.clear();
      window.location.reload();
    }
    this.router.navigateByUrl("");
  }



  onSearch(): void {
    if (!this.params.search) return;

    this.params.page = 0;
    this.isSearching = true;

    this.globalService.globalSearch(this.params).subscribe({
      next: (results) => {
        this.searchResults = results;
        this.hasMoreResults = results.length === this.params.pageSize;
        this.cdr.markForCheck();
        this.isSearching = false;
      },
      error: (err) => {
        console.error('Search failed:', err);
        this.isSearching = false;
        
        this.cdr.markForCheck();
      },
    });
  }

  loadMore(event: MouseEvent): void {
    event.stopPropagation(); // 🧠 Prevents mat-menu from closing
    this.isLoadingMore = true;
    this.params.page++;

    this.globalService.globalSearch(this.params).subscribe({
      next: (results) => {
        this.searchResults = [...this.searchResults, ...results];
        this.hasMoreResults = results.length === this.params.pageSize;
        this.isLoadingMore = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Load more failed:', err);
        this.isLoadingMore = false;
      },
    });
  }



  openEntity(result: GlobalSearchDTO): void {
    let path = this.getPathByIdc(result.entityIdc);
    let basePath = this.getBasePathByIdc(result.entityIdc);
    this.router.navigateByUrl(basePath?.path + '/' + path?.path + '?id=' + result.entityId);

  }

  toggleSidebar() {
    if (!this.isBrowser) return;

    // Check if sidebar exists in current layout
    const sidebarElement = document.querySelector('app-sidebar');
    if (!sidebarElement) {
      return; // Don't toggle if no sidebar present
    }

    this.sidebarOpen = !this.sidebarOpen;
    // Emit event or use a service to communicate with sidebar component
    const event = new CustomEvent('toggleSidebar', { detail: this.sidebarOpen });
    document.dispatchEvent(event);
  }

  // Check if sidebar should be shown (for conditional display of toggle button)
  get shouldShowToggle(): boolean {
    if (!this.isBrowser) return false;
    return !!document.querySelector('app-sidebar');
  }

  openAddDialog(item: any): void {

    switch (item.value) {

      case environment.routes.AddPerson:
        this.onAddNewPerson();
        break;
      case environment.routes.AddCompany:
        this.onAddNewCompany();
        break;
      case environment.routes.AddProperty:
        this.onAddNewRealEstate();
        break;
      case environment.routes.AddLawFirm:
        this.onAddNewLawFirm();
        break;
      case environment.routes.AddTransaction:
        this.onAddNewTransaction();
        break;
      case environment.routes.AddFpc:
        this.onAddNewFPC();
        break;
      case environment.routes.AddDocumentTracking:
        this.onAddNewDocumentTracking();
        break;
      default:
        break;
    }

  }

  private onAddNewPerson() {
    let path = this.getPathByIdc(EntityIDc.Person);
    let basePath = this.getBasePathByIdc(EntityIDc.Person);

    let person: PersonDto = {
      id: 0,
      personIdc: "",
      personCode: "",
      personEnglishName: "",
      personArabicName: "",
      personShortName: "",
      personStatus: 0,
      fpcCode: "",
      private: true,
      fileName: ""
    };
    const dialogRef = this.dialog.open(PersonDialogFormComponent, {
      width: '600px',
      maxHeight: '90vh',
      disableClose: true,
      autoFocus: false,
      panelClass: 'custom-dialog-container',
      data: person
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigateByUrl(basePath?.path + '/' + path?.path + '?id=' + result.id);
    });
  }



  selectDirection(language: Language) {
    this.selectedLanguage = language;
    this.changeLanguageEmitter.emit(language);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Navigate to dashboard/home page
  navigateToDashboard(): void {
    // Collapse all sidebar menus
    if (this.isBrowser) {
      const event = new CustomEvent('collapseSidebar');
      document.dispatchEvent(event);
    }

    this.router.navigate([environment.routes.dashboard]);
  }

  onAddNewCompany() {
    let path = this.getPathByIdc(EntityIDc.Company);
    let basePath = this.getBasePathByIdc(EntityIDc.Company);

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
        this.router.navigateByUrl(basePath?.path + '/' + path?.path + '?id=' + result.id);
      }
    })
  }


  onAddNewRealEstate() {
    const element: PropertyDTO = {
      id: 0,
      code: "",

      typeOfTitle: null,
      grantor: false,
      grantorAddress: null,
      grantorTitleCommencementDate: null,
      grantorTitleExpiryDate: null,
      grantorTitleExpiryActiveReminder: false,
      grantorDescription: null,

      locationCountryId: null,
      locationCityId: null,
      locationAreaId: null,
      locationDetails: null,

      type: null,
      purpose: null,
      legalStatuses: null,
      legalStatusIds: [],

      private: false,

      plot: null,
      plotFArea: null,
      plotMArea: null,
      propertyFArea: null,
      propertyMArea: null,

    };

    let path = this.getPathByIdc(EntityIDc.Properties);
    let basePath = this.getBasePathByIdc(EntityIDc.Properties);


    const dialogRef = this.dialog.open(PropertyDialogFormComponent, {
      disableClose: true,
      data: element,
      // width: '900px',
      // maxWidth: '95vw',
      // minWidth: '800px',
      panelClass: 'property-dialog-panel'
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigateByUrl(basePath?.path + '/' + path?.path + '?id=' + result.id);
      }
    })
  }

  onAddNewLawFirm() {
    const element: LawFirmDTO = {
      id: 0,
      lawFirmCode: '',
      englishName: '',
      arabicName: '',
      shortName: '',
      status: null,
      lasDate: null,
      estYear: null,
      website: null,
      private: false

    };
    const dialogRef = this.dialog.open(LawFirmDialogFormComponent, {
      disableClose: true,
      data: element,
      // width: '900px',
      // maxWidth: '95vw',
      // minWidth: '800px',
      panelClass: 'property-dialog-panel'
    });

    let path = this.getPathByIdc(EntityIDc.LawFirm);
    let basePath = this.getBasePathByIdc(EntityIDc.LawFirm);


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigateByUrl(basePath?.path + '/' + path?.path + '?id=' + result.id);


      }
    })
  }

  onAddNewTransaction() {
    const element: TransactionDto = {
      id: 0,
      transactionDate: null,
      transactionCode: '',
      subjectType: null,
      subjectDescription: null,
      status: null,
      private: false,

    };
    const dialogRef = this.dialog.open(TransactionDialogFormComponent, {
      disableClose: true,
      data: element,
      // width: '900px',
      // maxWidth: '95vw',
      // minWidth: '800px',
      panelClass: 'property-dialog-panel'
    });

    let path = this.getPathByIdc(EntityIDc.Transactions);
    let basePath = this.getBasePathByIdc(EntityIDc.Transactions);


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigateByUrl(basePath?.path + '/' + path?.path + '?id=' + result.id);
      }
    })
  }


  onAddNewFPC() {
    let fpcDto: FPCDto = {
      id: 0,
      fpcCode: '',
      registerIdc: '',
      registerIdn: 0,
      fpcStatus: CommonStatus.New,
      private: false,
    };
    const dialogRef = this.dialog.open(FpcDialogFormComponent, {
      disableClose: true,
      data: fpcDto
    });

    let path =
      this.getPathByIdc(EntityIDc.FPCs);
    let basePath = this.getBasePathByIdc(EntityIDc.FPCs);


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigateByUrl(basePath?.path + '/' + path?.path + '?id=' + result.id);

      }
    })
  }

  onAddNewDocumentTracking() {
    let document: DocumentTrackingDto = {
      id: 0,
      documentTrackingCode: '',
      referenceNumber: '',
      personId: null,
      registerIdc: '',
      registerIdn: null,
      description: ''
    };
    const dialogRef = this.dialog.open(DocumentTrackingDialogFormComponent, {
      disableClose: true,
      data: document
    });

    let path =
      this.getPathByIdc(EntityIDc.DocumentTracking);
    let basePath = this.getBasePathByIdc(EntityIDc.DocumentTracking);


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigateByUrl(basePath?.path + '/' + path?.path + '?id=' + result.id);

      }
    })
  }




  getBasePathByIdc(idc: string) {
    switch (idc) {
      case EntityIDc.Person:
        return this.menuService.getMenuByPath(environment.routes.Persons);
      case EntityIDc.Company:
        return this.menuService.getMenuByPath(environment.routes.Companies);
      case EntityIDc.Properties:
        return this.menuService.getMenuByPath(environment.routes.Properties);
      case EntityIDc.LawFirm:
        return this.menuService.getMenuByPath(environment.routes.LawFirms);
      case EntityIDc.Transactions:
        return this.menuService.getMenuByPath(environment.routes.Transactions);
      case EntityIDc.FPCs:
        return this.menuService.getMenuByPath(environment.routes.FPCs);
      case EntityIDc.DocumentTracking:
        return this.menuService.getMenuByPath(environment.routes.DocumentTrackings);
      default:
        return null;
    }
  }

  getPathByIdc(idc: string) {
    switch (idc) {
      case EntityIDc.Person:
        return this.menuService.getMenuByPath(environment.routes.AllPersons) ||
          this.menuService.getMenuByPath(environment.routes.ActivePersons) ||
          this.menuService.getMenuByPath(environment.routes.ActivePrivatePersons) ||
          this.menuService.getMenuByPath(environment.routes.ActivePublicPersons);
      case EntityIDc.Company:
        return this.menuService.getMenuByPath(environment.routes.AllCompanies) ||
          this.menuService.getMenuByPath(environment.routes.ActiveCompanies)
          || this.menuService.getMenuByPath(environment.routes.ActivePrivateCompanies) ||
          this.menuService.getMenuByPath(environment.routes.ActivePublicCompanies);
      case EntityIDc.Properties:
        return this.menuService.getMenuByPath(environment.routes.ActiveProperties) ||
          this.menuService.getMenuByPath(environment.routes.AllProperties) ||
          this.menuService.getMenuByPath(environment.routes.ActivePrivateProperties) ||
          this.menuService.getMenuByPath(environment.routes.ActivePublicProperties);
      case EntityIDc.LawFirm:
        return this.menuService.getMenuByPath(environment.routes.AllLawFirms) ||
          this.menuService.getMenuByPath(environment.routes.ActiveLawFirms) ||
          this.menuService.getMenuByPath(environment.routes.ActivePrivateLawFirms) ||
          this.menuService.getMenuByPath(environment.routes.ActivePublicLawFirms);
      case EntityIDc.Transactions:
        return this.menuService.getMenuByPath(environment.routes.AllTransactions) ||
          this.menuService.getMenuByPath(environment.routes.ActiveTransactions) ||
          this.menuService.getMenuByPath(environment.routes.ActivePrivateTransactions) ||
          this.menuService.getMenuByPath(environment.routes.ActivePublicTransactions);
      case EntityIDc.FPCs:
        return this.menuService.getMenuByPath(environment.routes.AllFPCs) ||
          this.menuService.getMenuByPath(environment.routes.ActiveFPCs) ||
          this.menuService.getMenuByPath(environment.routes.ActivePrivateFPCs) ||
          this.menuService.getMenuByPath(environment.routes.ActivePublicFPCs);
      case EntityIDc.DocumentTracking:
        return this.menuService.getMenuByPath(environment.routes.AllDocumentTrackings) ||
          this.menuService.getMenuByPath(environment.routes.ActiveDocumentTrackings) ||
          this.menuService.getMenuByPath(environment.routes.ActivePrivateDocumentTrackings) ||
          this.menuService.getMenuByPath(environment.routes.ActivePublicDocumentTrackings);
      default:
        return null;
    }
  }

  clearSearch() {
    this.params.search = '';
    this.searchResults = [];
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
  }

  getEntityIcon(idc: string): string {
  return entityIcons[idc] || 'help_outline';
}

searchTimeout: any;
showSearchResults = false;


showSearchMenu() {
  this.showSearchResults = true;
  this.menuTrigger.openMenu();
}

}