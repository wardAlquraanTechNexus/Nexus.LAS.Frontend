import { Component, ViewChild, Inject, PLATFORM_ID, OnDestroy, Output, EventEmitter, OnInit } from '@angular/core';
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


@Component({
  selector: 'app-navbar-component',
  templateUrl: './navbar-components.html',
  styleUrls: ['./navbar-components.scss'],
  standalone: false
})
export class NavbarComponent implements OnDestroy, OnInit {
  searchText = '';
  searchResults: string[] = [];
  sidebarOpen = true;
  currentLang: LanguageCode = 'en';

  isNavigating = false;
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

  listToCreated = [
    {
      name: "Person",
      icon: "person",
      value: environment.routes.AddPerson
    },
    {
      name: "Company",
      icon: "business",
      value: environment.routes.AddCompany
    },
    {
      name: "Real Estate",
      icon: "home_work",
      value: environment.routes.AddProperty
    },

    {
      name: "Law Firm",
      icon: "gavel",
      value: environment.routes.AddLawFirm
    },
    {
      name: "Transaction",
      icon: "swap_horiz",
      value: environment.routes.AddTransaction
    },
    {
      name: "FPC",
      icon: "business_center",
      value: environment.routes.AddFpc
    },
    {
      name: "Documents Tracking",
      icon: "description",
      value: environment.routes.AddDocumentTracking
    },
  ]

  selectedLanguage = this.languages[0];

  user: AuthResponse | null;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService,
    protected langService: LanguageService,
    private menuService: MenuService,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.user = this.authService.getUser();
  }

  ngOnInit() {
    this.langService.language$.subscribe(lang => {
      this.currentLang = lang;
    });


    this.router.events
      .pipe(takeUntil(this.destroy$))
      .subscribe((event: RouterEvent) => {
        if (event instanceof NavigationStart) {
          this.isNavigating = true;
        }
        if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
          this.isNavigating = false;
        }
      });


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

  onSearch() {
    // Simulate a search; replace with actual logic
    const allItems = ['Person A', 'Company B', 'Real Estate C', 'Law Firm D'];
    this.searchResults = allItems.filter(item =>
      item.toLowerCase().includes(this.searchText.toLowerCase())
    );
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
      default:
        break;
    }

  }

  private onAddNewPerson() {
    let path = this.menuService.getMenuByPath(environment.routes.AllPersons) ||
      this.menuService.getMenuByPath(environment.routes.ActivePersons) ||
      // this.menuService.getMenuByPath(environment.routes.ActivePrivatePersons) ||
      this.menuService.getMenuByPath(environment.routes.ActivePublicPersons);
    let basePath = this.menuService.getMenuByPath(environment.routes.Persons);

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

  onAddNewCompany() {
    let path =
      this.menuService.getMenuByPath(environment.routes.AllCompanies) ||
      this.menuService.getMenuByPath(environment.routes.ActiveCompanies) ||
      this.menuService.getMenuByPath(environment.routes.ActivePrivateCompanies) ||
      this.menuService.getMenuByPath(environment.routes.ActivePublicCompanies);
    let basePath = this.menuService.getMenuByPath(environment.routes.Companies);

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

    let path =
      this.menuService.getMenuByPath(environment.routes.AllProperties) ||
      this.menuService.getMenuByPath(environment.routes.ActiveProperties) ||
      this.menuService.getMenuByPath(environment.routes.ActivePrivateProperties) ||
      this.menuService.getMenuByPath(environment.routes.ActivePublicProperties);
    let basePath = this.menuService.getMenuByPath(environment.routes.Properties);


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

    let path =
      this.menuService.getMenuByPath(environment.routes.AllLawFirms) ||
      this.menuService.getMenuByPath(environment.routes.ActiveLawFirms) ||
      this.menuService.getMenuByPath(environment.routes.ActivePrivateLawFirms) ||
      this.menuService.getMenuByPath(environment.routes.ActivePublicLawFirms);
    let basePath = this.menuService.getMenuByPath(environment.routes.LawFirms);


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

    let path =
      this.menuService.getMenuByPath(environment.routes.AllTransactions) ||
      this.menuService.getMenuByPath(environment.routes.ActiveTransactions) ||
      this.menuService.getMenuByPath(environment.routes.ActivePrivateTransactions) ||
      this.menuService.getMenuByPath(environment.routes.ActivePublicTransactions);
    let basePath = this.menuService.getMenuByPath(environment.routes.Transactions);


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
      this.menuService.getMenuByPath(environment.routes.AllFPCs) ||
      this.menuService.getMenuByPath(environment.routes.ActivePrivateFPCs) ||
      this.menuService.getMenuByPath(environment.routes.ActivePublicFPCs);
    let basePath = this.menuService.getMenuByPath(environment.routes.FPCs);


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigateByUrl(basePath?.path + '/' + path?.path + '?id=' + result.id);

      }
    })
  }




}


