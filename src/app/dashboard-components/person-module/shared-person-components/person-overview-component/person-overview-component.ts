import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PersonDto } from '../../../../models/person-models/person-dto';
import { LanguageService } from '../../../../services/language-service';
import { LanguageCode } from '../../../../models/types/lang-type';
import { Labels } from '../../../../models/consts/labels';

@Component({
  selector: 'app-person-overview-component',
  standalone: false,
  templateUrl: './person-overview-component.html',
  styleUrls: ['./../../../_shared/styles/model-overview-style.scss']
})
export class PersonOverviewComponent implements OnInit, OnChanges {

  @Input() person!: PersonDto;
  currentLang: LanguageCode = 'en';
  get label() {
    return Labels[this.currentLang as keyof typeof Labels];
  }
  constructor(
    protected langService: LanguageService,
  ) { }

  ngOnInit(): void {
    this.langService.language$.subscribe(lang => {
      this.applyLanguage(lang);
    });
  }
  protected applyLanguage(lang: LanguageCode) {
    this.currentLang = lang;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['person'] && changes['person'].currentValue) {
    }
  }


}
