import { Component } from '@angular/core';
import { PropertyViewComponent } from '../_base/property-view-component/property-view-component';
import { BaseTableViewComponent } from '../../../components/base-table-view-component/base-table-view-component';

@Component({
  selector: 'app-active-public-properties-component',
  standalone: false,
  templateUrl: './active-public-properties-component.html',
  styleUrl: './active-public-properties-component.scss'
})
export class ActivePublicPropertiesComponent  extends BaseTableViewComponent
{

}
