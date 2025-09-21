import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { PropertyDocument } from '../../../../models/property-models/property-document/property-document';
import { TableFormComponent } from '../../../base-components/table-form-component/table-form-component';
import { PropertyDTO } from '../../../../models/property-models/property/dtos/propery-dto';
import { GetPropertyDocumentQuery } from '../../../../models/property-models/property-document/params/get-property-document-query';
import { PropertyDocumentDTO } from '../../../../models/property-models/property-document/dtos/property-document-dto';
import { PaginateRsult } from '../../../../models/paginate-result';
import { PropertyDocumentService } from '../../../../services/property-services/property-document-service';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyOwnerDTO } from '../../../../models/property-models/property-owner/dtos/property-owner-dto';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { LanguageService } from '../../../../services/language-service';
import { PropertyOwnerDialogFormComponent } from '../property-owners-component/property-owner-dialog-form-component/property-owner-dialog-form-component';
import { base64ToBlob } from '../../../_shared/shared-methods/downloadBlob';
import { DomSanitizer } from '@angular/platform-browser';
import { PropertyDocumentDialogFormComponent } from './property-document-dialog-form-component/property-document-dialog-form-component';
import { PropertyDocumentDialogViewComponent } from './property-document-dialog-view-component/property-document-dialog-view-component';

@Component({
  selector: 'app-property-documents',
  standalone: false,
  templateUrl: './property-documents-component.html',
  styleUrls: ['../../../_shared/styles/table-style.scss']
})
export class PropertyDocumentsComponent extends TableFormComponent<PropertyDocument> {

  @Input() property!: PropertyDTO;
  override params: GetPropertyDocumentQuery = {
    page: 0,
    pageSize: 10,
    propertyId: 0
  };
  override data: PaginateRsult<PropertyDocumentDTO> = {
    collection: [],
    totalPages: 0,
    totalRecords: 0,
    pageSize: 10,
    page: 0
  };

  constructor(
    override service: PropertyDocumentService,
    override cdr: ChangeDetectorRef,
    override fb: FormBuilder,
    override router: Router,
    override errorHandler: ErrorHandlerService,
    override route: ActivatedRoute,
    private dialog: MatDialog,
    override langService: LanguageService,
    private sanitizer: DomSanitizer,

  ) {
    super(service, cdr, fb, router, errorHandler, route, langService);
  }

  override ngOnInit(): void {
    this.params.propertyId = this.property.id;
    super.ngOnInit();



  }

  override setDisplayColumns() {
    this.displayColumns = [
      {
        key: "type",
        label: this.label.PROPERTY.DOCUMENT_TYPE,
        pipes: ['property-document-type']
      },
      {
        key: "placeOfIssue",
        label: this.label.PERSON.PLACE_OF_ISSUE,
      },
      {
        key: "issueDate",
        label: this.label.COMMON.ISSUE_DATE,
        pipes: ['date']
      },
      {
        key: "documentExpiryDate",
        label: this.label.COMMON.EXPIRY_DATE,
        pipes: ['date']
      },
      {
        key: "description",
        label: this.label.COMMON.DESCRIPTION,
        pipes: ['active']
      },
      {
        key: "activeReminder",
        label: this.label.COMMON.REMINDER,
        inputType: "mat-slide-toggle"
      },
      {
        key: "action",
        label: this.label.COMMON.ACTIONS
      }
    ];
  }
  override fetchData() {
    this.showLoading = true;
    this.service.getPaging(this.params)
      .subscribe({
        next: (res => {
          this.data = res;
          this.showLoading = false;
          this.cdr.markForCheck();
        }),
        error: (err => {
          this.showLoading = false;
          this.loadingService.stopLoading('Loading data');
          this.errorHandler.handleApiError(err, 'Failed to load data');
          this.cdr.markForCheck();
        })
      })
  }

  showTable = true;
  toggleTable() {
    this.showTable = !this.showTable;
  }


  onAddNew() {
    let element: PropertyDocumentDTO = {
      id: 0,
      propertyId: this.property.id,
      type: null,
      placeOfIssue: null,
      issueDate: null,
      documentExpiryDate: null,
      activeReminder: false,
      description: null,
      fileName: null,
      contentType: null,
      dataFile: null,
      removeFile: false,
      file: null,
      imageUrl: null
    };
    const dialogRef = this.dialog.open(PropertyDocumentDialogFormComponent, {
      disableClose: true,
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchData();
      }
    })
  }

  onEdit(element: PropertyDocumentDTO) {

    if (element.dataFile && element.contentType) {
      const base64Data = element.dataFile;
      const blob = base64ToBlob(base64Data, element.contentType);
      const url = URL.createObjectURL(blob);
      element.imageUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      this.cdr.markForCheck();
    }
    const dialogRef = this.dialog.open(PropertyDocumentDialogFormComponent, {
      disableClose: true,
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchData();
      }
    })
  }

  deleteFn(id: number) {
    return () => this.delete(id);
  }

  delete(id: number) {
    this.showLoading = true;
    this.service.delete(id).subscribe({
      next: (res => {
        this.errorHandler.showSuccess("Deleted Successfully");
        this.showLoading = false;
        this.fetchData();
      }), error: (err => {
        this.showLoading = false;
      })
    })
  }

  onRowClick(elementRow: any) {
      if (elementRow.key === "activeReminder") {
        const personIdDetail: PropertyDocumentDTO = elementRow.element;
  
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

     onView(row: any) {
          this.dialog.open(PropertyDocumentDialogViewComponent, {
            width: '900px',
            maxWidth: '98vw',
            data: row
          });
        }



}