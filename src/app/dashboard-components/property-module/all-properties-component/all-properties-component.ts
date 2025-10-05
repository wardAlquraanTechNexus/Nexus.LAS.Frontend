import { ChangeDetectorRef, Component } from '@angular/core';
import { PropertyViewComponent } from '../_base/property-view-component/property-view-component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from '../../../services/language-service';
import { PropertyService } from '../../../services/property-services/property-service';

@Component({
  selector: 'app-all-properties-component',
  standalone: false,
  templateUrl: './all-properties-component.html',
  styleUrl: './all-properties-component.scss'
})
export class AllPropertiesComponent extends PropertyViewComponent
{

  constructor(
    override service: PropertyService,
    override router: Router,
    override route: ActivatedRoute,
    override langService: LanguageService,
    override dialog: MatDialog,
    override cdr: ChangeDetectorRef,
  ) {
    console.log('AllPropertiesComponent constructor');
    super(service, router, route, langService, dialog, cdr);
  }
}
