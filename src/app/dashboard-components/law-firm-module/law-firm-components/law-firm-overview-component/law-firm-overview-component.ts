import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { LawFirmDTO } from '../../../../models/law-firm-models/law-firm/dtos/law-firm-dto';
import { Labels } from '../../../../models/consts/labels';
import { LanguageCode } from '../../../../models/types/lang-type';
import { DynamicListService } from '../../../../services/dynamic-list-service';
import { LanguageService } from '../../../../services/language-service';

@Component({
  selector: 'app-law-firm-overview',
  standalone: false,
  templateUrl: './law-firm-overview-component.html',
  styleUrls: ['./law-firm-overview-component.scss']
})
export class LawFirmOverviewComponent  implements OnInit, OnChanges {

  get label() {
    return Labels[this.currentLang as keyof typeof Labels];
  }
  currentLang: LanguageCode = 'en';

  @Input() lawFirm!: LawFirmDTO;

  constructor(
    private dynamicListService: DynamicListService,
    private langService: LanguageService) { }

  ngOnInit(): void {
    if (this.lawFirm) {
      this.loadData();
      this.langService.language$.subscribe(lang => {
        this.currentLang = lang;
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['lawFirm'] && changes['lawFirm'].currentValue) {
      this.loadData();
    }
  }

  private loadData() {
   
  }
}
