import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { BaseFormComponent } from '../../../../base-components/base-form-component/base-form-component';
import { CompanyAddressDto } from '../../../../../models/company-models/company-address/dtos/company-address-dto';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ErrorHandlerService } from '../../../../../services/error-handler.service';
import { Observable } from 'rxjs';
import { DynamicList } from '../../../../../models/dynamic-list/dynamic-list';
import { DynamicListService } from '../../../../../services/dynamic-list-service';
import { environment } from '../../../../../../environment/environment';
import { LanguageService } from '../../../../../services/language-service';

@Component({
  selector: 'app-company-address-form-component',
  standalone: false,

  templateUrl: './company-address-form-component.html',
  styleUrl: './company-address-form-component.scss'
})
export class CompanyAddressFormComponent extends BaseFormComponent {
  @Input() element!: CompanyAddressDto;


  countryId!:number;
  loadNationalitiesFn!: (search: string) => Observable<DynamicList[]>;
  loadCitiesFn!: (search: string) => Observable<DynamicList[]>;
  constructor(
    protected override fb: FormBuilder,
    protected override cdr: ChangeDetectorRef,
    protected override sanitizer: DomSanitizer,
    protected override errorHandler: ErrorHandlerService,
    private dlService: DynamicListService,
    override langService: LanguageService,
  ) {
    super(fb, cdr, sanitizer, errorHandler, langService);
  }

  override ngOnInit(): void {
    this.setup(this.element);
    super.ngOnInit();
    this.loadNationalitiesFn = (search: string) =>
      this.dlService.GetAllByParentId(environment.rootDynamicLists.country, search);

    if(this.element.poBoxCountry){
      this.countryId = this.element.poBoxCountry;
      this.loadCitiesFn = (search: string) => this.loadCitis(search);
    }

  }


  onSelectCountry(event: number) {
    this.countryId = event;
    this.formGroup.get('poBoxCity')?.reset();

    this.loadCitiesFn = (search: string) => this.dlService.GetAllByParentId(this.countryId, search);
    this.cdr.markForCheck();
  }
  
  loadCitis(search: string = "") {
    return this.dlService.GetAllByParentId(this.countryId, search);
  }



}
