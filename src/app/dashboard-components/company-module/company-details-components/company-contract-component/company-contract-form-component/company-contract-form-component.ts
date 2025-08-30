import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { BaseFormComponent } from '../../../../base-components/base-form-component/base-form-component';
import { CompanyContractDto } from '../../../../../models/company-models/company-contract/dtos/company-contract-dto';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ErrorHandlerService } from '../../../../../services/error-handler.service';
import { DynamicList } from '../../../../../models/dynamic-list/dynamic-list';
import { Observable } from 'rxjs';
import { DynamicListService } from '../../../../../services/dynamic-list-service';
import { environment } from '../../../../../../environment/environment';
import { CompanyContractStatus } from '../../../../../enums/company-contract-status';

@Component({
  selector: 'app-company-contract-form-component',
  standalone: false,
  templateUrl: './company-contract-form-component.html',
  styleUrl: './company-contract-form-component.scss'
})
export class CompanyContractFormComponent extends BaseFormComponent {

  showLoading = false;
  @Input() element!: CompanyContractDto;
  loadCompanyContractTypesFn!: (search: string) => Observable<DynamicList[]>;
  isDragging = false;
  statusOptions = [
    { label: 'Expired', value: CompanyContractStatus.Expired },
    { label: 'Active', value: CompanyContractStatus.Active }
  ]
  constructor(
    protected override fb: FormBuilder,
    protected override cdr: ChangeDetectorRef,
    protected override sanitizer: DomSanitizer,
    protected override errorHandler: ErrorHandlerService,
    private dlService: DynamicListService
  ) {
    super(fb, cdr, sanitizer, errorHandler);
  }

  override ngOnInit(): void {
    this.setup(this.element);
    super.ngOnInit();
    if(!this.element.id){
      this.formGroup.get("file")?.addValidators(Validators.required);
    }
    this.loadCompanyContractTypesFn = (search: string) => this.dlService.GetAllByParentId(environment.rootDynamicLists.companyContractType, search);



  }



  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
  }

  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging = false;
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      if (this.validateFile(file)) {
        this.uploadedFile = file;
        this.formGroup.get('file')?.setValue(file);
      }
    }
  }



  validateFile(file: File): boolean {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/svg+xml', 'application/pdf'];
    const maxSize = 3 * 1024 * 1024; // 3MB
    return allowedTypes.includes(file.type) && file.size <= maxSize;
  }

}
