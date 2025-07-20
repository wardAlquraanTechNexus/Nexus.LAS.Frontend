import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PersonService } from '../../../services/person-service';
import { DisplayColumn } from '../../../models/columns/display-column';
import { GetAllPersonDTO } from '../../../models/persons/get-all-person-dto';
import { PaginateRsult } from '../../../models/paginate-result';
import { GetAllPersonQuery } from '../../../models/persons/get-all-person-query';
import { EventEmitter } from 'stream';
import { BaseParam } from '../../../models/base/base-param';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from '../../../../environment/environment';

@Component({
  selector: 'app-all-persons',
  standalone: false,
  templateUrl: './all-persons.html',
  styleUrl: './all-persons.scss'
})
export class AllPersons implements OnInit {

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

  getAllPersonParams: GetAllPersonQuery = {
    searchBy: null,
    nationality: null,
    private: null,
    status: null,
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
      pipe: "personStatus"
    },
    {
      key: "private",
      label: "Private",
      pipe: 'privatePerson'
    },
  ]
  constructor(
    private personService: PersonService, 
    private cdr: ChangeDetectorRef, 
    private fb: FormBuilder,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    this.personForm = this.fb.group({
      searchBy: [null],
      nationality: [null],
      private: [null],
      status: [null]
    });
    this.getAllPerson();
  }


  getAllPerson() {
    this.showLoading = true;
    this.personService.getAllPerson(this.getAllPersonParams).subscribe({
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
    this.getAllPersonParams.page = pageEvent.page;
    this.getAllPersonParams.pageSize = pageEvent.pageSize;
    this.getAllPerson();
  }
  toggleSettingsMenu(): void {
    this.settingsMenuOpen = !this.settingsMenuOpen;
  }
  search() {
    this.getAllPersonParams = { ...this.personForm.getRawValue() };
    this.getAllPerson();
  }

  onRowClick(person:any){
       this.router.navigate([environment.routes.EditPerson], {
              queryParams: { id: person.id }
            });
  }
}
