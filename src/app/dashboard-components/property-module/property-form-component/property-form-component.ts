import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { BaseFormComponent } from '../../base-components/base-form-component/base-form-component';
import { PropertyDTO } from '../../../models/property-models/property/dtos/propery-dto';
import { DynamicListService } from '../../../services/dynamic-list-service';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../../../environment/environment';
import { ErrorHandlerService } from '../../../services/error-handler.service';
import { LanguageService } from '../../../services/language-service';
import { DynamicList } from '../../../models/dynamic-list/dynamic-list';

@Component({
  selector: 'app-property-form',
  standalone: false,
  templateUrl: './property-form-component.html',
  styleUrls: ['../../_shared/styles/common-form-style.scss']
})
export class PropertyFormComponent extends BaseFormComponent {


  propertyTypeOfTitleId!: number;
  propertyTypeId!: number;
  propertyPurposeId!: number;
  propertyStatusId!: number;
  countryParentId!: number;
  cityParentId!: number;
  areaParentId!: number;
  statuses: number[] = [];
  showCity = false;
  showZone = false;

  
  propertyStatuses!: Observable<DynamicList[]>;

  @Input() element!: PropertyDTO;

  constructor(
    protected override fb: FormBuilder,
    protected override cdr: ChangeDetectorRef,
    protected override sanitizer: DomSanitizer,
    protected override errorHandler: ErrorHandlerService,
    override langService: LanguageService,
    private dlService: DynamicListService,

  ) {
    super(fb, cdr, sanitizer, errorHandler, langService);
  }

  override ngOnInit(): void {
    this.setup(this.element);
    super.ngOnInit();
    this.propertyPurposeId = environment.rootDynamicLists.propertyPurpose;
    this.propertyStatusId = environment.rootDynamicLists.propertyStatus;
    this.propertyTypeId = environment.rootDynamicLists.propertyType;
    this.propertyTypeOfTitleId = environment.rootDynamicLists.propertyTypeOfTitle;
    this.countryParentId = environment.rootDynamicLists.country;
    if(this.element?.locationCountryId){
      this.cityParentId = this.element.locationCountryId;
    }
    if(this.element?.locationCityId){
      this.areaParentId = this.element.locationCityId;
    }

    this.propertyStatuses = this.propertyStatuses = this.dlService.GetAllByParentId(this.propertyStatusId)

  }


  onCountryChange(id: number) {
    this.showCity = false;
    this.showZone = false;
    this.cityParentId = id;
    this.formGroup.get('locationCityId')?.setValue(null);
    this.formGroup.get('locationAreaId')?.setValue(null);
   setTimeout(() => {
      this.showCity = true;
      this.cdr.markForCheck();
    }, 100);
  }

  onCityChange(id: number) {
    this.showZone = false;
    this.areaParentId = id;
    this.formGroup.get('locationAreaId')?.setValue(null);
       setTimeout(() => {
      this.showZone = true;
      this.cdr.markForCheck();
    }, 100);

  }

 changeStatus(selectedValues: number[]) {
  this.formGroup.get('legalStatuses')?.setValue(selectedValues.join(','));
}



}
