import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { BaseDialogComponent } from '../../base-components/base-dialog-component/base-dialog-component';
import { BaseDialogFormComponent } from '../../base-components/base-dialog-form-component/base-dialog-form-component';
import { Property } from '../../../models/property-models/property/property';
import { PropertyService } from '../../../services/property-services/property-service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LanguageService } from '../../../services/language-service';
import { PropertyDTO } from '../../../models/property-models/property/dtos/propery-dto';

@Component({
  selector: 'app-property-dialog-form-component',
  standalone: false,
  templateUrl: './property-dialog-form-component.html',
  styleUrls: ['../../_shared/styles/common-dialog-form-style.scss']

})
export class PropertyDialogFormComponent extends BaseDialogFormComponent<Property> {

  constructor(
    protected override dialogRef: MatDialogRef<PropertyDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public override data: PropertyDTO,
    override service: PropertyService,
    protected override cdr: ChangeDetectorRef,
    protected override langService: LanguageService
  ) {
    super(dialogRef, data, service, cdr, langService)
  }



}
