import { Component } from '@angular/core';
import { PropertyViewComponent } from '../_base/property-view-component/property-view-component';
import { BaseTableViewComponent } from '../../../components/base-table-view-component/base-table-view-component';

@Component({
  selector: 'app-active-properties-component',
  standalone: false,
  templateUrl: './active-properties-component.html',
  styleUrl: './active-properties-component.scss'
})
export class ActivePropertiesComponent extends BaseTableViewComponent
{

}
