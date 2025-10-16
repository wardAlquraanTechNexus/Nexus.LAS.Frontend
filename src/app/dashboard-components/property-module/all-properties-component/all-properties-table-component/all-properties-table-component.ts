import { ChangeDetectorRef, Component } from '@angular/core';
import { BasePropertiesComponent } from '../../_base/base-properties-component/base-properties-component';
import { PropertyService } from '../../../../services/property-services/property-service';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicListService } from '../../../../services/dynamic-list-service';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { LanguageService } from '../../../../services/language-service';
import { MenuService } from '../../../../services/menu-service';
import { CommonStatus } from '../../../../enums/common-status';

@Component({
  selector: 'app-all-properties-table-component',
  standalone: false,
  templateUrl: './all-properties-table-component.html',
  styleUrl: './all-properties-table-component.scss'
})
export class AllPropertiesTableComponent extends BasePropertiesComponent
{
  
  constructor(
    override service: PropertyService,
    override cdr: ChangeDetectorRef,
    override fb: FormBuilder,
    override router: Router,
    override errorHandler: ErrorHandlerService,
    override route: ActivatedRoute,
    override menuService: MenuService,
    override dialog: MatDialog,
    override dlService: DynamicListService,
    override langService: LanguageService
  ) {
    super(service, cdr, fb, router, errorHandler, route, menuService, dialog, dlService, langService);
  }

  override ngOnInit(): void {
    super.ngOnInit();
  }

  override setDisplayColumns() {
    this.displayColumns = [
      { key: "select", label: this.label.COMMON.SELECT },
      { key: "code", label: this.label.COMMON.CODE, pipes: ["link"], sort: true },
      { 
        key: "locationCountryId", 
        label: this.label.COMMON.COUNTRY,
        pipes: ['country'], 
        sort: true ,
      },
      { 
        key: "locationCityId", 
        label: this.label.COMMON.CITY, 
        sort: true ,
        pipes: ['dl-by-comparekey'],
        compareKey: 'locationCountryId',
      },
      { 
        key: "locationAreaId", 
        label: this.label.COMMON.ZONE, 
        sort: true ,
        pipes: ['dl-by-comparekey'],
        compareKey: 'locationCityId',
      },
      { key: "plot", label: this.label.PROPERTY.PLOT, sort: true },
      { key: "locationDetails", label: this.label.PROPERTY.LOCATION_DETAILS, sort: true },
      { 
        key: "type", 
        label: this.label.PROPERTY.PROPERTY_TYPE, 
        sort: true,
        pipes: ['property-type']
       },
      { 
        key: "status", 
        label: this.label.COMMON.STATUS, 
        sort: true ,
        pipes: ['common-status'],
        hasIcon: true
      },
      { 
        key: "private", 
        label: this.label.COMMON.PRIVATE, 
        sort: true ,
        pipes: ['private'],
        hasIcon: true
      },
      
      { key: "action", label: this.label.COMMON.ACTIONS }
    ];

   
  }

}
