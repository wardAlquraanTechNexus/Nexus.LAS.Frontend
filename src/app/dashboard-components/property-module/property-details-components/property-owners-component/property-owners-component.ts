import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { TableFormComponent } from '../../../base-components/table-form-component/table-form-component';
import { PropertyOwner } from '../../../../models/property-models/property-owner/property-owner';
import { PropertyDTO } from '../../../../models/property-models/property/dtos/propery-dto';
import { GetPropertyOwnerQuery } from '../../../../models/property-models/property-owner/params/get-property-owner-query';
import { PropertyOwnerDTO } from '../../../../models/property-models/property-owner/dtos/property-owner-dto';
import { PaginateRsult } from '../../../../models/paginate-result';
import { PropertyOwnerService } from '../../../../services/property-services/property-owner-service';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { EntityIDc } from '../../../../enums/entity-idc';
import { PropertyLinkDTO } from '../../../../models/property-models/property-link/dtos/property-link-dto';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { LanguageService } from '../../../../services/language-service';
import { MenuService } from '../../../../services/menu-service';
import { PropertyLinkDialogFormComponent } from '../property-links-component/property-link-dialog-form-component/property-link-dialog-form-component';
import { PropertyOwnerDialogFormComponent } from './property-owner-dialog-form-component/property-owner-dialog-form-component';

@Component({
  selector: 'app-property-owners',
  standalone: false,
  templateUrl: './property-owners-component.html',
  styleUrls: ['../../../_shared/styles/table-style.scss']
})
export class PropertyOwnersComponent extends TableFormComponent<PropertyOwner> {

  @Input() property!: PropertyDTO;
  override params: GetPropertyOwnerQuery = {
    page: 0,
    pageSize: 10,
    propertyId: 0
  };
  override data: PaginateRsult<PropertyOwnerDTO> = {
    collection: [],
    totalPages: 0,
    totalRecords: 0,
    pageSize: 10,
    page: 0
  };

  constructor(
    override service: PropertyOwnerService,
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
    this.params.propertyId = this.property.id;
    super.ngOnInit();



  }

  override setDisplayColumns() {
    this.displayColumns = [
      {
        key: "registerIdn",
        label: this.label.PROPERTY.OWNER,
        pipes: ["person-or-company"],
        compareKey: "registerIdc"
      },
      {
        key: "relation",
        label: this.label.PROPERTY.RELATION,
        pipes: ['property-owner-relation']
      },
      {
        key: "ownStartDate",
        label: this.label.COMMON.START_DATE,
        pipes: ['date']
      },
      {
        key: "ownFinishDate",
        label: this.label.COMMON.END_DATE,
        pipes: ['date']
      },
      {
        key: "ownActive",
        label: this.label.COMMON.ACTIVE,
        pipes: ['active']
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
    let element: PropertyOwnerDTO = {
      id: 0,
      registerIdc: null,
      registerIdn: null,
      propertyId: this.property.id,
      ownActive: false,
      ownStartDate: null,
      ownFinishDate: null,
      relation: null,
      remarks: null
    };
    const dialogRef = this.dialog.open(PropertyOwnerDialogFormComponent, {
      disableClose: true,
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchData();
      }
    })
  }

  onEdit(element: PropertyOwnerDTO) {

    const dialogRef = this.dialog.open(PropertyOwnerDialogFormComponent, {
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
