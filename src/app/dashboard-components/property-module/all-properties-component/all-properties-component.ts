import { ChangeDetectorRef, Component } from '@angular/core';
import { PropertyViewComponent } from '../_base/property-view-component/property-view-component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguageService } from '../../../services/language-service';
import { PropertyService } from '../../../services/property-services/property-service';
import { BaseTableViewComponent } from '../../../components/base-table-view-component/base-table-view-component';

@Component({
  selector: 'app-all-properties-component',
  standalone: false,
  templateUrl: './all-properties-component.html',
  styleUrl: './all-properties-component.scss'
})
export class AllPropertiesComponent extends BaseTableViewComponent
{

  
}
