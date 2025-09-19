import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PropertyDTO } from '../../../../models/property-models/property/dtos/propery-dto';
import { PaginateRsult } from '../../../../models/paginate-result';
import { Property } from '../../../../models/property-models/property/property';
import { TableFormComponent } from '../../../base-components/table-form-component/table-form-component';
import { GetPropertyQuery } from '../../../../models/property-models/property/params/get-property-query';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PropertyService } from '../../../../services/property-services/property-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { MenuService } from '../../../../services/menu-service';
import { MatDialog } from '@angular/material/dialog';
import { DynamicListService } from '../../../../services/dynamic-list-service';
import { LanguageService } from '../../../../services/language-service';
import { PropertyDialogFormComponent } from '../../property-dialog-form-component/property-dialog-form-component';
import { environment } from '../../../../../environment/environment.prod';
import { CommonStatus } from '../../../../enums/common-status';

@Component({
  selector: 'app-base-properties-component',
  standalone: false,
  templateUrl: './base-properties-component.html',
  styleUrl: './base-properties-component.scss'
})
export class BasePropertiesComponent extends TableFormComponent<Property> implements OnInit {

  propertyStatuses = [
    {
      value: CommonStatus.New, label: this.label.COMMON.NEW
    },
    {
      value: CommonStatus.Active, label: this.label.COMMON.ACTIVE
    },
    {
      value: CommonStatus.Inactive, label: this.label.COMMON.INACTIVE
    }
  ];


  selectedProperties: PropertyDTO[] = [];
  override data: PaginateRsult<PropertyDTO> = {
    collection: [],
    totalPages: 0,
    totalRecords: 0,
    pageSize: 10,
    page: 0
  };

  override params: GetPropertyQuery = {
    page: 0,
    pageSize: 10,
    orderBy: 'id',
    orderDir: 'desc'
  }


  formGroup!: FormGroup;
  showFilters = false;

  propertyTypeOfTitleId!: number;
  propertyTypeId!: number;
  propertyPurposeId!: number;
  propertyStatusId!: number;
  countryParentId!: number;
  cityParentId!: number;
  areaParentId!: number;


  constructor(
    override service: PropertyService,
    override cdr: ChangeDetectorRef,
    override fb: FormBuilder,
    override router: Router,
    override errorHandler: ErrorHandlerService,
    override route: ActivatedRoute,
    protected menuService: MenuService,
    protected dialog: MatDialog,
    protected dlService: DynamicListService,
    override langService: LanguageService

  ) {
    super(service, cdr, fb, router, errorHandler, route, langService);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.formGroup = this.fb.group(
      {
        typeOfTitle: [null],
        country: [null],
        city: [null],
        zone: [null],
        type: [null],
        legalStatus: [null],

      },
    )

    this.propertyPurposeId = environment.rootDynamicLists.propertyPurpose;
    this.propertyStatusId = environment.rootDynamicLists.propertyStatus;
    this.propertyTypeId = environment.rootDynamicLists.propertyType;
    this.propertyTypeOfTitleId = environment.rootDynamicLists.propertyTypeOfTitle;
    this.countryParentId = environment.rootDynamicLists.country;

    this.propertyStatuses = [
      {
        value: CommonStatus.New, label: this.label.COMMON.NEW
      },
      {
        value: CommonStatus.Active, label: this.label.COMMON.ACTIVE
      },
      {
        value: CommonStatus.Inactive, label: this.label.COMMON.INACTIVE
      }
    ]
  }


  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  onAddNew() {
    const element: PropertyDTO = {
      id: 0,
      code: "",

      typeOfTitle: null,
      grantor: false,
      grantorAddress: null,
      grantorTitleCommencementDate: null,
      grantorTitleExpiryDate: null,
      grantorTitleExpiryActiveReminder: false,
      grantorDescription: null,

      locationCountryId: null,
      locationCityId: null,
      locationAreaId: null,
      locationDetails: null,

      type: null,
      purpose: null,
      legalStatuses: null,
      legalStatusIds: [],

      private: false,

      plot: null,
      plotFArea: null,
      plotMArea: null,
      propertyFArea: null,
      propertyMArea: null,

    };
    const dialogRef = this.dialog.open(PropertyDialogFormComponent, {
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
    const element = { ...row };
    const dialogRef = this.dialog.open(PropertyDialogFormComponent, {
      disableClose: true,
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchData();
      }
    })

  }

  showCity = false;
  onCountryChange(id: number) {
    this.cityParentId = id;
    this.params.locationCountryId = id;
    this.params.locationCityId = null;
    this.params.locationAreaId = null;
    this.formGroup.get('city')?.setValue(null);
    this.formGroup.get('zone')?.setValue(null);
    this.showCity = false;
    this.showArea = false;
    setTimeout(() => {
      this.showCity = true;
      this.cdr.markForCheck();
    }, 100);

    this.search();

  }

  showArea = false;
  onCityChange(id: number) {
    this.params.locationCityId = id;
    this.params.locationAreaId = null;
    this.showArea = false;
    this.areaParentId = id;
    this.formGroup.get('zone')?.setValue(null);
    setTimeout(() => {
      this.showArea = true;
      this.cdr.markForCheck();
    }, 100);
    this.search();
  }

  onAreaChange(id: number) {
    this.params.locationAreaId = id;
    this.search();
  }

  onTypeOfTitleChange(id: number) {
    this.params.typeOfTitle = id;
    this.search();

  }

  onTypeChange(id: number) {
    this.params.type = id;
    this.search();

  }

  onPurposeChange(id: number) {
    this.params.purpose = id;
    this.search();
  }
}