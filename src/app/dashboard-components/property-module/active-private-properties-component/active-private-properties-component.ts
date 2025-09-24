import { Component } from '@angular/core';
import { PropertyViewComponent } from '../_base/property-view-component/property-view-component';

@Component({
  selector: 'app-active-private-properties-component',
  standalone: false,
  templateUrl: './active-private-properties-component.html',
  styleUrl: './active-private-properties-component.scss'
})
export class ActivePrivatePropertiesComponent  extends PropertyViewComponent
{

}
