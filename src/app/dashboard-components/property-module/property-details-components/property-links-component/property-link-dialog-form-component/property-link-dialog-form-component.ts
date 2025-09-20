import { ChangeDetectorRef, Component, Inject, Input } from '@angular/core';
import { BaseFormComponent } from '../../../../base-components/base-form-component/base-form-component';
import { PropertyLinkDTO } from '../../../../../models/property-models/property-link/dtos/property-link-dto';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DynamicListService } from '../../../../../services/dynamic-list-service';
import { ErrorHandlerService } from '../../../../../services/error-handler.service';
import { LanguageService } from '../../../../../services/language-service';
import { PropertyLink } from '../../../../../models/property-models/property-link/property-link';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PropertyLinkService } from '../../../../../services/property-services/property-link-service';
import { BaseDialogFormComponent } from '../../../../base-components/base-dialog-form-component/base-dialog-form-component';

@Component({
  selector: 'app-property-link-dialog-form',
  standalone: false,
  templateUrl: './property-link-dialog-form-component.html',
  styleUrls: ['./property-link-dialog-form-component.scss']
})
export class PropertyLinkDialogFormComponent  extends BaseDialogFormComponent<PropertyLink> {

  constructor(
    protected override dialogRef: MatDialogRef<PropertyLinkDialogFormComponent>,
    @Inject(MAT_DIALOG_DATA) public override data: PropertyLinkDTO,
    override service: PropertyLinkService,
    protected override cdr: ChangeDetectorRef,
    protected override langService: LanguageService
  ) {
    super(dialogRef, data, service, cdr, langService)
  }

  
 
}
