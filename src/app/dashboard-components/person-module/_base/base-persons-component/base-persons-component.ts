import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Person } from '../../../../models/person-models/person';
import { TableFormComponent } from '../../../base-components/table-form-component/table-form-component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../../../../services/person-services/person-service';
import { environment } from '../../../../../environment/environment';
import { BulkChangePrivateCommand } from '../../../../models/person-models/bulk-change-private-command';
import { BulkChangeStatusCommand } from '../../../../models/person-models/bulk-change-status-command';
import { GetPersonsQuery } from '../../../../models/person-models/get-persons/get-persons-query';
import { GetPersonsDTO } from '../../../../models/person-models/get-persons/get-person-dto';
import { Sort } from '@angular/material/sort';
import { BaseParam } from '../../../../models/base/base-param';
import { MatDialog } from '@angular/material/dialog';
import { MenuService } from '../../../../services/menu-service';
import { MenuTree } from '../../../../models/menus/menu-tree';
import { DynamicList } from '../../../../models/dynamic-list/dynamic-list';
import { Observable } from 'rxjs';
import { DynamicListService } from '../../../../services/dynamic-list-service';
import { LanguageService } from '../../../../services/language-service';
import { ConfirmDeleteComponent } from '../../../../components/confirm-delete-component/confirm-delete-component';
import { UpdatePersonCommand } from '../../../../models/person-models/update-person';
import { downloadBlobFile } from '../../../_shared/shared-methods/downloadBlob';
import { PersonDialogFormComponent } from '../../person-dialog-form-component/person-dialog-form-component';
import { PersonDto } from '../../../../models/person-models/person-dto';
import { navigate } from '../../../_shared/shared-methods/navigate';
import { CommonStatus } from '../../../../enums/common-status';

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
    pageSize: 10,
    orderBy: 'id',
    orderDir: 'asc'
  }

  activeStatus = CommonStatus.Active;
  inactiveStatus = CommonStatus.Inactive;
  selectedPersons: Person[] = [];



  currentMenu: MenuTree | null = null;
  formGroup!: FormGroup;
  loadNationalitiesFn!: (search: string) => Observable<DynamicList[]>;
  constructor(
    override service: PersonService,
    override cdr: ChangeDetectorRef,
    override fb: FormBuilder,
    override router: Router,
    override errorHandler: ErrorHandlerService,
    override route: ActivatedRoute,
    protected menuService: MenuService,
    protected dialog: MatDialog,
    protected dlService: DynamicListService,
    override langService: LanguageService,


  ) {
    super(service, cdr, fb, router, errorHandler, route, langService);
  }

  override ngOnInit(): void {
    let routerSplitted = this.router.url.split('/');
    let roterLen = routerSplitted.length;

    this.currentMenu = this.menuService.getMenuByPath(routerSplitted[roterLen - 1]);
    this.fetchData();
    this.formGroup = this.fb.group(
      {
        nationality: [''],
      },
    )
    this.loadNationalitiesFn = (search: string) => this.dlService.GetAllByParentId(environment.rootDynamicLists.country, search)

    this.subscribeLanguage();
  }
  override search() {
    this.fetchData();
  }

  override fetchData() {
    this.showLoading = true;
    this.service.getPersons(this.params).subscribe({
      next: (res => {
        this.data = res;
        this.showLoading = false;
        this.cdr.markForCheck();
      }),
      error: (err => {
        this.showLoading = false;
        this.cdr.markForCheck();

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
    if (
      elementRow.key === "personArabicName" ||
      elementRow.key === "personEnglishName" ||
      elementRow.key === "personCode"
    ) {

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { id: elementRow.element.id },
      });
    }
  }

  exportToExcel() {
    this.service.exportToExcel(this.params).subscribe(res => {
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
    command.personStatus = CommonStatus.Active;
    this.updatePerson(command);
  }
  deactivate(person: GetPersonsDTO) {
    const command = this.initUpdatePerson(person);
    command.personStatus = CommonStatus.Inactive;
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
      personStatus: person.personStatus ?? CommonStatus.New,
      private: person.private ?? true,
      id: person.id ?? 0
    }
  }

  deletePerson(person: GetPersonsDTO) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '400px',
      data: person
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.showLoading = true;
        this.service.delete(person.id!).subscribe({
          next: (res) => {
            // Refresh data from server after successful deletion
            this.search();

            this.errorHandler.showSuccess("Deleted Successfully");
          },
          error: (err => {
            this.showLoading = false;
            this.cdr.detectChanges();
          })
        })
      }
    });
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
        this.errorHandler.showSuccess("Updated Successfully");
      }), error: (err => {
        this.cdr.markForCheck();
        this.showLoading = false;
      })
    })
  }

  bulkChangeStatus(status: CommonStatus) {
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
        this.errorHandler.showSuccess("Updated Successfully");
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
        this.errorHandler.showSuccess("Updated Successfully");
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

    let person: PersonDto = {
      id: 0,
      personIdc: "",
      personCode: "",
      personEnglishName: "",
      personArabicName: "",
      personShortName: "",
      personStatus: 0,
      fpcCode: "",
      private: true,
      fileName: "",
      nationality: null,
      dateOfBirth: null,
      nationalityIds: [],
    };
    const dialogRef = this.dialog.open(PersonDialogFormComponent, {
      width: '600px',
      maxHeight: '90vh',
      disableClose: true,
      autoFocus: false,
      panelClass: 'custom-dialog-container',
      data: person

    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate([], { queryParams: { id: result.id }, relativeTo: this.route });
        this.cdr.markForCheck();
      }
    })

  }

  exportToPdf(id: number) {
    this.service.exportToPdf({ id: id }).subscribe(res => {
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

      downloadBlobFile(blob, res.fileName || 'report.pdf');
    });
  }

  onSelectNationality(event: any) {
    debugger;
    this.params.nationality = event;
    this.fetchData();
  }

  showFilters = false;

  toggleFilters() {
    this.showFilters = !this.showFilters;
  }





}
