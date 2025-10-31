import { ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalInfoDTO } from '../../../models/global-models/global-info/global-info-dto';
import { GlobalService } from '../../../services/global-services/global-service';
import { LanguageService } from '../../../services/language-service';
import { Labels } from '../../../models/consts/labels';
import { LanguageCode } from '../../../models/types/lang-type';
import { EntityIDc } from '../../../enums/entity-idc';

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
    private langService: LanguageService
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

}
