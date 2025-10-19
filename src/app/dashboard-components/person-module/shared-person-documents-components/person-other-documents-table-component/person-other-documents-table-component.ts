import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
import { DisplayColumn } from '../../../../models/columns/display-column';
import { Observable, Subscription } from 'rxjs';
import { environment } from '../../../../../environment/environment.prod';
import { DynamicList } from '../../../../models/dynamic-list/dynamic-list';
import { DynamicListService } from '../../../../services/dynamic-list-service';
import { LanguageService } from '../../../../services/language-service';
import { PersonOtherDocumentDialogFormComponent } from './person-other-document-dialog-form-component/person-other-document-dialog-form-component';
import { PersonOtherDocumentDTO } from '../../../../models/person-models/person-other-document/person-other-document-dto';
import { base64ToBlob } from '../../../_shared/shared-methods/downloadBlob';
import { DomSanitizer } from '@angular/platform-browser';
import { GetPersonOtherDocument } from '../../../../models/person-models/person-other-document/get-person-other-document';
import { PersonOtherDocumentDialogViewComponent } from './person-other-document-dialog-view-component/person-other-document-dialog-view-component';

@Component({
  selector: 'app-person-other-documents-table-component',
  standalone: false,
  templateUrl: './person-other-documents-table-component.html',
  styleUrls: ['../../../_shared/styles/table-style.scss']
  
})
export class PersonOtherDocumentsTableComponent extends TableFormComponent<PersonOtherDocument> implements OnInit {
  override displayColumns: DisplayColumn[] = [];

  private langSub!: Subscription;

  override params: GetPersonOtherDocument = {
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
    private dlService: DynamicListService,
    override langService: LanguageService,
    private sanitizer: DomSanitizer,

  ) {
    super(service, cdr, fb, router, errorHandler, route , langService);
  }

  override ngOnInit() {
    let personId = this.route.snapshot.queryParamMap.get('id');
    if (personId) {
      this.params.personsIdn = parseInt(personId);
    }
    this.loadDocumentTypesFn = (search: string) => this.dlService.GetAllByParentId(environment.rootDynamicLists.otherDocumentType, search);
    this.formGroup = this.fb.group({
      'documentType': []
    });

    
    this.fetchData();
    this.subscribeLanguage();
  }

  override setDisplayColumns() {
    const getLabel = this.langService.getLabel.bind(this.langService);
    this.displayColumns = [
      {
        key: "documentType",
        label: getLabel('PERSON.DOCUMENT_TYPE') || "Type", // <-- Use label logic
        pipes: ['other-document-type']
      },
      {
        key: "documentDescription",
        label: getLabel('PERSON.DESCRIPTION') || "Description" // <-- Use label logic
      },
      {
        key: "action",
        label: getLabel('COMMON.ACTION') || "Action" // <-- Use label logic
      }
    ];
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


  onAddNew() {
    let element: PersonOtherDocumentDTO = {
      id: 0,
      personsIdn: this.params.personsIdn!,
      documentType: 0,
      documentDescription: "",
      fileName: "",
      file: null
    };
    const dialogRef = this.dialog.open(PersonOtherDocumentDialogFormComponent, {
      disableClose: true,
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchData();
      }
    })
  }

  viewDocument(item: PersonOtherDocument) {
    const dialogRef = this.dialog.open(PersonOtherDocumentDialogViewComponent, {
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
  editDocument(row: any) {
    row.removeFile = false;
    const dialogRef = this.dialog.open(PersonOtherDocumentDialogFormComponent, {
      panelClass: 'dialog-container',
      disableClose: true,
      data: row

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
