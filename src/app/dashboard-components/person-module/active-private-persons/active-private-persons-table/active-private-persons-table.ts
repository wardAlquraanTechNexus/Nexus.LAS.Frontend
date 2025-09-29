import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonStatus } from '../../../../enums/person-status';
import { DisplayColumn } from '../../../../models/columns/display-column';
import { GetPersonsQuery } from '../../../../models/person-models/get-persons/get-persons-query';
import { DynamicListService } from '../../../../services/dynamic-list-service';
import { MenuService } from '../../../../services/menu-service';
import { PersonService } from '../../../../services/person-services/person-service';
import { BasePersonsComponent } from '../../_base/base-persons-component/base-persons-component';
import { LanguageService } from '../../../../services/language-service';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { LanguageCode } from '../../../../models/types/lang-type';

@Component({
  selector: 'app-active-private-persons-table',
  standalone:false,
  templateUrl: './active-private-persons-table.html',
  styleUrl: './active-private-persons-table.scss'
})
export class ActivePrivatePersonsTable extends BasePersonsComponent {

  override params: GetPersonsQuery = {
      searchBy: null,
      nationality: null,
      private: true,
      status: PersonStatus.Active,
      page: 0,
      pageSize: 10,
      orderBy: 'id',
      orderDir: 'desc'
    }
  override displayColumns: DisplayColumn[] = [
    {
      key: "personCode",
      label: "Code",
      sort: true,
      pipes: ["link"]
    },
    {
      key: "personEnglishName",
      label: "Name En",
      pipes: ["link"],
      sort: true
    },
    {
      key: "personArabicName",
      label: "Name Ar",
      pipes: ["link"],
      sort: true
    },
    {
      key: "personShortName",
      label: "Short Name",
      sort: true
    },
    {
      key: "fpcCode",
      label: "FPC Code"
    },
    {
      key: "action",
      label: "Action",
    },
  ]

     constructor(
       override service: PersonService,
       override cdr: ChangeDetectorRef,
       override fb: FormBuilder,
       override router: Router,
       override errorHandler: ErrorHandlerService,
       override route: ActivatedRoute,
       override menuService: MenuService,
       override dialog: MatDialog,
       override dlService: DynamicListService,
       override langService: LanguageService,
     ) {
       super(service, cdr, fb, router, errorHandler, route, menuService, dialog, dlService, langService);
     }
  
    override ngOnInit(): void {
      super.ngOnInit();
      
    }
    override applyLanguage(lang: LanguageCode) {
      if (lang === 'ar') {
        this.displayColumns = [
          { key: "personCode", label: "الكود", sort: true, pipes: ["link"] },
          { key: "personEnglishName", label: "الاسم بالانجليزية", pipes: ["link"], sort: true },
          { key: "personArabicName", label: "الاسم بالعربية", pipes: ["link"], sort: true },
          { key: "personShortName", label: "الاسم المختصر", sort: true },
          { key: "fpcCode", label: "رمز FPC" },
          { key: "action", label: "إجراءات" },
        ];
      } else {
        this.displayColumns = [
          { key: "personCode", label: "Code", sort: true, pipes: ["link"] },
          { key: "personEnglishName", label: "Name En", pipes: ["link"], sort: true },
          { key: "personArabicName", label: "Name Ar", pipes: ["link"], sort: true },
          { key: "personShortName", label: "Short Name", sort: true },
          { key: "fpcCode", label: "FPC Code" },
          { key: "action", label: "Action" },
        ];
      }
      super.applyLanguage(lang);
    }
}
