import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PersonService } from '../../../services/person-service';
import { DisplayColumn } from '../../../models/columns/display-column';
import { GetAllPersonDTO } from '../../../models/persons/get-all-person-dto';
import { PaginateRsult } from '../../../models/paginate-result';
import { GetAllPersonQuery } from '../../../models/persons/get-all-person-query';
import { EventEmitter } from 'stream';
import { BaseParam } from '../../../models/base/base-param';

@Component({
  selector: 'app-all-persons',
  standalone: false,
  templateUrl: './all-persons.html',
  styleUrl: './all-persons.scss'
})
export class AllPersons implements OnInit {

  showLoading = true;
  allPersons!: PaginateRsult<GetAllPersonDTO>

  getAllPersonParams: GetAllPersonQuery = {
    searchBy: null,
    nationality: null,
    private: null,
    status: null,
    page: 1,
    pageSize: 10
  }

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
      label: "Status"
    },
    {
      key: "private",
      label: "Private"
    },
  ]
  constructor(private personService: PersonService,private cdr: ChangeDetectorRef) {

  }

  ngOnInit(): void {
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

  changePage(pageEvent:BaseParam){
    this.getAllPersonParams.page = pageEvent.page;
    this.getAllPersonParams.pageSize = pageEvent.pageSize;
    this.getAllPerson();
  }
}
