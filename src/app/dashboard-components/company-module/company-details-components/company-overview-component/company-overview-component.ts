import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { GetCompanyDto } from '../../../../models/company-models/get-company-query/get-company-dto';
import { DynamicListService } from '../../../../services/dynamic-list-service';
import { environment } from '../../../../../environment/environment';
import { map, Observable } from 'rxjs';
import { LanguageService } from '../../../../services/language-service';
import { Labels } from '../../../../models/consts/labels';
import { LanguageCode } from '../../../../models/types/lang-type';

@Component({
  selector: 'app-company-overview-component',
  standalone: false,
  templateUrl: './company-overview-component.html',
  styleUrls: ['./../../../_shared/styles/model-overview-style.scss']
})
export class CompanyOverviewComponent implements OnInit, OnChanges {
  companyType$!: Observable<string>;
  companyClass$!: Observable<string>;
  companyLegal$!: Observable<string>;
  placeOfRegistrationMain$!: Observable<string>;
  placeOfRegistrationSub$!: Observable<string>;

  get label() {
    return Labels[this.currentLang as keyof typeof Labels];
  }
  currentLang: LanguageCode = 'en';

  @Input() company!: GetCompanyDto;

  constructor(
    private dynamicListService: DynamicListService,
    private langService: LanguageService) { }

  ngOnInit(): void {
    if (this.company) {
      this.loadCompanyData();
      this.langService.language$.subscribe(lang => {
        this.currentLang = lang;
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['company'] && changes['company'].currentValue) {
      this.loadCompanyData();
    }
  }

  private loadCompanyData() {
    if (this.company.companyTypeIdn) {
      this.companyType$ = this.dynamicListService
        .GetAllByParentId(environment.rootDynamicLists.companyType)
        .pipe(map(res => res.find(x => x.id == this.company.companyTypeIdn)?.name || ''));

      if (this.company.companyTypeIdn) {
        this.companyClass$ = this.dynamicListService
          .GetAllByParentId(this.company.companyTypeIdn)
          .pipe(map(res => res.find(x => x.id == this.company.companyClassIdn)?.name || ''));
      }
    }

    if (this.company.legalTypeIdn) {
      this.companyLegal$ = this.dynamicListService
        .GetAllByParentId(environment.rootDynamicLists.legalType)
        .pipe(map(res => res.find(x => x.id == this.company.legalTypeIdn)?.name || ''));
    }

    if (this.company.placeOfRegistrationMainIdn) {
      this.placeOfRegistrationMain$ = this.dynamicListService
        .GetAllByParentId(environment.rootDynamicLists.placeOfRegistration)
        .pipe(map(res => res.find(x => x.id == this.company.placeOfRegistrationMainIdn)?.name || ''));

      if (this.company.placeOfRegistrationSubIdn) {
        this.placeOfRegistrationSub$ = this.dynamicListService
          .GetAllByParentId(this.company.placeOfRegistrationMainIdn)
          .pipe(map(res => res.find(x => x.id == this.company.placeOfRegistrationSubIdn)?.name || ''));
      }
    }
  }
}
