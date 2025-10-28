import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-base-table-view-component',
  standalone: false,
  templateUrl: './base-table-view-component.html',
  styleUrls: ['./base-table-view-component.scss']
})
export class BaseTableViewComponent {
  itemId : number | null = null;
  showTable?: boolean | null = null;
  constructor(
    private route: ActivatedRoute,
    protected cdr: ChangeDetectorRef,

  ) {

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.itemId = parseInt(params['id']);
        this.showTable = false;
        // this.getGroup();
      }else{
        this.showTable = true;
        this.itemId = null;
        // this.backToTable();
      }
    });
  

  }
}
