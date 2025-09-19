import { Component } from '@angular/core';
import { PropertyTableView } from '../_base/property-table-view/property-table-view';

@Component({
  selector: 'app-all-properties-component',
  standalone: false,
  templateUrl: './all-properties-component.html',
  styleUrl: './all-properties-component.scss'
})
export class AllPropertiesComponent extends PropertyTableView
{

}
