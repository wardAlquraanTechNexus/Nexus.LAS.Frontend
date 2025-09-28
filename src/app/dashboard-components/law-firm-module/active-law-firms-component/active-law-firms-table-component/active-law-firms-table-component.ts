import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicListService } from '../../../../services/dynamic-list-service';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { LanguageService } from '../../../../services/language-service';
import { LawFirmExpertiseService } from '../../../../services/law-firm-services/law-firm-expertise-service';
import { LawFirmService } from '../../../../services/law-firm-services/law-firm-service';
import { MenuService } from '../../../../services/menu-service';
import { BaseLawFirmsComponent } from '../../_base/base-law-firms-component/base-law-firms-component';
import { GetLawFirmQuery } from '../../../../models/law-firm-models/law-firm/params/get-law-firm-query';
import { CommonStatus } from '../../../../enums/common-status';

@Component({
  selector: 'app-active-law-firms-table-component',
  standalone: false,
  templateUrl: './active-law-firms-table-component.html',
  styleUrl: './active-law-firms-table-component.scss'
})
export class ActiveLawFirmsTableComponent extends BaseLawFirmsComponent
{

  
  constructor(
    override service: LawFirmService,
    override cdr: ChangeDetectorRef,
    override fb: FormBuilder,
    override router: Router,
    override errorHandler: ErrorHandlerService,
    override route: ActivatedRoute,
    override menuService: MenuService,
    override dialog: MatDialog,
    override dlService: DynamicListService,
    override langService: LanguageService,
    override lawFirmExpertiseService: LawFirmExpertiseService,
  ) {
    super(service, cdr, fb, router, errorHandler, route, menuService, dialog, dlService, langService , lawFirmExpertiseService);
  }

  override ngOnInit(): void {
    this.params.statuses = CommonStatus.Active.toString();
    super.ngOnInit();
  }

  override setDisplayColumns() {
    this.displayColumns = [
      { key: "select", label: this.label.COMMON.SELECT },
      { 
        key: "lawFirmCode", 
        label: this.label.COMMON.CODE, 
        pipes: ["link"], 
        sort: true },
      { 
        key: "englishName", 
        label: this.label.COMMON.NAME_EN,
        sort: true ,
      },
      { 
        key: "arabicName", 
        label: this.label.COMMON.NAME_AR,
        sort: true ,
      },
      { 
        key: "shortName", 
        label: this.label.COMMON.SHORT_NAME,
        sort: true ,
      },
      {
        key: "website", 
        label: this.label.LAW_FIRM.WEBSITE, 
        sort: false
      },
      {
        key: "estYear", 
        label: this.label.LAW_FIRM.EST_YEAR, 
        sort: false
      },
      {
        key: "lasDate", 
        label: this.label.LAW_FIRM.LAS_DATE, 
        sort: false,
        pipes: ['date']
      },
      { 
        key: "countryId", 
        label: this.label.COMMON.COUNTRY, 
        sort: true ,
        pipes: ['country']
      },
      { 
        key: "private", 
        label: this.label.COMMON.PRIVATE, 
        sort: true ,
        pipes: ['private']
      },
      
      { key: "action", label: this.label.COMMON.ACTIONS }
    ];

   
  }

}
