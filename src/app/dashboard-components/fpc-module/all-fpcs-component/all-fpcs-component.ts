import { Component } from '@angular/core';
import { FpcTableViewComponent } from '../_base/fpc-table-view-component/fpc-table-view-component';

@Component({
  selector: 'app-all-fpcs-component',
  standalone: false,
  templateUrl: './all-fpcs-component.html',
  styleUrl: './all-fpcs-component.scss'
})
export class AllFpcsComponent extends FpcTableViewComponent {

}