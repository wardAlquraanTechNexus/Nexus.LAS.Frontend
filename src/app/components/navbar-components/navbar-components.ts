import { Component, ViewChild, Inject, PLATFORM_ID, OnDestroy, Output, EventEmitter, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
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
import { MenuTree } from '../../models/menus/menu-tree';
import { Event as RouterEvent, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';


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
      value: environment.routes.AddRealEstate
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
      name: "Documents Tracking",
      icon: "description",
      value: environment.routes.AddDocumentTracking
    },
    {
      name: "FPC",
      icon: "account_balance",
      value: environment.routes.AddFpc
    }
  ]

  selectedLanguage = this.languages[0];

  user: AuthResponse | null;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService,
    protected langService: LanguageService,
    private menuService: MenuService,
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
      default:
        break;
    }

  }

  private onAddNewPerson() {
    let path = this.menuService.getMenuByPath(environment.routes.AllPersons) ||
      this.menuService.getMenuByPath(environment.routes.ActivePersons) ||
      // this.menuService.getMenuByPath(environment.routes.ActivePrivatePersons) ||
      this.menuService.getMenuByPath(environment.routes.ActivePublicPersons);
    let basePersonPath = this.menuService.getMenuByPath(environment.routes.Persons);

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
      this.navigate(result.id, basePersonPath, path);
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
    let baseCompanyPath = this.menuService.getMenuByPath(environment.routes.Companies);

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
        this.navigate(result.id, baseCompanyPath, path);
      }
    })
  }


  navigate(id: any, basePath: MenuTree | null, path: MenuTree | null): void {
    if (!id || !basePath || !path) return;

    // Force reload if navigating to same route
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';

    this.router.navigate([`${basePath.path}/${path.path}`], { queryParams: { id } });
  }
}


