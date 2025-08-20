import { ChangeDetectorRef, Component } from '@angular/core';
import { PersonService } from '../../../services/person-services/person-service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BasePersonsComponent } from '../_base/base-persons-component/base-persons-component';
import { MenuService } from '../../../services/menu-service';
import { MatDialog } from '@angular/material/dialog';
import { DynamicListService } from '../../../services/dynamic-list-service';
import { LanguageService } from '../../../services/language-service';

@Component({
  selector: 'app-all-persons',
  standalone: false,
  templateUrl: './all-persons.html',
  styleUrls: ['./all-persons.scss', '../_base/base-persons-component/base-persons-component.scss']
})
export class AllPersons extends BasePersonsComponent {

  constructor(
    override service: PersonService,
    override cdr: ChangeDetectorRef,
    override fb: FormBuilder,
    override router: Router,
    override snackBar: MatSnackBar,
    override route: ActivatedRoute,
    override menuService: MenuService,
    override dialog: MatDialog,
    override dlService: DynamicListService,
    override langService: LanguageService,
  ) {
    super(service, cdr, fb, router, snackBar, route, menuService, dialog, dlService, langService);
  }

  override ngOnInit(): void {
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
