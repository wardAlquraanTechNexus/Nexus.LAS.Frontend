import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalInfoDTO } from '../../../models/global-models/global-info/global-info-dto';
import { GlobalService } from '../../../services/global-services/global-service';
import { LanguageService } from '../../../services/language-service';
import { Labels } from '../../../models/consts/labels';
import { LanguageCode } from '../../../models/types/lang-type';
import { EntityIDc } from '../../../enums/entity-idc';
import { environment } from '../../../../environment/environment';
import { MenuService } from '../../../services/menu-service';
import { info } from 'console';

@Component({
  selector: 'global-cards',
  standalone: false,
  templateUrl: './global-cards-component.html',
  styleUrl: './global-cards-component.scss'
})
export class GlobalCardsComponent implements OnInit, OnDestroy {

  isFetching = false;
  globalInfo: GlobalInfoDTO[] = [];
  private refreshInterval?: any;

  get label() {
    return Labels[this.currentLang as keyof typeof Labels];
  }
  currentLang: LanguageCode = 'en';

  constructor(
    private globalService: GlobalService,
    private cdr: ChangeDetectorRef,
    private langService: LanguageService,
    private menuService: MenuService
  ) { }

  ngOnInit(): void {
    this.fetchData();
    this.subscribeLanguage();
    this.refreshInterval = setInterval(() => {
      this.fetchData();
    }, 5 * 60 * 1000);
  }

  subscribeLanguage() {
    this.langService.language$.subscribe(lang => {
      this.currentLang = lang;
    });

  }

  ngOnDestroy(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }

  fetchData(): void {
    this.isFetching = true;
    this.globalService.globalInfo().subscribe({
      next: (res => {
        this.globalInfo = res;
        this.isFetching = false;
        this.cdr.markForCheck();
      }),
      error: (err => {
        this.isFetching = false;
        this.cdr.markForCheck();
      })
    });
  }

  refreshData(): void {
    this.fetchData();
  }

  getCardColor(idc: string): string {
    const idcLower = idc?.toLowerCase() || '';
    const colorMap: { [key: string]: string } = {
      'company': 'linear-gradient(135deg, #2196f3, #1976d2)', // Blue
      'person': 'linear-gradient(135deg, #9c27b0, #7b1fa2)',  // Purple
      'property': 'linear-gradient(135deg, #4caf50, #388e3c)', // Green
      'transaction': 'linear-gradient(135deg, #ff9800, #f57c00)', // Orange
      'document': 'linear-gradient(135deg, #f44336, #c62828)', // Red
      'fpc': 'linear-gradient(135deg, #00bcd4, #0097a7)', // Cyan
      'lawfirm': 'linear-gradient(135deg, #795548, #5d4037)', // Brown
    };

    // Check if idc contains any of the keywords
    for (const [key, color] of Object.entries(colorMap)) {
      if (idcLower.includes(key)) {
        return color;
      }
    }

    return 'linear-gradient(135deg, #013772, #0056b3)'; // Default Nexus blue
  }

  getNameTranslated(info: GlobalInfoDTO): string {
    switch(info.idc){
      case EntityIDc.Person:
        return this.label.COMMON.PERSON;
      case EntityIDc.Company:
        return this.label.COMMON.COMPANY;
      case EntityIDc.Properties:
        return this.label.PROPERTY.REAL_ESTATE;
      case EntityIDc.LawFirm:
        return this.label.LAW_FIRM.LAW_FIRM;
      case EntityIDc.Transactions:
        return this.label.TRANSACTION.TRANSACTION;
      case EntityIDc.FPCs:
        return this.label.FPC.FPC;
      default:
        return info.name || '';
    }
  }

