import { ChangeDetectorRef, Component } from '@angular/core';
import { TableFormComponent } from '../../../base-components/table-form-component/table-form-component';
import { PersonIdDetailService } from '../../../../services/person-services/person-id-detail-service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { DisplayColumn } from '../../../../models/columns/display-column';
import { Sort } from '@angular/material/sort';
import { BaseParam } from '../../../../models/base/base-param';
import { MatDialog } from '@angular/material/dialog';
import { PersonsIDDetail } from '../../../../models/person-models/person-id-details/person-id-details';
import { GetPersonIdDetailsParams } from '../../../../models/person-models/person-id-details/get-person-id-details-params';
import { Observable } from 'rxjs';
import { DynamicList } from '../../../../models/dynamic-list/dynamic-list';
import { DynamicListService } from '../../../../services/dynamic-list-service';
import { environment } from '../../../../../environment/environment';
import { LanguageService } from '../../../../services/language-service';
import { PersonIdDetailDto } from '../../../../models/person-models/person-id-details/person-id-details-dto';
import { PersonIdDocumentFormDialogComponent } from './person-id-document-form-dialog-component/person-id-document-form-dialog-component';
import { base64ToBlob } from '../../../_shared/shared-methods/downloadBlob';
import { DomSanitizer } from '@angular/platform-browser';
import { PersonIdDocumentViewComponent } from './person-id-document-view-component/person-id-document-view-component';
import { PersonIdDetailViewComponent } from '../../person-id-detail-view/person-id-detail-view-component';

@Component({
  selector: 'app-person-id-documents-table-component',
  standalone: false,
  templateUrl: './person-id-documents-table-component.html',
  styleUrl: './person-id-documents-table-component.scss'
})
export class PersonIdDocumentsTableComponent extends TableFormComponent<PersonsIDDetail> {

  loadDocumentTypesFn!: (search: string) => Observable<DynamicList[]>;
  loadNationalitiesFn!: (search: string) => Observable<DynamicList[]>;


  formGroup!: FormGroup;
  override params: GetPersonIdDetailsParams = {
    type: null,
    nationality: null,
    page: 0,
    pageSize: 10,
    personsIdn: 0
  }

 

  constructor(
    protected override service: PersonIdDetailService,
    protected override cdr: ChangeDetectorRef,
    protected override fb: FormBuilder,
    protected override router: Router,
    protected override errorHandler: ErrorHandlerService,
    protected override route: ActivatedRoute,
    private dialog: MatDialog,
    private dlService: DynamicListService,
    public languageService: LanguageService,
    private sanitizer: DomSanitizer,
    override langService: LanguageService
  ) {
    super(service, cdr, fb, router, errorHandler, route , langService);
  }

  override ngOnInit(): void {
    let personId = this.route.snapshot.queryParamMap.get('id');
    if (personId) {
      this.params.personsIdn = parseInt(personId);
    }

    this.formGroup = this.fb.group({
      documentType: [],
      nationality: [],
    })
    this.loadDocumentTypesFn = (search: string) => this.dlService.GetAllByParentId(environment.rootDynamicLists.originalDocumentTypes, search)
    this.loadNationalitiesFn = (search: string) => this.dlService.GetAllByParentId(environment.rootDynamicLists.country, search)

    
    super.ngOnInit();
  }
  
  override setDisplayColumns(): void {
    const getLabel = this.languageService.getLabel.bind(this.languageService);
    this.displayColumns = [
      {
        key: "type",
        label: getLabel('PERSON.DOCUMENT_TYPE') || "Type",
        keysPipes: [
          { key: "type", pipes: ['original-document-type'] },
          { key: "isPrimary", pipes: ['person-document-primary'] }
        ]
      },
      {
        key: "nationality",
        label: getLabel('COMMON.NATIONALITY') || "Nationality",
        pipes: ['document-nationality']
      },
      {
        key: "placeOfIssue",
        label: getLabel('PERSON.PLACE_OF_ISSUE') || "Place of Issue",
        pipes: ['dl-by-comparekey'],
        compareKey: 'nationality'
      },
      {
        key: "idNumber",
        label: getLabel('PERSON.ID_NUMBER') || "Number",
      },
      {
        key: "idIssueDate",
        label: getLabel('COMPANY.ISSUE_DATE') || "Issue Date",
        pipes: ['date'],
      },
      {
        key: "expiryDate",
        label: getLabel('COMPANY.EXPIRY_DATE') || "Expiry Date",
        pipes: ['date'],
        sort: true
      },
      {
        key: "activeReminder",
        label: getLabel('COMPANY.REMINDER') || "Reminder",
        inputType: 'mat-slide-toggle'
      },
      {
        key: "action",
        label: getLabel('COMMON.ACTION') || "Action",
      }
    ];
  }
  override fetchData() {

    this.showLoading = true;
    this.loadingService.startLoading('Loading data');
    this.service.getPaging(this.params)
      .subscribe({
        next: (res => {
          this.data = res;
          this.showLoading = false;
          this.cdr.markForCheck();
        }),
        error: (err => {
          this.showLoading = false;
          this.errorHandler.handleApiError(err, 'Failed to load data');
          this.cdr.markForCheck();
        })
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

  viewDocument(item: PersonsIDDetail) {
    const dialogRef = this.dialog.open(PersonIdDetailViewComponent, {
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

  editDocument(item: PersonsIDDetail) {
    const dialogRef = this.dialog.open(PersonIdDocumentFormDialogComponent, {
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


  getRemoveCallback(id: number): () => void {
    return () => this.deleteIdDetail(id);
  }

  deleteIdDetail(id: number) {
    this.showLoading = true;
    this.service.delete(id).subscribe({
      next: (res) => {
        this.showLoading = false;

        this.fetchData();

        this.cdr.markForCheck();

        this.errorHandler.showSuccess("Deleted Successfully");

      },
      error: (err) => {
        this.showLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  onDocumentTypeSelect(value: any) {
    this.params.type = value;
    this.search();
  }
  onNationalitySelect(value: any) {
    this.params.nationality = value;
    this.search();
  }

  onRowClick(elementRow: any) {
    if (elementRow.key === "activeReminder") {
      const personIdDetail: PersonsIDDetail = elementRow.element;

      this.showLoading = true;

      this.service.updateByBody(personIdDetail).subscribe({
        next: () => {
          this.errorHandler.showSuccess("Updated Successfully");
          this.cdr.markForCheck();
          this.showLoading = false;
        },
        error: () => {
          this.showLoading = false;
        }
      });
    }
  }


  onAddNew() {
    let element: PersonIdDetailDto = {
      id: 0,
      personsIdn: this.params.personsIdn,
      type: null,
      nationality: null,
      placeOfIssue: null,
      idNumber: "",
      idIssueDate: "",
      expiryDate: "",
      isPrimary: false,
      fileName: "",
      contentType: "",
      removeFile : false,
      activeReminder: false,
      file: null
    };
    const dialogRef = this.dialog.open(PersonIdDocumentFormDialogComponent, {
      disableClose: true,
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchData();
      }
    })
  }

  onEdit(row: any) {
    row.removeFile = false;
    const dialogRef = this.dialog.open(PersonIdDocumentFormDialogComponent, {
      disableClose: true,
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchData();
      }
    })

  }

    onView(row: any) {
      this.dialog.open(PersonIdDocumentViewComponent, {
        width: '900px',
        maxWidth: '98vw',
        data: row
      });
    }
}
