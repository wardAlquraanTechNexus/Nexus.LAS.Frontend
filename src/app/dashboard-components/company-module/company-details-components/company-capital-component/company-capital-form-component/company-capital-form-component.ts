import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { CompanyCapitalDto } from '../../../../../models/company-models/company-capital/dtos/company-capital-dto';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ErrorHandlerService } from '../../../../../services/error-handler.service';
import { BaseFormComponent } from '../../../../base-components/base-form-component/base-form-component';
import { DynamicList } from '../../../../../models/dynamic-list/dynamic-list';
import { Observable } from 'rxjs';
import { DynamicListService } from '../../../../../services/dynamic-list-service';
import { environment } from '../../../../../../environment/environment';

@Component({
  selector: 'app-company-capital-form-component',
  standalone: false,
  templateUrl: './company-capital-form-component.html',
  styleUrl: './company-capital-form-component.scss'
})
export class CompanyCapitalFormComponent  extends BaseFormComponent {
  @Input() element!: CompanyCapitalDto;
  loadCurrenciesTypeFn!: (search: string) => Observable<DynamicList[]>;
  loadClassOfSharesFn!: (search: string) => Observable<DynamicList[]>;

  
  constructor(
    protected override fb: FormBuilder,
    protected override cdr: ChangeDetectorRef,
    protected override sanitizer: DomSanitizer,
    protected override errorHandler: ErrorHandlerService,
    private dlService:DynamicListService
  ) {
    super(fb, cdr, sanitizer, errorHandler);
  }

  override ngOnInit(): void {
    this.setup(this.element);
    super.ngOnInit();
    this.loadCurrenciesTypeFn = (search: string) => this.dlService.GetAllByParentId(environment.rootDynamicLists.currencies, search)


  }



}