  getPath(idc:string): string {
    switch(idc){
      case EntityIDc.Person:
        let path = 
        this.menuService.getMenuByPath(environment.routes.AllPeople)
        || this.menuService.getMenuByPath(environment.routes.ActivePeople)
        || this.menuService.getMenuByPath(environment.routes.InactivePeople)
        || this.menuService.getMenuByPath(environment.routes.ActivePrivatePeople)
        || this.menuService.getMenuByPath(environment.routes.ActivePublicPeople);
        return  environment.routes.People+"/" +path?.path;

      case EntityIDc.Company:
        let companyPath =
        this.menuService.getMenuByPath(environment.routes.AllCompanies)
        || this.menuService.getMenuByPath(environment.routes.ActiveCompanies)
        || this.menuService.getMenuByPath(environment.routes.InactiveCompanies)
        || this.menuService.getMenuByPath(environment.routes.ActivePrivateCompanies)
        || this.menuService.getMenuByPath(environment.routes.ActivePublicCompanies);
        return  environment.routes.Companies+"/" +companyPath?.path;
      case EntityIDc.LawFirm:
        let lawFirmPath =
        this.menuService.getMenuByPath(environment.routes.AllLawFirms)
        || this.menuService.getMenuByPath(environment.routes.ActiveLawFirms)
        || this.menuService.getMenuByPath(environment.routes.InactiveLawFirms)
        || this.menuService.getMenuByPath(environment.routes.ActivePrivateLawFirms)
        || this.menuService.getMenuByPath(environment.routes.ActivePublicLawFirms);
        return  environment.routes.LawFirms+"/" +lawFirmPath?.path;
      case EntityIDc.Transactions:
        let transactionPath =
        this.menuService.getMenuByPath(environment.routes.AllTransactions)
        || this.menuService.getMenuByPath(environment.routes.ActiveTransactions)
        || this.menuService.getMenuByPath(environment.routes.InactiveTransactions)
        || this.menuService.getMenuByPath(environment.routes.ActivePrivateTransactions)
        || this.menuService.getMenuByPath(environment.routes.ActivePublicTransactions);
        return  environment.routes.Transactions+"/" +transactionPath?.path;
      case EntityIDc.FPCs:
        let fpcPath =
        this.menuService.getMenuByPath(environment.routes.AllFPCs)
        || this.menuService.getMenuByPath(environment.routes.ActiveFPCs)
        || this.menuService.getMenuByPath(environment.routes.InactiveFPCs)
        || this.menuService.getMenuByPath(environment.routes.ActivePrivateFPCs)
        || this.menuService.getMenuByPath(environment.routes.ActivePublicFPCs);
        return  environment.routes.FPCs+"/" +fpcPath?.path;
      case EntityIDc.Properties:
        let propertyPath =
        this.menuService.getMenuByPath(environment.routes.AllRealEstate)
        || this.menuService.getMenuByPath(environment.routes.ActiveRealEstate)
        || this.menuService.getMenuByPath(environment.routes.ActivePrivateRealEstate)
        || this.menuService.getMenuByPath(environment.routes.ActivePublicRealEstate);
        return  environment.routes.RealEstate+"/" +propertyPath?.path;
      case EntityIDc.DocumentTracking:
        let documentPath =
        this.menuService.getMenuByPath(environment.routes.AllDocumentTrackings)
        || this.menuService.getMenuByPath(environment.routes.ActiveDocumentTrackings)
        || this.menuService.getMenuByPath(environment.routes.ActivePrivateDocumentTrackings)
        || this.menuService.getMenuByPath(environment.routes.ActivePublicDocumentTrackings);
        return  environment.routes.DocumentTrackings+"/" +documentPath?.path;
        case EntityIDc.FPCs:
          let fpcPaths =
          this.menuService.getMenuByPath(environment.routes.AllFPCs)
          || this.menuService.getMenuByPath(environment.routes.ActiveFPCs)
          || this.menuService.getMenuByPath(environment.routes.InactiveFPCs)
          || this.menuService.getMenuByPath(environment.routes.ActivePrivateFPCs)
          || this.menuService.getMenuByPath(environment.routes.ActivePublicFPCs);
          return  environment.routes.FPCs+"/" +fpcPaths?.path;
      default:
        return '';
    }
  }



}
