import { Component } from '@angular/core';
import { FpcTableViewComponent } from '../_base/fpc-table-view-component/fpc-table-view-component';

@Component({
  selector: 'app-active-public-fpcs-component',
  standalone:false,
  templateUrl: './active-public-fpcs-component.html',
  styleUrl: './active-public-fpcs-component.scss'
})
export class ActivePublicFpcsComponent extends FpcTableViewComponent {

}