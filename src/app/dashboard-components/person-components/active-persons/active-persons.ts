import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GetAllPersonDTO } from '../../../models/persons/get-all-person-dto';
import { PaginateRsult } from '../../../models/paginate-result';
import { GetAllActivePersonQuery } from '../../../models/persons/get-all-active-person-query';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DisplayColumn } from '../../../models/columns/display-column';
import { PersonService } from '../../../services/person-service';
import { BaseParam } from '../../../models/base/base-param';

@Component({
  selector: 'app-active-persons',
  standalone:false,
  templateUrl: './active-persons.html',
  styleUrl: './active-persons.scss'
})
export class ActivePersons implements OnInit {

  showLoading = true;
  allPersons!: PaginateRsult<GetAllPersonDTO>
  settingsMenuOpen = false;
  columns = {
    code: true,
    nameEn: true,
    nameAr: true,
    status: true,
    private: true
  };

  getAllActivePersonParams: GetAllActivePersonQuery = {
    searchBy: null,
    nationality: null,
    private: null,
    page: 0,
    pageSize: 10
  }
  personForm!: FormGroup;


  displayColumns: DisplayColumn[] = [
    {
      key: "personCode",
      label: "Code"
    },
    {
      key: "personEnglishName",
      label: "Name En"
    },
    {
      key: "personArabicName",
      label: "Name Ar"
    },
    {
      key: "personShortName",
      label: "Short name"
    },
    {
      key: "personStatus",
      label: "Status",
    },
    {
      key: "private",
      label: "Private",
    },
  ]
  constructor(private personService: PersonService, private cdr: ChangeDetectorRef, private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.personForm = this.fb.group({
      searchBy: [null],
      nationality: [null],
      private: [null],
      status: [null]
    });
    this.getAllActivePerson();
  }


  getAllActivePerson() {
    this.showLoading = true;
    this.personService.getAllActivePerson(this.getAllActivePersonParams).subscribe({
      next: (res => {
        this.allPersons = res;
        this.showLoading = false;
        this.cdr.detectChanges();
      }),
      error: (err => {
        this.showLoading = false;
        this.cdr.detectChanges();

      })
    })
  }

  changePage(pageEvent: BaseParam) {
    this.getAllActivePersonParams.page = pageEvent.page;
    this.getAllActivePersonParams.pageSize = pageEvent.pageSize;
    this.getAllActivePerson();
  }
  toggleSettingsMenu(): void {
    this.settingsMenuOpen = !this.settingsMenuOpen;
  }
  search() {
    this.getAllActivePersonParams = { ...this.personForm.getRawValue() };
    this.getAllActivePerson();
  }
}
