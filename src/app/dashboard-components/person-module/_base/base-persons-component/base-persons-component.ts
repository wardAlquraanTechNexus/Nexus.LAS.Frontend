import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Person } from '../../../../models/persons/person';
import { TableFormComponent } from '../../../base-components/table-form-component/table-form-component';
import { PersonStatus } from '../../../../enums/person-status';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../../../../services/person-service';
import { environment } from '../../../../../environment/environment';
import { SuccessSnackbar } from '../../../../components/snackbars/success-snackbar/success-snackbar';
import { BulkChangePrivateCommand } from '../../../../models/persons/bulk-change-private-command';
import { BulkChangeStatusCommand } from '../../../../models/persons/bulk-change-status-command';
import { UpdatePersonCommand } from '../../../../models/persons/update-person';
import { GetPersonsQuery } from '../../../../models/persons/get-persons/get-persons-query';
import { GetPersonsDTO } from '../../../../models/persons/get-persons/get-person-dto';
import { Sort } from '@angular/material/sort';
import { BaseParam } from '../../../../models/base/base-param';
import { MatDialog } from '@angular/material/dialog';
import { MenuService } from '../../../../services/menu-service';
import { AddPerson } from '../../add-person/add-person';
import { MenuTree } from '../../../../models/menus/menu-tree';

@Component({
  selector: 'app-base-persons-component',
  standalone: false,
  templateUrl: './base-persons-component.html',
  styleUrl: './base-persons-component.scss'
})
export class BasePersonsComponent extends TableFormComponent<Person> implements OnInit {
  override params: GetPersonsQuery = {
    searchBy: null,
    nationality: null,
    private: null,
    status: null,
    page: 0,
    pageSize: 10
  }

  activeStatus = PersonStatus.Active;
  inactiveStatus = PersonStatus.Inactive;
  selectedPersons: Person[] = [];

  columns = {
    code: true,
    nameEn: true,
    nameAr: true,
    status: true,
    private: true
  };

  currentMenu:MenuTree | null = null;

  constructor(
    override service: PersonService,
    override cdr: ChangeDetectorRef,
    override fb: FormBuilder,
    override router: Router,
    override snackBar: MatSnackBar,
    override route: ActivatedRoute,
    protected menuService: MenuService,
    protected dialog: MatDialog,
  ) {
    super(service, cdr, fb, router, snackBar, route);
  }

  override ngOnInit(): void {
    let routerSplitted = this.router.url.split('/');
    let roterLen = routerSplitted.length;

    this.currentMenu = this.menuService.getMenuByPath(routerSplitted[roterLen-1]);
    this.fetchData();
  }
  override search() {
    this.fetchData();
  }

  override fetchData() {
    this.cdr.detectChanges();
    this.showLoading = true;
    this.service.getPersons(this.params).subscribe({
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

  override changeSort(sortState: Sort) {
    if (this.sortState.active == sortState.active) {
      this.sortState.direction = this.sortState.direction === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortState.active = sortState.active;
      this.sortState.direction = sortState.direction;;
    }
    this.params.orderBy = this.sortState.active;
    this.params.orderDir = this.sortState.direction;
    this.fetchData();
  }

  override changePage(pageEvent: BaseParam) {
    this.params.page = pageEvent.page;
    this.params.pageSize = pageEvent.pageSize;
    this.fetchData();
  }


  onRowClick(elementRow: any) {
    if (elementRow.key == "personArabicName" || elementRow.key == "personEnglishName" || elementRow.key == "personCode") {
      this.router.navigate([`${environment.routes.Persons}/${environment.routes.ViewPersons}`], {
        queryParams: { id: elementRow.element.id }
      });
    }
  }

  exportToExcel() {
    this.service.exportPersonToExcel(this.params).subscribe(res => {
      // Assuming res.data is base64 string:
      const binaryString = atob(res.data);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const blob = new Blob([bytes], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });

      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = res.fileName || 'export.xlsx';
      link.click();
      URL.revokeObjectURL(link.href);
    });
  }


  activate(person: GetPersonsDTO) {
    const command = this.initUpdatePerson(person);
    command.personStatus = PersonStatus.Active;
    this.updatePerson(command);
  }
  deactivate(person: GetPersonsDTO) {
    const command = this.initUpdatePerson(person);
    command.personStatus = PersonStatus.Inactive;
    this.updatePerson(command);
  }
  markPublic(person: GetPersonsDTO) {
    const command = this.initUpdatePerson(person);
    command.private = false;
    this.updatePerson(command);
  }
  markPrivate(person: GetPersonsDTO) {
    const command = this.initUpdatePerson(person);
    command.private = true;
    this.updatePerson(command);
  }

  initUpdatePerson(person: GetPersonsDTO): UpdatePersonCommand {

    return {
      personEnglishName: person.personEnglishName,
      personArabicName: person.personArabicName,
      personShortName: person.personShortName ?? "",
      personStatus: person.personStatus ?? PersonStatus.New,
      private: person.private ?? true,
      id: person.id ?? 0
    }
  }

  deletePerson(person: GetPersonsDTO) {
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
    this.service.updatePerson(command).subscribe({
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
        this.cdr.markForCheck();
        this.showLoading = false;
      })
    })
  }

  bulkChangeStatus(status: PersonStatus) {
    let command: BulkChangeStatusCommand = {
      ids: this.selectedPersons.map(x => x.id).filter((id): id is number => id !== undefined),
      status: status
    }
    this.showLoading = true;

    this.service.bulkChangeStatus(command).subscribe({
      next: (res => {
        this.cdr.markForCheck();
        this.selectedPersons = [];

        this.showLoading = false;
        this.fetchData();
        this.snackBar.openFromComponent(SuccessSnackbar,
          {
            data: "Updated Successfully",
            duration: 4000
          }
        )
      }), error: (err => {
        this.cdr.markForCheck();
        this.selectedPersons = [];
        this.showLoading = false;
      })
    })
  }

  bulkChangePrivate(isPrivate: boolean) {
    let command: BulkChangePrivateCommand = {
      ids: this.selectedPersons.map(x => x.id).filter((id): id is number => id !== undefined),
      isPrivate: isPrivate
    }
    this.showLoading = true;

    this.service.bulkChangePrivate(command).subscribe({
      next: (res => {
        this.selectedPersons = [];
        this.showLoading = false;
        this.cdr.markForCheck();
        this.fetchData();
        this.snackBar.openFromComponent(SuccessSnackbar,
          {
            data: "Updated Successfully",
            duration: 4000
          }

        )
      }), error: (err => {
        this.cdr.markForCheck();
        this.showLoading = false;
      })
    })
  }


  onSelectionChange(selectedRows: Person[]) {
    this.selectedPersons = selectedRows;
    this.cdr.detectChanges();
  }

  openAddDialog(): void {

    const dialogRef = this.dialog.open(AddPerson, {
      width: '600px',
      maxHeight: '90vh',
      disableClose: true,
      autoFocus: false,
      panelClass: 'custom-dialog-container'

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchData();
      }
    });

  }

  exportToPdf(id:number) {
    this.service.exportPersonToPdf({ id: id }).subscribe(res => {
      // Assuming res.data is a base64 string
      const binaryString = atob(res.data);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const blob = new Blob([bytes], {
        type: 'application/pdf'
      });

      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = res.fileName || 'report.pdf';
      link.click();
      URL.revokeObjectURL(link.href);
    });
  }


}
