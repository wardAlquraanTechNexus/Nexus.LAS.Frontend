import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth-service';
import { environment } from '../../../../environment/environment';
import { CommonStatus } from '../../../enums/common-status';
import { GetCompanyDto } from '../../../models/company-models/get-company-query/get-company-dto';
import { DocumentTrackingDto } from '../../../models/document-tracking-models/document-tracking/dtos/document-tracking-dto';
import { FPCDto } from '../../../models/fpc-models/fpc/dtos/fpc-dto';
import { LawFirmDTO } from '../../../models/law-firm-models/law-firm/dtos/law-firm-dto';
import { PersonDto } from '../../../models/person-models/person-dto';
import { PropertyDTO } from '../../../models/property-models/property/dtos/propery-dto';
import { TransactionDto } from '../../../models/transaction-models/transaction/dtos/transaction-dto';
import { CompanyFormDialog } from '../../company-module/company-form-dialog/company-form-dialog';
import { DocumentTrackingDialogFormComponent } from '../../document-tracking-module/document-tracking-dialog-form-component/document-tracking-dialog-form-component';
import { FpcDialogFormComponent } from '../../fpc-module/fpc-dialog-form-component/fpc-dialog-form-component';
import { LawFirmDialogFormComponent } from '../../law-firm-module/law-firm-dialog-form-component/law-firm-dialog-form-component';
import { PersonDialogFormComponent } from '../../person-module/person-dialog-form-component/person-dialog-form-component';
import { PropertyDialogFormComponent } from '../../property-module/property-dialog-form-component/property-dialog-form-component';
import { TransactionDialogFormComponent } from '../../transaction-module/transaction-dialog-form-component/transaction-dialog-form-component';
import { Router } from '@angular/router';
import { MenuService } from '../../../services/menu-service';
import { MatDialog } from '@angular/material/dialog';
import { TransactionActionStatus } from '../../../models/transaction-models/transaction-action/enums/transaction-action-status';
import { GlobalService } from '../../../services/global-services/global-service';
import { LanguageService } from '../../../services/language-service';
import { Labels } from '../../../models/consts/labels';
import { LanguageCode } from '../../../models/types/lang-type';

@Component({
  selector: 'app-main-dashboard-component',
  standalone: false,
  templateUrl: './main-dashboard-component.html',
  styleUrl: './main-dashboard-component.scss'
})
export class MainDashboardComponent implements OnInit {
  currentUser: string = '';
  currentDate = new Date();
  get label() {
    return Labels[this.currentLang as keyof typeof Labels];
  }
  currentLang: LanguageCode = 'en';

  transactionActionStatuses: TransactionActionStatus[] = [
    TransactionActionStatus.Pending,
    TransactionActionStatus.New
  ];
  constructor(
    private authService: AuthService,
    private router: Router,
    private menuService: MenuService,
    private globalService: GlobalService,
    private langService: LanguageService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    const user = this.authService.getUser();
    this.currentUser = user?.userName || 'User';

  }

  subscribeLanguage() {
    this.langService.language$.subscribe(lang => {
      this.currentLang = lang;
    });

  }

  getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  }


  onAddNewPerson() {
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






  // Navigate to dashboard/home page
  navigateToDashboard(): void {


    this.router.navigate([environment.routes.dashboard]);
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
      this.menuService.getMenuByPath(environment.routes.AllDocumentTrackings);
    let basePath = this.menuService.getMenuByPath(environment.routes.DocumentTrackings);


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigateByUrl(basePath?.path + '/' + path?.path + '?id=' + result.id);

      }
    })
  }
}
