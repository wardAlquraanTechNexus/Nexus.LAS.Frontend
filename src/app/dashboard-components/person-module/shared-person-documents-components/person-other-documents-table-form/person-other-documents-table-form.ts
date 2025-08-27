import { ChangeDetectorRef, Component } from '@angular/core';
import { TableFormComponent } from '../../../base-components/table-form-component/table-form-component';
import { PersonOtherDocumentService } from '../../../../services/person-services/person-other-document-service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { BaseParam } from '../../../../models/base/base-param';
import { Sort } from '@angular/material/sort';
import { PersonOtherDocumentView } from '../../person-other-document-view/person-other-document-view';
import { MatDialog } from '@angular/material/dialog';
import { EditPersonOtherDocumentView } from '../../person-other-document-view/edit-person-other-document-view/edit-person-other-document-view';
import { PersonOtherDocument } from '../../../../models/person-models/person-other-document/person-other-document';
import { GetPerdonOtherDocument } from '../../../../models/person-models/person-other-document/get-person-other-document';
import { DisplayColumn } from '../../../../models/columns/display-column';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environment/environment.prod';
import { DynamicList } from '../../../../models/dynamic-list/dynamic-list';
import { DynamicListService } from '../../../../services/dynamic-list-service';

@Component({
  selector: 'app-person-other-documents-table-form',
  standalone: false,
  templateUrl: './person-other-documents-table-form.html',
  styleUrl: './person-other-documents-table-form.scss'
})
export class PersonOtherDocumentsTableForm extends TableFormComponent<PersonOtherDocument> {
  override displayColumns: DisplayColumn[] = [
    {
      key: "documentType",
      label: "Type",
      pipes: ['other-document-type']
    },
    {
      key: "documentDescription",
      label: "Description"
    },
    {
      key: "action",
      label: "Action"
    }
  ];

  override params: GetPerdonOtherDocument = {
    personsIdn: null,
    documentType: null,
    page: 0,
    pageSize: 10
  };

  formGroup!: FormGroup;
  loadDocumentTypesFn!: (search: string) => Observable<DynamicList[]>;

  constructor(
    protected override service: PersonOtherDocumentService,
    protected override cdr: ChangeDetectorRef,
    protected override fb: FormBuilder,
    protected override router: Router,
    protected override errorHandler: ErrorHandlerService,
    protected override route: ActivatedRoute,
    private dialog: MatDialog,
    private dlService:DynamicListService

  ) {
    super(service, cdr, fb, router, errorHandler, route);
  }

  override ngOnInit() {
    let personId = this.route.snapshot.queryParamMap.get('id');
    if (personId) {
      this.params.personsIdn = parseInt(personId);
    }
    this.loadDocumentTypesFn = (search: string) => this.dlService.GetAllByParentId(environment.rootDynamicLists.otherDocumentType, search)
    this.fetchData();
    this.formGroup = this.fb.group({
      'documentType': []
    })
  }

  override search() {
    this.fetchData();
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

  addToCollection(element: PersonOtherDocument) {
    this.fetchData();
  }

  viewDocument(item: PersonOtherDocument) {
    const dialogRef = this.dialog.open(PersonOtherDocumentView, {
      panelClass: 'dialog-container',
      disableClose: true,
      data: item

    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchData();
        this.cdr.detectChanges();
      }
    });
  }
  editDocument(item: PersonOtherDocument) {
    const dialogRef = this.dialog.open(EditPersonOtherDocumentView, {
      panelClass: 'dialog-container',
      disableClose: true,
      data: item

    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchData();
        this.cdr.detectChanges();
      }
    });
  }

  getRemoveCallback(id: number) {
    return () => this.deleteOtherDocument(id);
  }




  deleteOtherDocument(id: number) {

    this.service.delete(id).subscribe({
      next: (res => {
        this.showLoading = false;

        this.errorHandler.showSuccess("Deleted Successfully");
        this.cdr.detectChanges();
        this.fetchData();
      }), error: (err => {
        this.cdr.detectChanges();
      })
    })
  }

  onDocumentTypeSelect(value: any) {
    this.params.documentType = value;
    this.search();
  }
}
