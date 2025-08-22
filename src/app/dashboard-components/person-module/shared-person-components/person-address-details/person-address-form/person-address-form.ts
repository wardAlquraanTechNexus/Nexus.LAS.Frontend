import { ChangeDetectorRef, Component, Inject, Input } from '@angular/core';
import { BaseDialogComponent } from '../../../../base-components/base-dialog-component/base-dialog-component';
import { PersonAddress } from '../../../../../models/person-address/person-address';
import { PersonAddressService } from '../../../../../services/person-services/person-address-service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseFormComponent } from '../../../../base-components/base-form-component/base-form-component';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DynamicListService } from '../../../../../services/dynamic-list-service';
import { Observable } from 'rxjs';
import { DynamicList } from '../../../../../models/dynamic-list/dynamic-list';
import { environment } from '../../../../../../environment/environment';

@Component({
  selector: 'app-person-address-form',
  standalone: false,
  templateUrl: './person-address-form.html',
  styleUrl: './person-address-form.scss'
})
export class PersonAddressForm extends BaseFormComponent {
  @Input() personAddress?: PersonAddress;
  countryId!: number;
  loadNationalitiesFn!: (search: string) => Observable<DynamicList[]>;
  loadCitiesFn!: (search: string) => Observable<DynamicList[]>;


  constructor(
    protected override fb: FormBuilder,
    protected override cdr: ChangeDetectorRef,
    protected override sanitizer: DomSanitizer,
    private dlService: DynamicListService
  ) {
    super(fb, cdr, sanitizer);
  }

  override ngOnInit(): void {
    if (this.personAddress) {
      this.setup(this.personAddress);
    }
    super.ngOnInit();

    this.loadNationalitiesFn = (search: string) =>
      this.dlService.GetAllByParentId(environment.rootDynamicLists.nationality, search);

    this.loadCitiesFn = (search: string) => this.loadCitis(search);
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
