import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { PropertyOwner } from '../../../../../models/property-models/property-owner/property-owner';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PropertyOwnerDTO } from '../../../../../models/property-models/property-owner/dtos/property-owner-dto';
import { LanguageService } from '../../../../../services/language-service';
import { BaseDialogFormComponent } from '../../../../base-components/base-dialog-form-component/base-dialog-form-component';
import { PropertyOwnerService } from '../../../../../services/property-services/property-owner-service';

@Component({
  selector: 'app-property-owner-dialog-form-component',
  standalone: false,
  templateUrl: './property-owner-dialog-form-component.html',
  styleUrl: './property-owner-dialog-form-component.scss'
})
export class PropertyOwnerDialogFormComponent  extends BaseDialogFormComponent<PropertyOwner> {

  constructor(
    protected override dialogRef: MatDialogRef<PropertyOwnerDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public override data: PropertyOwnerDTO,
    override service: PropertyOwnerService,
    protected override cdr: ChangeDetectorRef,
    protected override langService: LanguageService
  ) {
    super(dialogRef, data, service, cdr, langService)
  }

  
 
}