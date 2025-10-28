import { Component } from '@angular/core';
import { FpcTableViewComponent } from '../_base/fpc-table-view-component/fpc-table-view-component';
import { BaseTableViewComponent } from '../../../components/base-table-view-component/base-table-view-component';

@Component({
  selector: 'app-active-private-fpcs-component',
  standalone:false,
  templateUrl: './active-private-fpcs-component.html',
  styleUrl: './active-private-fpcs-component.scss'
})
export class ActivePrivateFpcsComponent extends BaseTableViewComponent {

}