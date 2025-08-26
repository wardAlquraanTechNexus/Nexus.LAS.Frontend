import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { BaseFormComponent } from '../../../../base-components/base-form-component/base-form-component';
import { CompanyActivityDto } from '../../../../../models/company-models/company-activity/dtos/company-activity-dto';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ErrorHandlerService } from '../../../../../services/error-handler.service';
import { DynamicListService } from '../../../../../services/dynamic-list-service';
import { Observable } from 'rxjs';
import { DynamicList } from '../../../../../models/dynamic-list/dynamic-list';
import { environment } from '../../../../../../environment/environment.prod';

@Component({
  selector: 'app-company-activity-form-component',
  standalone: false,
  templateUrl: './company-activity-form-component.html',
  styleUrl: './company-activity-form-component.scss'
})
export class CompanyActivityFormComponent extends BaseFormComponent {
  @Input() element!: CompanyActivityDto;
  loadCompanyActivitiesTypeFn!: (search: string) => Observable<DynamicList[]>;

  
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
    this.loadCompanyActivitiesTypeFn = (search: string) => this.dlService.GetAllByParentId(environment.rootDynamicLists.companyActivity, search)


  }



}
