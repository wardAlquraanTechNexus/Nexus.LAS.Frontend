import { Component } from '@angular/core';
import { LawFirmViewComponent } from '../_base/law-firm-view-component/law-firm-view-component';

@Component({
  selector: 'app-active-private-law-firms-component',
  standalone: false,
  templateUrl: './active-private-law-firms-component.html',
  styleUrl: './active-private-law-firms-component.scss'
})
export class ActivePrivateLawFirmsComponent extends LawFirmViewComponent
{

}
