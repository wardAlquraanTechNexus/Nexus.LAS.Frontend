import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { PropertyDTO } from '../../../../models/property-models/property/dtos/propery-dto';
import { TableFormComponent } from '../../../base-components/table-form-component/table-form-component';
import { GetPropertyQuery } from '../../../../models/property-models/property/params/get-property-query';
import { PaginateRsult } from '../../../../models/paginate-result';
import { PropertyService } from '../../../../services/property-services/property-service';
import { FormBuilder } from '@angular/forms';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MenuService } from '../../../../services/menu-service';
import { LanguageService } from '../../../../services/language-service';
import { Property } from '../../../../models/property-models/property/property';
import { PropertyLinkService } from '../../../../services/property-services/property-link-service';
import { PropertyLink } from '../../../../models/property-models/property-link/property-link';
import { GetPropertyLinkQuery } from '../../../../models/property-models/property-link/params/get-property-link-query';
import { PropertyLinkDTO } from '../../../../models/property-models/property-link/dtos/property-link-dto';
import { PropertyLinkDialogFormComponent } from './property-link-dialog-form-component/property-link-dialog-form-component';
import { EntityIDc } from '../../../../enums/entity-idc';

@Component({
  selector: 'app-property-links',
  standalone: false,
  templateUrl: './property-links-component.html',
  styleUrls: ['../../../_shared/styles/table-style.scss']
})
export class PropertyLinksComponent extends TableFormComponent<PropertyLink> {

  @Input() readonly:boolean = false;
  @Input() property!: PropertyDTO;
  override params: GetPropertyLinkQuery = {
    page: 0,
    pageSize: 10,
  };
  override data: PaginateRsult<PropertyLinkDTO> = {
    collection: [],
    totalPages: 0,
    totalRecords: 0,
    pageSize: 10,
    page: 0
  };

  constructor(
    override service: PropertyLinkService,
    override cdr: ChangeDetectorRef,
    override fb: FormBuilder,
    override router: Router,
    override errorHandler: ErrorHandlerService,
    override route: ActivatedRoute,
    private dialog: MatDialog,
    private menuService: MenuService,
    override langService: LanguageService,
  ) {
    super(service, cdr, fb, router, errorHandler, route, langService);
  }

  override ngOnInit(): void {
    this.params.propertyLinksValue = this.property.id;
    super.ngOnInit();



  }

  override setDisplayColumns() {
    this.displayColumns = [
      {
        key: "propertyLinkedCode",
        label: this.label.COMMON.CODE,
      },
      {
        key: "propertyLinksRemarks",
        label: this.label.PROPERTY.LINK_REMARKS,
      },
      {
        key: "locationDetails",
        label: this.label.PROPERTY.LOCATION_DETAILS,
      },
      {
        key: "propertyLinkedStatus",
        label: this.label.COMMON.STATUS,
        pipes: ['common-status']
      }
    ];

    if (!this.readonly) {
      this.displayColumns.push(
        {
          key: "action",
          label: this.label.COMMON.ACTIONS
        }
      );
    }
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
    let element: PropertyLinkDTO = {
      id: 0,
      propertyLinksValue: this.property.id,
      propertyLinksRemarks: '',
      registerIdc: EntityIDc.Properties,
      registerIdn: 0,
      locationDetails: '',
      propertyLinkedStatus: null
    };
    const dialogRef = this.dialog.open(PropertyLinkDialogFormComponent, {
      disableClose: true,
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchData();
      }
    })
  }

  onEdit(element: PropertyLinkDTO) {

    const dialogRef = this.dialog.open(PropertyLinkDialogFormComponent, {
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



}
