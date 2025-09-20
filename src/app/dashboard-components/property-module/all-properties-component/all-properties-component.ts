import { Component } from '@angular/core';
import { PropertyViewComponent } from '../_base/property-view-component/property-view-component';

@Component({
  selector: 'app-all-properties-component',
  standalone: false,
  templateUrl: './all-properties-component.html',
  styleUrl: './all-properties-component.scss'
})
export class AllPropertiesComponent extends PropertyViewComponent
{

}
