import { ChangeDetectorRef, Component } from '@angular/core';
import { BasePersonsComponent } from '../../_base/base-persons-component/base-persons-component';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicListService } from '../../../../services/dynamic-list-service';
import { MenuService } from '../../../../services/menu-service';
import { PersonService } from '../../../../services/person-services/person-service';
import { LanguageService } from '../../../../services/language-service';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { LanguageCode } from '../../../../models/types/lang-type';

@Component({
  selector: 'app-all-person-table',
  standalone: false,
  templateUrl: './all-person-table.html',
  styleUrls: ['./all-person-table.scss', '../../_base/base-persons-component/base-persons-component.scss']
})
export class AllPersonTable extends BasePersonsComponent {

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

    this.route.queryParams.subscribe(params => {
      let id = +params['id'];
      console.log(id);
    })
    
    super.ngOnInit();
  }


  override applyLanguage(lang: LanguageCode) {

    if (lang === 'ar') {
      this.displayColumns = [
        { key: "select", label: "" },
        { key: "personCode", label: "الكود", sort: true, pipes: ["link"] },
        { key: "personEnglishName", label: "الاسم بالانجليزية", pipes: ["link"], sort: true },
        { key: "personArabicName", label: "الاسم بالعربية", pipes: ["link"], sort: true },
        { key: "personShortName", label: "الاسم المختصر", sort: true },
        { key: "personStatus", label: "الحالة", pipes: ["personStatus"], sort: true },
        { key: "fpcCode", label: "رمز FPC" },
        { key: "private", label: "خاص", pipes: ['privatePerson'], sort: true },
        { key: "action", label: "إجراءات" },
      ];
    } else {
      // default English
      this.displayColumns = [
        { key: "select", label: "" },
        { key: "personCode", label: "Code", sort: true, pipes: ["link"] },
        { key: "personEnglishName", label: "Name En", pipes: ["link"], sort: true },
        { key: "personArabicName", label: "Name Ar", pipes: ["link"], sort: true },
        { key: "personShortName", label: "Short Name", sort: true },
        { key: "personStatus", label: "Status", pipes: ["personStatus"], sort: true },
        { key: "fpcCode", label: "FPC Code" },
        { key: "private", label: "Private", pipes: ['privatePerson'], sort: true },
        { key: "action", label: "Action" },
      ];
    }

    super.applyLanguage(lang);
  }

  /**
   * Get audit information tooltip for a person record
   */
  getAuditTooltip(person: any): string {
    const createdBy = person?.createdBy || 'N/A';
    const createdAt = person?.createdAt ? new Date(person.createdAt).toLocaleDateString('en-GB') : 'N/A';
    const modifiedBy = person?.modifiedBy || 'N/A';
    const modifiedAt = person?.modifiedAt ? new Date(person.modifiedAt).toLocaleDateString('en-GB') : 'N/A';

    return `Created by: ${createdBy}\nCreated at: ${createdAt}\n\nModified by: ${modifiedBy}\nModified at: ${modifiedAt}`;
  }

  /**
   * TrackBy function for performance optimization
   */
  trackByPersonId(index: number, person: any): any {
    return person.id;
  }

}
