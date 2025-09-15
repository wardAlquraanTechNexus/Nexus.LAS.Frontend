import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { CompanyBoardMemberDto } from '../../../../../models/company-models/company-board-member/dtos/company-board-member-dto';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../../../environment/environment.prod';
import { DynamicList } from '../../../../../models/dynamic-list/dynamic-list';
import { DynamicListService } from '../../../../../services/dynamic-list-service';
import { ErrorHandlerService } from '../../../../../services/error-handler.service';
import { BaseFormComponent } from '../../../../base-components/base-form-component/base-form-component';
import { GetPersonsDTO } from '../../../../../models/person-models/get-persons/get-person-dto';
import { PersonService } from '../../../../../services/person-services/person-service';
import { DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DATE_FORMAT_PROVIDERS } from '../../../../../shared/date-format.config';
import moment from 'moment';
import { LanguageService } from '../../../../../services/language-service';

@Component({
  selector: 'app-company-board-member-form-component',
  standalone: false,
  templateUrl: './company-board-member-form-component.html',
  styleUrl: './company-board-member-form-component.scss',
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] },
    ...DATE_FORMAT_PROVIDERS,
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: false } }
  ]
})
export class CompanyBoardMemberFormComponent extends BaseFormComponent {
  @Input() element!: CompanyBoardMemberDto;
  loadPositionsFn!: (search: string) => Observable<DynamicList[]>;
  loadPersonsFn!: (search: string) => Observable<GetPersonsDTO[]>;


  constructor(
    protected override fb: FormBuilder,
    protected override cdr: ChangeDetectorRef,
    protected override sanitizer: DomSanitizer,
    protected override errorHandler: ErrorHandlerService,
    private dlService: DynamicListService,
    private personService: PersonService,
    override langService: LanguageService,

  ) {
    super(fb, cdr, sanitizer, errorHandler, langService);
  }

  override ngOnInit(): void {
    // Convert date strings to local dates before setup
    if (this.element) {
      // Helper function to convert date strings to local Date objects
      const convertToLocalDate = (dateValue: any, fieldName: string): Date | null => {
        if (!dateValue) return null;

        // If already a Date object, ensure it's in local time
        if (dateValue instanceof Date) {
          return dateValue;
        }

        // Parse the date string and force it to be treated as local time
        // This prevents timezone offset issues
        let momentDate = moment(dateValue);

        // If the date is in ISO format with timezone, parse as UTC and convert to local
        if (typeof dateValue === 'string' && dateValue.includes('T')) {
          momentDate = moment.utc(dateValue).local();
        } else {
          // For date-only strings, parse as local date
          momentDate = moment(dateValue, ['YYYY-MM-DD', 'DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DDTHH:mm:ss']);
        }

        if (momentDate.isValid()) {
          // Create a new date at midnight local time to avoid timezone shifts
          const year = momentDate.year();
          const month = momentDate.month();
          const day = momentDate.date();
          const localDate = new Date(year, month, day, 12, 0, 0); // Set to noon to avoid DST issues

          console.log(`Converted ${fieldName}:`, dateValue, '->', localDate);
          return localDate;
        }

        console.log(`Failed to convert ${fieldName}:`, dateValue);
        return null;
      };

      // Convert appointmentDate
      const appointmentDate = convertToLocalDate(this.element.appointmentDate, 'appointmentDate');
      if (appointmentDate) {
        (this.element as any).appointmentDate = appointmentDate;
      }

      // Convert cessationDate
      const cessationDate = convertToLocalDate(this.element.cessationDate, 'cessationDate');
      if (cessationDate) {
        (this.element as any).cessationDate = cessationDate;
      }
    }

    this.setup(this.element);
    super.ngOnInit();
    this.loadPersonsFn = (search: string) => this.loadPersons(search);
    this.loadPositionsFn = (search: string) => this.dlService.GetAllByParentId(environment.rootDynamicLists.boardPosition, search)
    this.formGroup.controls["personId"].setValidators([Validators.required , Validators.min(1)]);
    this.formGroup.controls["position"].setValidators([Validators.required , Validators.min(1)]);


  }
  loadPersons(search: string) {
    return this.personService.getAllPersons({
      searchBy: search,
      page: 0,
      pageSize: 100
    }).pipe(
      map(res => res.filter(p =>
        p.personEnglishName && p.personEnglishName.toLowerCase().includes(search.toLowerCase())
      ))
    );
  }

  // Override save to handle date conversion
  override save(closeAfterSave: boolean = false): void {
    // Get form values
    const formValue = this.formGroup.getRawValue();

    // Convert dates to ensure they're saved correctly
    if (formValue.appointmentDate) {
      const appointmentMoment = moment(formValue.appointmentDate);
      if (appointmentMoment.isValid()) {
        // Format as local date string to avoid timezone issues
        formValue.appointmentDate = appointmentMoment.format('YYYY-MM-DD');
        console.log('Saving appointmentDate as:', formValue.appointmentDate);
      }
    }

    if (formValue.cessationDate) {
      const cessationMoment = moment(formValue.cessationDate);
      if (cessationMoment.isValid()) {
        // Format as local date string to avoid timezone issues
        formValue.cessationDate = cessationMoment.format('YYYY-MM-DD');
        console.log('Saving cessationDate as:', formValue.cessationDate);
      }
    }

    // Update form with converted values
    this.formGroup.patchValue(formValue);

    // Call parent save
    super.save(closeAfterSave);
  }


}