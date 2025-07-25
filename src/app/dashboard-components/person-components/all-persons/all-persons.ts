import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PersonService } from '../../../services/person-service';
import { DisplayColumn } from '../../../models/columns/display-column';
import { GetAllPersonDTO } from '../../../models/persons/get-all-person-dto';
import { PaginateRsult } from '../../../models/paginate-result';
import { GetAllPersonQuery } from '../../../models/persons/get-all-person-query';
import { EventEmitter } from 'stream';
import { BaseParam } from '../../../models/base/base-param';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environment/environment';
import { UpdatePersonCommand } from '../../../models/persons/update-person';
import { PersonStatus } from '../../../enums/person-status';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuccessSnackbar } from '../../../components/snackbars/success-snackbar/success-snackbar';
import { Sort } from '@angular/material/sort';
import { TableFormComponent } from '../../base-components/table-form-component/table-form-component';
import { Person } from '../../../models/persons/person';

@Component({
  selector: 'app-all-persons',
  standalone: false,
  templateUrl: './all-persons.html',
  styleUrl: './all-persons.scss'
})
export class AllPersons extends TableFormComponent<Person> implements OnInit {


  settingsMenuOpen = false;
  columns = {
    code: true,
    nameEn: true,
    nameAr: true,
    status: true,
    private: true
  };

  override params: GetAllPersonQuery = {
    searchBy: null,
    nationality: null,
    private: null,
    status: null,
    page: 0,
    pageSize: 10
  }


  override displayColumns: DisplayColumn[] = [
    {
      key: "personCode",
      label: "Code",
      sort: true
    },
    {
      key: "personEnglishName",
      label: "Name En",
      sort: true
    },
    {
      key: "personArabicName",
      label: "Name Ar",
      sort: true
    },
    {
      key: "personShortName",
      label: "Short name",
      sort: true
    },
    {
      key: "personStatus",
      label: "Status",
      pipe: "personStatus",
      sort: true
    },
    {
      key: "fpcCode",
      label: "FPC Code"
    },
    {
      key: "private",
      label: "Private",
      pipe: 'privatePerson',
      sort: true
    },
    {
      key: "action",
      label: "Action",
      sort: true
    }
  ]
  personService!: PersonService;;
  constructor(
     service: PersonService,
    cdr: ChangeDetectorRef,
    fb: FormBuilder,
    router: Router,
    snackBar: MatSnackBar,
    route: ActivatedRoute
  ) {
    super(service, cdr, fb, router, snackBar, route);
    this.personService = service;
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }
  

  override fetchData() {
    this.showLoading = true;
    this.personService.getAllPerson(this.params).subscribe({
      next: (res => {
        this.data = res;
        this.showLoading = false;
        this.cdr.detectChanges();
      }),
      error: (err => {
        this.showLoading = false;
        this.cdr.detectChanges();

      })
    })
  }

  toggleSettingsMenu(): void {
    this.settingsMenuOpen = !this.settingsMenuOpen;
  }
  

  onRowClick(person: any) {
    this.router.navigate([environment.routes.EditPerson], {
      queryParams: { id: person.id }
    });
  }


  activate(person: GetAllPersonDTO) {
    const command = this.initUpdatePerson(person);
    command.personStatus = PersonStatus.Active;
    this.updatePerson(command);
  }
  deactivate(person: GetAllPersonDTO) {
    const command = this.initUpdatePerson(person);
    command.personStatus = PersonStatus.Inactive;
    this.updatePerson(command);
  }
  markPublic(person: GetAllPersonDTO) {
    const command = this.initUpdatePerson(person);
    command.private = false;
    this.updatePerson(command);
  }
  markPrivate(person: GetAllPersonDTO) {
    const command = this.initUpdatePerson(person);
    command.private = true;
    this.updatePerson(command);
  }

  deletePerson(person: GetAllPersonDTO) {
    this.showLoading = true;
    this.service.delete(person.id!).subscribe({
      next: (res) => {
        this.showLoading = false;
        this.data.collection = this.data.collection.filter(p => p.id !== person.id);

        this.snackBar.openFromComponent(SuccessSnackbar,
          {
            data: "Deleted Successfully",
            duration: 4000
          }
        )
        this.cdr.detectChanges();
      },
      error: (err => {
        this.showLoading = false;
        this.cdr.detectChanges();
      })
    })
  }

  updatePerson(command: UpdatePersonCommand) {
    this.showLoading = true;
    this.personService.updatePerson(command).subscribe({
      next: (res => {
        this.showLoading = false;
        let updatedPerson: Person | null = this.data.collection.find(p => p.id === command.id) ?? null;
        if (updatedPerson) {
          Object.assign(updatedPerson, res);
        }
        this.cdr.detectChanges();
        this.snackBar.openFromComponent(SuccessSnackbar,
          {
            data: "Updated Successfully",
            duration: 4000
          }
        )
      }), error: (err => {
        this.showLoading = false;
        this.cdr.detectChanges();
      })
    })
  }

  initUpdatePerson(person: GetAllPersonDTO): UpdatePersonCommand {
    let firstNameEn: string = "";
    let middleNameEn: string = "";
    let lastNameEn: string = "";
    let firstNameAr: string = "";
    let middleNameAr: string = "";
    let lastNameAr: string = "";

    if (person?.personEnglishName) {
      const parts = person.personEnglishName.trim().split(/\s+/);
      if (parts.length === 2) {
        [firstNameEn, lastNameEn] = parts;
      } else if (parts.length >= 3) {
        [firstNameEn, middleNameEn, lastNameEn] = parts;
      }
    }

    if (person?.personArabicName) {
      const parts = person.personArabicName.trim().split(/\s+/);
      if (parts.length === 2) {
        [firstNameAr, lastNameAr] = parts;
      } else if (parts.length >= 3) {
        [firstNameAr, middleNameAr, lastNameAr] = parts;
      }
    }

    return {
      firstNameEn: firstNameEn,
      middleNameEn: middleNameEn,
      lastNameEn: lastNameEn,
      firstNameAr: firstNameAr,
      middleNameAr: middleNameAr,
      lastNameAr: lastNameAr,
      shortName: person.personShortName ?? "",
      personStatus: person.personStatus ?? PersonStatus.New,
      private: person.private ?? true,
      id: person.id ?? 0
    }
  }
}
