import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseTableViewComponent } from '../../../../components/base-table-view-component/base-table-view-component';

@Component({
  selector: 'app-group-table-view',
  standalone: false,
  templateUrl: './group-table-view-component.html',
  styleUrls: ['./group-table-view-component.scss']
})
export class GroupTableViewComponent extends BaseTableViewComponent {


  constructor(
    override cdr: ChangeDetectorRef,
    override route: ActivatedRoute,

  ) {
    super(route , cdr);
  }

}
