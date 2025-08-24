import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { GetCompanyDto } from '../../../../models/company-models/get-company-query/get-company-dto';
import { DynamicListService } from '../../../../services/dynamic-list-service';
import { environment } from '../../../../../environment/environment';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-company-overview-component',
  standalone: false,
  templateUrl: './company-overview-component.html',
  styleUrl: './company-overview-component.scss'
})
export class CompanyOverviewComponent implements OnInit, OnChanges {
  companyType$!: Observable<string>;
  companyClass$!: Observable<string>;
  companyLegal$!: Observable<string>;
  placeOfRegistrationMain$!: Observable<string>;
  placeOfRegistrationSub$!: Observable<string>;

  @Input() company!: GetCompanyDto;

  constructor(private dynamicListService: DynamicListService) {}

  ngOnInit(): void {
    if (this.company) {
      this.loadCompanyData();
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
