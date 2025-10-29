import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { Property } from '../../../models/property-models/property/property';
import { TableFormComponent } from '../../base-components/table-form-component/table-form-component';
import { SharedPropertyDTO } from '../../../models/property-models/property/dtos/shared-property-dto';
import { PaginateRsult } from '../../../models/paginate-result';
import { DisplayColumn } from '../../../models/columns/display-column';
import { GetSharedPropertyParams } from '../../../models/property-models/property/params/get-shared-property';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { LanguageService } from '../../../services/language-service';
import { PropertyService } from '../../../services/property-services/property-service';
import { EntityIDc } from '../../../enums/entity-idc';

@Component({
  selector: 'app-shared-property-component',
  standalone: false,
  templateUrl: './shared-property-component.html',
  styleUrl: './shared-property-component.scss'
})
export class SharedPropertyComponent extends TableFormComponent<Property> {

  @Input() registersIdc!: EntityIDc;
  @Input() registersIdn!: number

  override data: PaginateRsult<SharedPropertyDTO> = {
    collection: [],
    page: 0,
    pageSize: 10,
    totalPages: 0,
    totalRecords: 0
  };

  override displayColumns: DisplayColumn[] = [];

  override params: GetSharedPropertyParams = {
    page: 0,
    pageSize: 10
  };

  constructor(
    override service: PropertyService,
    override cdr: ChangeDetectorRef,
    override fb: FormBuilder,
    override router: Router,
    override errorHandler: ErrorHandlerService,
    override route: ActivatedRoute,
    override langService: LanguageService,
  ) {
    super(service, cdr, fb, router, errorHandler, route, langService)
  }

  override ngOnInit(): void {


    this.params.idc = this.registersIdc;
    this.params.idn = this.registersIdn;
    super.ngOnInit();
  }

  override setDisplayColumns(): void {
    this.displayColumns = [
      {
        key: "code",
        label: this.label.COMMON.CODE,
      },
      {
        key: "locationCountryId",
        label: this.label.COMMON.COUNTRY,
        pipes: ['country']
      },
      {
        key: "locationCityId",
        label: this.label.COMMON.CITY,
        pipes: ['dl-by-comparekey'],
        compareKey: 'locationCountryId',
      },
      {
        key: "locationAreaId",
        label: this.label.COMMON.ZONE,
        pipes: ['dl-by-comparekey'],
        compareKey: 'locationCityId',
      },
      {
        key: "relation",
        label: this.label.PROPERTY.RELATION,
        pipes: ['property-owner-relation']
      },
      {
        key: "typeOfTitle",
        label: this.label.PROPERTY.TYPE_OF_TITLE,
        pipes: ['property-type-of-title']
      },
      {
        key: "type",
        label: this.label.PROPERTY.PROPERTY_TYPE,
        pipes: ['property-type']
      },
      {
        key: "ownStartDate",
        label: this.label.COMMON.START_DATE,
        pipes: ['date']
      },
      {
        key: "ownActive",
        label: this.label.COMMON.STATUS || "Status",
        pipes: ['active']
      }
    ];
  }
  override fetchData(): void {
    this.showLoading = true;
    this.service.getShared(this.params)
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

  showTable = true;
  toggleTable() {
    this.showTable = !this.showTable;
  }

}