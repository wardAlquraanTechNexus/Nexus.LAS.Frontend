import { Component } from '@angular/core';
import { FpcTableViewComponent } from '../_base/fpc-table-view-component/fpc-table-view-component';

@Component({
  selector: 'app-active-fpcs-component',
  standalone:false,
  templateUrl: './active-fpcs-component.html',
  styleUrl: './active-fpcs-component.scss'
})
export class ActiveFpcsComponent extends FpcTableViewComponent {

}